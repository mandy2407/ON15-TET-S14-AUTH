const UserSchema = require("../models/userSchema");
const bcrypt = require('bcrypt');

const getAll = async (req, res) => {
    
  UserSchema.find(function (err, users) {
    if(err) {
      res.status(500).send({ message: err.message })
    }
      res.status(200).send(users)
  }) 
};


const createUser = async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10)
  req.body.password = hashedPassword

  try {
    const newUser = new UserSchema(req.body);

    const savedUser = await newUser.save();

    res.status(201).send({
      "message": "User criado com sucesso",
      savedUser
    });
  } catch(e) {
    console.error(e);
    res.status(500).json({
      message: e.message
  });
  };
};

const updateUser = async (req, resp) => {
try {

  const id = req.params.id
  const dados = req.body 

  const updatedUser = await UserSchema.findByIdAndUpdate(id, dados)

  resp.status(200).json({updatedUser})
} catch (error) {
  resp.status (500).json({mensage:error.message})
}
}
module.exports = {
  getAll,
  createUser,
  updateUser
};