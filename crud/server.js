const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const db = require("./app/model")
db.sequelize.sync({ force: true }).then(() => {
    console.log("Resetando banco...");
});

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

//receber json
app.use(bodyParser.json());

//x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.json({ message: "Funcionou!" });
});

const PORT = process.env.PORT || 8080;
require("./app/routes/livro.routes")(app);
app.listen(PORT, () => {
    console.log(`Servidor em pé na porta ${PORT}`)
});