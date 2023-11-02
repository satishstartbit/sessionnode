
var mongoose = require('mongoose');
const register = require("../model/user");



exports.home = (req, res, next) => {

    async function logincheck() {
        function login() {
            const bcryptjs = require("bcryptjs")
            var registerusers = mongoose.model('registerusers', register.registeruser);
            if (req.body.email !== undefined && req.body.password !== undefined) {
                registerusers.find().then((data) => {
                    data.map((key) => {
                        bcryptjs.compare(req.body.password, key.password).then((check) => {
                            if (check) {
                                req.session.userid = key._id
                                req.session.user = {
                                    userid: key._id
                                }
                                req.session.save();
                            }
                        })

                    })
                })
            }
        }
        await  login()
        res.status(200).render("index", {
            session: req.session.userid
        })

     

    }
    logincheck()
    
}












