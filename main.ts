import { Application } from "https://deno.land/x/oak@v12.5.0/application.ts";
import wishlistRouter from "./src/wishlist_router.ts";
const PORT = Deno.env.get("PORT") as unknown as number || 8000;
const app = new Application();

app.use(wishlistRouter.routes());
app.use(wishlistRouter.allowedMethods());

console.log(`Server is running on port ${PORT} 🔥`);
await app.listen({ port: PORT });
