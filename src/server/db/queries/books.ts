import { Query } from '../index';

const getAllBooks = async () => Query(`SELECT * FROM Books`);

const getOneBook = async (id: number) => Query (`SELECT * FROM Books WHERE id = ?`, [id]);

const deleteBook = async (id: number) => Query (`DELETE FROM Books WHERE id = ?`, [id]);

const postBook = async (categoryid: number, title: string, author: string, price: number) => Query(`INSERT INTO Books (categoryid, title, author, price) VALUES ("${categoryid}", "${title}", "${author}", "${price}")`);

const updateBook = async (id: number, categoryid: number, title: string, author: string, price: number) => Query(`UPDATE Books SET categoryid = "${categoryid}", title = "${title}", author = "${author}", price = "${price}" WHERE id = ?`, [id]);

export default {
    getAllBooks,
    getOneBook,
    deleteBook,
    postBook,
    updateBook
}