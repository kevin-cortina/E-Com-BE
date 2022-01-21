const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product },],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
      attributes: {
        include: [
          // [
          //   // Use plain SQL to add up the total mileage
          //   sequelize.literal(
          //     '(SELECT SUM(mileage) FROM car WHERE car.driver_id = driver.id)'
          //   ),
          //   'totalMileage',
          // ],
        ],
      },
});
  if (!categoryData) {
    res.status(404).json({ message: 'No Category found with that id!' });
    return;
  }

  res.status(200).json(categoryData);
  } catch (err) {
  res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    id: req.body.id,
    category_name: req.body.category_name,
  })
    .then((newCategory) => {
      // Send the newly created row as a JSON object
      res.json(newCategory);
    })
    .catch((err) => {
      res.json(err);
    });
});


router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      // All the fields you can update and the data attached to the request body.
      id: req.body.id,
      category_name: req.body.category_name,
    },
    {
      // Gets the books based on the isbn given in the request parameters
      //////////////// unsure about this line of code pt1
      where: {
        id: req.params.id,
      },
      //////////////// end of unsure code pt1
    }
  )
    .then((updatedBook) => {
      // Sends the updated book as a json response
      res.json(updatedBook);
    })
    .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
    // Looks for the books based on isbn given in the request parameters and deletes the instance from the database
    Category.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((deletedCategory) => {
        res.json(deletedCategory);
      })
      .catch((err) => res.json(err));
});

module.exports = router;