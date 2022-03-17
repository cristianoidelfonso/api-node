const Category = require('../models/Category');

module.exports.index = (request, response) => {
  Category.find({}, (error, categories) => {
    if (error) return response.status(500).json({ message: 'Error ao listar categorias', error: error });
    if (categories.length <= 0) return response.status(200).send({ message: 'Não há categorias cadastradas.' });
    response.status(200).send({categories});
  });
}

module.exports.store = (request, response) => {
  const category = new Category({
    name: request.body.name,
    description: request.body.description,
  });

  category.save((error, category) => {
    if (error) return response.status(500).json({ message: 'Error ao cadastrar nova categoria.', error: error });
    response.status(201).send({ message: 'Categoria cadastrada com sucesso!', category: category  });
  });
}

module.exports.update = (request, response) => {
  const id = request.body._id;
  const name = request.body.name;
  const description = request.body.description;

  Category.findByIdAndUpdate(id, { name, description }, (error, category) => {
    if (error) return response.status(500).json({ message: 'Error ao atualizar categoria.', error: error });
    response.status(200).redirect('/categories');
  });
}

module.exports.destroy = (request, response) => {
  const id = request.body._id;

  Category.findByIdAndRemove(id, (error, category) => {
    if (error) return response.status(500).json({ message: 'Error ao excluir categoria.', error: error });
    response.status(200).redirect('/categories');
  });
} 