import { Query } from '../index';

const findOne = async (id: number, token: string) => Query(`SELECT * FROM Tokens WHERE id = ${id} AND token = ?`, [token]);

const insert = async (userid: number) => Query(`INSERT INTO Tokens (userid) VALUES (${userid})`);

const update = async (id: number, token: string) => Query(`UPDATE Tokens SET token = '${token}' WHERE id = ?`, [id]);

export default {
    findOne,
    insert,
    update
}