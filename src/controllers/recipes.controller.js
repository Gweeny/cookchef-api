import Model from '../models/recipes.model';

export const addRecipe = async (req, res) => {
	const data = new Model({
		title: req.body.title,
		image: req.body.image,
		liked: false,
	});
	try {
		const dataToSave = await data.save();
		res.status(200).json(dataToSave);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const getAll = async (req, res) => {
	try {
		const data = await Model.find();
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getOne = async (req, res) => {
	try {
		const data = await Model.findById(req.params.id);
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const updateRecipe = async (req, res) => {
	try {
		const id = req.params.id;
		const updateData = req.body;
		const options = { new: true };

		const result = await Model.findByIdAndUpdate(id, updateData, options);
		res.json(result);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const deleteRecipe = async (req, res) => {
	try {
		const id = req.params.id;
		const data = await Model.findByIdAndDelete(id);
		res.json(`La recette ${data.title} a bien été supprimée`);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};
