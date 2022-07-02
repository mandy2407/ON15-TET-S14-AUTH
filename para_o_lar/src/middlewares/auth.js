const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
module.exports = (req, res, next) => {
    const authHeader = req.get('authorization') // a constante esta requerendo o get para autorização com a api ( fazendo a leitura da requisição ).
    const token = authHeader && authHeader.split(' ') [1] // token é a senha da aplicação, token está sendo extraido do Header.
  if (!token) {
    return res.status(401).send("Erro no header")
  }

  jwt.verify(token, SECRET, (err) => {
    if(err) {
        return res.status(401).send("Não autorizado")
    }
    next ()
})
}