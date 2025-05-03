# SleepWell

## Usage

```
Requirements:
- npm    (tested 11.3.0)
- python (tested 3.13.2)
- make   (tested GNU Make 4.4.1)
```

### Start backend

```
cd src/backend/
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
make dev
```

La backend est un serveur API REST à l'addresse [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

### Start frontend (for user)

Cette application web est destiné à être utilisé par les utilisateur finaux.

```
cd src/frontend_user/
npm install
make dev
```

L'application est disponible à l'addresse [http://localhost:5173/](http://localhost:5173/)

### Start frontend (for managing rewards)

Cette application web est destiné à la gestion des rewards pour tous les utilisateurs.

```
cd src/frontend_group/
npm install
make dev
```

L'application est disponible à l'addresse [http://localhost:5174/](http://localhost:5174/)
