import * as express from 'express';
import DB from '../../db';

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (req, res, next) => {
    try {
        let categories = await DB.Categories.getAllCategories();
        res.send(categories);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

categoriesRouter.get('/:id?', async (req, res, next) => {
    try {
        let id = req.params.id;
        let [category] = await DB.Categories.getOneCategory(id);
        res.send(category);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default categoriesRouter;