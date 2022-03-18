const Brand = require('../models/Brand');

module.exports.index = (request, response) => {
  Brand.find({}, (error, brands) => {
    if (error) return response.status(400).json({ message: 'Error listing brands', error });
    if (brands.length <= 0) return response.status(200).send({ message: 'There are no registered brands' });
    response.status(200).send(brands);
  });
}

module.exports.store = (request, response) => {
  const brand = new Brand({
    name: request.body.name,
  });

  brand.save((error, brand) => {
    if (error) return response.status(400).json({ message: 'Error registering new brand', error });
    response.status(201).send({ message: 'Brand successfully registered', brand  });
  });
}

module.exports.update = (request, response) => {
  const id = request.body._id;
  const name = request.body.name;
  
  Brand.findByIdAndUpdate(id, { name }, (error, brand) => {
    if (error) return response.status(400).json({ message: 'Error updating brand', error });
    response.status(200).send({ message: 'Brand successfully updated', brand  });
  });
}

module.exports.destroy = (request, response) => {
  const id = request.body._id;

  Brand.findByIdAndRemove(id, (error, brand) => {
    if (error) return response.status(400).json({ message: 'Error deleting brand', error });
    response.status(200).send({ message: 'Brand deleted successfully' });
  });
} 