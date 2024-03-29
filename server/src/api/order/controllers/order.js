"use strict";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products, userName, email } = ctx.request.body;
    try {
      //retrive item information
      const lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await strapi
            .service("api::item.item")
            .findOne(product.id);

            return{
                price_data:{
                    currency : "inr",
                    product_data:{
                        name:item.name
                    },
                    unit_amount:item.price*100,

                },
                quantity:product.count,

            }

        })
      );

    //   session
    const session=await stripe.checkout.sessions.create({
        Payment_method_types:["card"],
        customer_email:email,
        mode:"payment",
        success_url:"http://localhost:3000/checkout/success",
        cancel_url:"http://localhost:3000",
        line_items:lineItems
    })

    //create item
    await strapi.service("api::order.order").create({
        data:{userName,products,stripeSessionid: session.id},
    })

    // return id
    return{id:session.id}
    } catch (error) {
        ctx.response.status = 500;
        return{error:{message:"There was problem creating the charge"}}
    }
  },
}));
