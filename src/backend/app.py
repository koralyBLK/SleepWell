from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Tuple
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Group(BaseModel):
    id: int | None
    name: str

class Item(BaseModel):
    id: int | None
    title: str
    imgUrl: str
    price: int

class User(BaseModel):
    id: int | None
    name: str
    group_id: int
    redeemed_items_id: list[Tuple[int, datetime]]


model_groups = [
    Group(id=1, name="Client1"),
]

model_items = {1: [
    Item(id=1, title="Migros Carte Cadeau (10.-)", imgUrl="/assets/migros.png", price=12),
    Item(id=2, title="Manor Carte Cadeau (20.-)", imgUrl="/assets/manor.png", price=25),
    Item(id=3, title="1 Entrée Europa-Park", imgUrl="/assets/europa-park.png", price=30),
]}

model_users = [
    User(id=1, name="Alice", group_id=1, redeemed_items_id=[(1, datetime.now())]),
]

@app.get("/groups/{group_id}/items/")
def read_users(group_id: int) -> list[Item]:
    return model_items[group_id]

@app.get("/groups/{group_id}/users/")
def read_users(group_id: int) -> list[User]:
    return [user for user in model_users if user.group_id == group_id]

@app.post("/groups/{group_id}/items/")
async def create_item(group_id: int, item: Item) -> Item:
    new_id = len(model_items)
    item.id = new_id
    model_items[group_id].append(item)
    return item

@app.get("/users/{user_id}")
def read_user(user_id: int) -> User:
    return list(filter(lambda u: u.id == user_id, model_users))[0]

class RedeemRequest(BaseModel):
    user_id: int
    item_id: int

@app.post("/redeem/")
async def redeem_item(req: RedeemRequest):
    user = [user for user in model_users if user.id == req.user_id][0]
    ids = [_id for (_id, _) in user.redeemed_items_id]
    if req.item_id not in ids:
        user.redeemed_items_id.append((req.item_id, datetime.now()))
    return user
    
