const Category = require('../models/Category');

module.exports.index = (request, response) => {
  Category.find({}, (error, categories) => {
    if (error) return response.status(400).send({ message: 'Error listing categories', error });
    if (categories.length <= 0) return response.status(200).send({ message: 'There are no categories registered' });
    response.status(200).send(categories);
  });
}

module.exports.store = (request, response) => {
  const category = new Category({
    name: request.body.name,
    description: request.body.description,
  });

  category.save((error, category) => {
    if (error) return response.status(400).send({ message: 'Error registering new category', error });
    response.status(201).send({ message: 'Category registered successfully', category  });
  });
}

module.exports.update = (request, response) => {
  const id = request.body._id;
  const name = request.body.name;
  const description = request.body.description;

  Category.findByIdAndUpdate(id, { name, description }, (error, category) => {
    if (error) return response.status(400).send({ message: 'Error updating category', error });
    response.status(200).send({ msg: 'Category successfully updated', category });
  });
}

module.exports.destroy = (request, response) => {
  const id = request.body._id;

  Category.findByIdAndRemove(id, (error, category) => {
    if (error) return response.status(400).send({ message: 'Error deleting category', error });
    response.status(200).send({ msg: 'Category deleted successfully' });
  });
} 