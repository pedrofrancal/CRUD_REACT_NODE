const db = require("../model");
const Livro = db.livros;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.titulo) {
        res.status(400).send({
            message: "Titulo não pode ser vazio!"
        });
        return;
    }
    const livro = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        publicado: req.body.publicado ? req.body.publicado : false
    };

    Livro.create(livro)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Algum erro aconteceu."
            });
        });
};

exports.findAll = (req, res) => {
    const titulo = req.query.titulo;
    var cond = titulo ? {
        titulo: {
            [Op.like]: `%${titulo}%`
        }
    } : null;
    Livro.findAll({ where: cond })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Algum erro aconteceu."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Livro.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `ID não encontrado: ${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro ao encontrar id: " + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Livro.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Update com sucesso!"
                });
            } else {
                res.send({
                    message: `Impossivel atualizar o id ${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Erro ao atualizar id ${id}`
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Livro.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Deletou com sucesso"
                });
            } else {
                res.send({
                    message: `Não foi possível deletar id ${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Não foi possível deletar id ${id}`
            });
        });
};

exports.deleteAll = (req, res) => {
    Livro.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} de linhas deletadas` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Erros ocorreram ao apagar dados"
            });
        });
};

exports.findAllPublicado = (req, res) => {
    Livro.findAll({ where: { publicado: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Erros aconteceram"
            });
        });
};