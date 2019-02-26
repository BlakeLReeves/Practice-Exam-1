import { Query } from '../index';

const findOneByEmail = async (email: string) => Query(`SELECT * FROM Users WHERE email = '${email}' LIMIT 1`);

const findOneById = async (id: number) => Query(`SELECT * FROM Users WHERE id = ? LIMIT 1`, [id]);

const insert = async (user: any) => Query(`INSERT INTO Users (name, email, password) VALUES ?`, [user]);

export default {
    findOneByEmail,
    findOneById,
    insert
}