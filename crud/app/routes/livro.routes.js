module.exports = app => {
    const livros = require("../controller/livro.controller.js");
    var router = require("express").Router();

    router.post("/", livros.create);
    router.get("/", livros.findAll);
    router.get("/publicado", livros.findAllPublicado);
    router.get("/:id", livros.findOne);
    router.put("/:id", livros.update);
    router.delete("/:id", livros.delete);
    router.delete("/", livros.deleteAll);

    app.use("/api/livros", router)
};