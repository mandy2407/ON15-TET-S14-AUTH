const UserSchema = require('../models/userSchema');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

const login = (req, res) => {
    try {
        // UserSchema.findOne(filtro é o email do usuario, função anônima)
        UserSchema.findOne({ email: req.body.email }, (error, user) => {
            console.log("USUÁRIO", user)
            if(!user) {
                return res.status(401).send({
                    message: "User não encontrado",
                    email: `${req.body.email}`
                })
            }

            const validPassword = bcrypt.compareSync(req.body.password, user.password);
            console.log(validPassword)

            if (!validPassword) {
                return res.status(401).send({
                    message: "Login não autorizado"
                })
         }
            // jwt.sign(nome do usuário, SEGREDO)
            const token = jwt.sign({name: user.name},SECRET)
            console.log("token criado", token);
            

            res.status(200).send({
                "message":"Login autorizado",
                token
            })
        });

    } catch(err) {
        console.error(err)
    }
};

module.exports = {
    login
};