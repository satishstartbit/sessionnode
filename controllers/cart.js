
var mongoose = require('mongoose');
const { product } = require('./product');
// var bcryptjs = require("bcryptjs")
exports.cart = (req, res, next) => {
  async function cart() {
    const cart = require("../model/cart");
    var addcart = mongoose.model('cart', cart.cart);
    addcart.find().then(function (data) {
      var cartt = data.some(checkAdult);
      function checkAdult(key) {
        return key.productid == req.session.userid;
      }
      if (cartt == false) {
        var savecartdata = new addcart({
          productid: req.params.productid,
          userid: req.session.userid
        })
        savecartdata.save()
      }
    })
    res.redirect("/product")
  }
  cart()

}


exports.showcart = (req, res, next) => {
  async function addtocart() {
    const cart = require("../model/cart");
    var addcart = mongoose.model('cart', cart.cart);


    const product = []
    await addcart.find().then((key) => {
      for (const item of key) {
        if (item.userid.toString() == req.session.userid) {
          product.push(item.productid)
        }
      }
    })
    const productdata = require("../model/product");
    var addproductdata = mongoose.model('productdata', productdata.productdata);


    const cartitem = []
    await addproductdata.find().then((key) => {
      for (const item of key) {
        for (const productkey of product) {
          if (productkey.toString() == item._id.toString()) {
            cartitem.push(item)
          }
        }
      }
    })
    res.status(200).render("./cart/cart", {
      session: req.session.userid,
      cartitem: cartitem
    })
  }

  addtocart()
}


exports.checkout = async (req, res, next) => {


  // const apiKey = '<pk_test_51O4IP1SFhspWOsdeFakhFjPVNhfMT9wBfZOfuV0y1eEzAv4ItRKtJjaOfXP50JVUgtWi7lO7rJdU1dJY4SN5p49L00acndYadP>'

  const stripe = require('stripe')("sk_test_51O4IP1SFhspWOsdeYaXIKmtiyfXijzlWuF1tkyJuI9DdWRKdMaOjpuWVrXIDsuuGsUlzfcMyu8nduHVWcMbNthf800JNjXKcjM");

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: "T-shirt",
          },
          unit_amount: 40000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:6005/stripepaymentsuccess",
    cancel_url: "http://localhost:6005/stripepaymentcancel",
  });

  res.status(200).render("./cart/checkout", {
    session: req.session.userid,
    sessionId: session.id
  })

}