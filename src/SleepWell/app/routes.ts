import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"), route("catalog", "./routes/catalog.tsx"), route("sleep", "./routes/sleep.tsx")] satisfies RouteConfig;
