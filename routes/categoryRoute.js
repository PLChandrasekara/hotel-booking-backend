import express from 'express';
import Category from './models/categoryModel.js'; 
import isAdmin from './middleware/admin.js'; 
import { protect } from './middleware/authMiddleware.js'; 

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories" });
  }
});


router.put('/:id', protect, isAdmin, async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const category = await Category.findById(req.params.id);

    if (category) {
      category.name = name || category.name;
      category.description = description || category.description;
      category.price = price || category.price;

      const updatedCategory = await category.save();
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating category" });
  }
});

export default router;