const User = require('../Model/user')
const joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
exports.signUp = async (req, res) => {
    const { name, email, phone, password, ConfirmPassword } = req.body
    const emailExist = await User.findOne({ email: email })

    if (emailExist) {
        res.status(200).send({ 'msg': "email already exists...please try with another email Id" })

    }
    else {
        if (name && email && phone && password && ConfirmPassword) {
            if (password === ConfirmPassword) {

                try {
                    const salt = await bcrypt.genSalt(10)
                    const hashPassword = await bcrypt.hash(password, salt)
                    const user = new User({
                        name: name,
                        email: email,
                        phone: phone,
                        password: hashPassword
                    })
                    const registrationSchema = joi.object({
                        name: joi.string().min(3).max(255).required(),
                        email: joi.string().min(3).max(255).required().email(),
                        phone: joi.number().min(10).required(),
                        password: joi.string().min(5).max(255).required()
                    })
                    const { err } = await registrationSchema.validateAsync({ name, email, phone, password })

                    if (err) {
                        res.status(400).send(err.details[0].message)

                    }
                    else {
                        const saveUser = await user.save()
                        res.status(200).send({ "msg": "User created successfully" })
                    }



                } catch (err) {
                    res.status(500).send({ err, "msg": "unable to register" })
                }



            }
            else {
                res.send({ "msg": "password and confrim password doesnt match" })
            }

        }
        else {
            res.send({ "msg": "all fields are required" })
        }



    }

}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email && password) {
            const user = await User.findOne({ email: email })
            if (user != null) {
                const isMatch = await bcrypt.compare(password, user.password)
                if ((user.email === email) && isMatch) {
                    const token = jwt.sign({ userID: user._id }, process.env.TOKEN_SECRET)
                    res.status(200).send({ "msg": "Login Sucess", "token": token })
                }
                else {
                    res.status(400).send({ "msg": "email or password is not valid" })
                }
            }
            else {
                res.status(500).send({ "msg": "You are not a registered User" })
            }
        }
        else {
            res.status(500).send({ "msg": "all Fields are required" })
        }
    } catch (err) {
        console.log(err)
    }

}

exports.getAllUser = async (req, res) => {
    const allUser = await User.find()

    try {
        res.status(200).send({allUser,"msg":"ALL USERS"})

    } catch (err) {
        res.status(500).send(err)
    }
}





