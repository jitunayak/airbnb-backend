export class WishlistDao {
  constructor(
    private kv: Deno.Kv,
  ) {
  }

  async ingestMockData(userId: string) {
    await this.kv.set([userId, "allWishListItems"], [
      {
        "id": "6",
        "rating": 4.9,
        "address": {
          "country": "India",
          "market": "Igatpuri",
          "street": "",
        },
        "amenities": ["TV", "Geyser", "Wifi"],
        "currency": "INR",
        "images": [
          "https://a0.muscache.com/im/pictures/miso/Hosting-31049657/original/f7cf2a5e-1ef3-4f46-b3bd-8b9afaec2b71.jpeg?im_w=720",
          "https://a0.muscache.com/im/pictures/miso/Hosting-31049657/original/37d0a827-358b-4551-859b-e6a64c8e7f1d.jpeg?im_w=720",
          "https://a0.muscache.com/im/pictures/miso/Hosting-31049657/original/5b2f9870-23bc-4cc4-b93d-cf8946b8b929.jpeg?im_w=720",
        ],
        "listingUrl": "https://a0.muscache.com/",
        "name": "Wildvibes A frame Cabin ooty",
        "price": 15990,
        "propertyType": "Cabins",
        "thumbnail":
          "https://a0.muscache.com/im/pictures/miso/Hosting-669134847280018335/original/f33d1f29-3003-4545-aa92-8adfa592b4f8.jpeg?im_w=720",
        "summary":
          "The A-frame cabin offers an escape from metropolitan living. The triangle-shaped homes were popular in US starting in the 50s turns out there structures are coming back to picture and this time they’re here to stay.",
      },
    ]);
  }

  async getAllWishLists(userId: string) {
    await this.ingestMockData("1");
    const allWishListItems = await this.kv.get([userId, "allWishListItems"]);
    console.log(allWishListItems);

    return allWishListItems.value;
  }
}
