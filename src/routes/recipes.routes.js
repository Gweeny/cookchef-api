import { Router } from 'express';
import {
	addRecipe,
	deleteRecipe,
	getAll,
	getOne,
	updateRecipe,
} from '../controllers/recipes.controller';
const router = Router();

router.post('/', addRecipe);
router.get('/', getAll);
router.get('/:id', getOne);
router.patch('/update/:id', updateRecipe);
router.delete('/delete/:id', deleteRecipe);

export default router;
