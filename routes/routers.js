const express = require("express")
const router = express.Router();


const routs = require("../controllers/home")
const user = require("../controllers/user")
const product = require("../controllers/product")
const cart = require("../controllers/cart")
const isauth = require("../middleware/isauth")

const { check, body } = require("express-validator");

router.get("/", isauth, routs.home)
router.post("/", isauth, routs.home)

router.get("/addproduct", isauth, product.addproduct)

router.get("/product", isauth, product.product)
router.post("/product", isauth, product.product)

router.get("/deleteproduct/:deleteproduct", isauth, product.deleteproduct)
router.delete("/deleteproduct/:deleteproduct", isauth, product.deleteproduct)

router.get("/login", user.loginuser)
router.post("/login",
    check("email").isEmail().withMessage("Please enter a valid email"),
    body('password', "please enter valid password").isLength({ min: 5 }).isAlphanumeric(),
    user.loginuser)


router.get("/logout", isauth, user.logoutuser)

router.get("/cart", isauth, cart.showcart)


router.get("/cart/:productid", isauth, cart.cart)
router.post("/cart/:productid", isauth, cart.cart)

router.get("/register", user.registeruser)

router.get("/resetpassword", user.resetpass)

router.get("/updatepassword", user.updatepass)
router.post("/updatepassword", user.updatepass)


router.post("/updatepassword/:email", user.changepassword)


router.get("/checkout", isauth, cart.checkout)
router.post("/checkout", isauth, cart.checkout)
exports.router = router



