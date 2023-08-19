import { Router } from "https://deno.land/x/oak@v12.5.0/router.ts";

import { WishlistDao } from "./wishlist_dao.ts";

const router = new Router({ prefix: "/api/v1/wishlists" });
const kv = await Deno.openKv();
const wishlistDao = new WishlistDao(kv);

router.get("/:userId", async (ctx) => {
  if (!ctx.params.userId) {
    ctx.response.status = 404;
    ctx.response.body = "User Id is missing";
  }
  const result = await wishlistDao.getAllWishLists(ctx.params.userId);
  ctx.response.body = result;
});

// router.get("/:queue/latest", async (ctx) => {
//   const result = await getLatestFromQueue(ctx.params.queue);
//   ctx.response.body = result;
// });

// router.get("/:queue/:id", async (ctx) => {
//   const result = await getQueueItemAt(ctx.params.queue, ctx.params.id);
//   ctx.response.body = result;
// });

router.post("/:userId", async (ctx) => {
  const body = await ctx.request.body().value;
  await wishlistDao.addToWishList(ctx.params.userId, body);
  ctx.response.body = body;
});

export { router as default };
