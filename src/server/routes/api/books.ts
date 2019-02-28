import * as express from 'express';
import DB from '../../db';
import { RequestHandler } from 'express-serve-static-core';

const booksRouter = express.Router();

const isAdmin: RequestHandler = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.sendStatus(401);
    } else {
        return next();
    }
};

booksRouter.get('/', async (req, res, next) => {
    try {
        let books = await DB.Books.getAllBooks();
        res.send(books);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

booksRouter.get('/:id?', async (req, res, next) => {
    try {
        let id = req.params.id;
        let [book] = await DB.Books.getOneBook(id);
        res.send(book);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

booksRouter.delete('/:id', isAdmin, async(req, res, next) => {
    try {
        let id = req.params.id;
        let book = await DB.Books.deleteBook(id);
        res.json({ message: 'Deleted!' });
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

booksRouter.post('/', isAdmin, async(req, res, next) => {
    try {
        let categoryid = req.body.categoryid;
        let title = req.body.title;
        let author = req.body.author;
        let price = req.body.price;
        let newBook = await DB.Books.postBook(categoryid, title, author, price);
        res.json({ message: 'Posted!' });
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

booksRouter.put('/:id?', isAdmin, async(req, res, next) => {
    try {
        let id = req.params.id;
        let categoryid = req.body.categoryid;
        let title = req.body.title;
        let author = req.body.author;
        let price = req.body.price;
        let newBook = await DB.Books.updateBook(id, categoryid, title, author, price);
        res.json({ message: 'Updated!' });
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default booksRouter;