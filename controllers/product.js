

exports.addproduct = (req, res, next) => {
    res.status(200).render("./product/addproduct", {
        session: req.session.userid
    })
}

exports.deleteproduct = (req, res, next) => {
    let productdata = require("../model/product");
    let addproductdata = mongoose.model('productdata', productdata.productdata);
    let id = req.params.deleteproduct;
    addproductdata.findById(id).then(product=>{
        return product.deleteOne();
    })
    res.redirect("/product")
}
var mongoose = require('mongoose');

exports.product = (req, res, next) => {
    async function product() {
        // console.log(req.file.filename);
        const productdata = require("../model/product");
        var addproductdata = mongoose.model('productdata', productdata.productdata);
        async function addproduct() {
            if (req.body.title !== "" && req.body.description !== "" && req.body.title !== undefined && req.body.description !== undefined && req.body.producttype !== undefined && req.body.rating !== undefined) {

                var savedata = new addproductdata({
                    title: req.body.title.substring(0, 100),
                    description: req.body.description.substring(0, 353),
                    producttype: req.body.producttype,
                    rating: parseInt(req.body.rating)
                })
                savedata.save()

            }

        }
        await addproduct()
        const page = req.query.page
        let totalitem;
        addproductdata.find()
            .count()
            .then((numproducts) => {
                totalitem = numproducts
                return addproductdata.find()
                    .skip((page - 1) * 3)
                    .limit(3)
            })
            .then(function (data) {
                res.status(200).render("./product/product", {
                    product: data,
                    session: req.session.userid,
                    totalitem: Math.ceil(totalitem/3)
                })
            })
           


    }
    product()


}






