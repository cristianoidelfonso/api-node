const Brand = require('../models/Brand');

module.exports.index = (request, response) => {
  Brand.find({}, (error, brands) => {
    if (error) return response.status(500).json({ message: 'Error ao listar marcas', error: error });
    if (brands.length <= 0) return response.status(200).send({ message: 'Não há marcas cadastradas.' });
    response.status(200).send({ message: 'Marcas listadas com sucesso!', brands: brands });
  });
}

module.exports.store = (request, response) => {
  const brand = new Brand({
    name: request.body.name,
  });

  brand.save((error, brand) => {
    if (error) return response.status(500).json({ message: 'Error ao cadastrar nova marca.', error: error });
    response.status(201).send({ message: 'Marca cadastrada com sucesso!', brand: brand  });
  });
}

module.exports.update = (request, response) => {
  const id = request.body._id;
  const name = request.body.name;
  
  Brand.findByIdAndUpdate(id, { name }, (error, brand) => {
    if (error) return response.status(500).json({ message: 'Error ao atualizar marca.', error: error });
    response.status(200).redirect('/brands');
  });
}

module.exports.destroy = (request, response) => {
  const id = request.body._id;

  Brand.findByIdAndRemove(id, (error, brand) => {
    if (error) return response.status(500).json({ message: 'Error ao excluir marca.', error: error });
    response.status(200).redirect('/brands');
  });
} 