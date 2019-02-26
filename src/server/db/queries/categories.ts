import { Query } from '../index';

const getAllCategories = async () => Query(`SELECT * FROM Categories`);

const getOneCategory = async (id: number) => Query (`SELECT * FROM Categories WHERE id = ?`, [id]);

export default {
    getAllCategories,
    getOneCategory
}