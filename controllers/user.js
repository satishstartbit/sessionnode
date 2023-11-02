
const bcryptjs = require("bcryptjs")
const { validationResult } = require("express-validator")

exports.registeruser = (req, res, next) => {
    res.status(200).render("./users/registeruser", {
        session: req.session.userid
    })
}



exports.resetpass = (req, res, next) => {
    res.status(200).render("./users/resetpass", {
        session: req.session.userid
    })
}


exports.changepassword = (req, res, next) => {
    var registerusers = mongoose.model('registerusers', register.registeruser);
    const filter = { email: req.params.email };
    bcryptjs.hash(req.body.password, 12).then(hashpassword => {
        const update = { password: hashpassword }
        registerusers.findOneAndUpdate(filter, update).then(key => console.log(key))
    })
    res.redirect("/login")
}


exports.updatepass = (req, res, next) => {
    res.status(200).render("./users/updatepass", {
        session: req.session.userid,
        email: req.body.email
    })
}


exports.logoutuser = (req, res, next) => {
    req.session.destroy();
    delete req.session

    res.redirect("/")
}
var mongoose = require('mongoose');
const register = require("../model/user");
exports.loginuser = (req, res, next) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        res.status(422).render("./users/loginuser", {
            session: req.session.userid,
            validationerror: error.array()
        })
    }
    var registerusers = mongoose.model('registerusers', register.registeruser);
    if (req.body.email !== undefined) {

        bcryptjs.hash(req.body.password, 12).then(hashpassword => {
            var savedata = new registerusers({
                name: req.body.name,
                email: req.body.email,
                password: hashpassword
            })
            savedata.save()
        })

    }

    res.status(200).render("./users/loginuser", {
        session: req.session.userid,
        validationerror: error.array()

    })
}





