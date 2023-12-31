import { Router } from "https://deno.land/x/oak@v12.5.0/router.ts";
import {
  addToWishList,
  deleteAllWishListItems,
  getAllWishLists,
  removeFromWishList,
} from "./wishlist_dao.ts";

const router = new Router({ prefix: "/api/v1/wishlists" });

router.get("/:userId", async (ctx) => {
  if (!ctx.params.userId) {
    ctx.response.status = 404;
    ctx.response.body = "User Id is missing";
  }
  const result = await getAllWishLists(ctx.params.userId);
  ctx.response.body = result;
});

router.post("/:userId", async (ctx) => {
  const body = await ctx.request.body().value;
  await addToWishList(ctx.params.userId, body);
  ctx.response.body = body;
});

router.delete("/:userId/all", async (ctx) => {
  await deleteAllWishListItems(ctx.params.userId);
  ctx.response.body = JSON.stringify("Deleted all items from wish list");
});

router.delete("/:userId", async (ctx) => {
  const body = await ctx.request.body().value;
  await removeFromWishList(ctx.params.userId, body?.id);
  ctx.response.body = body;
});

export { router as default };
