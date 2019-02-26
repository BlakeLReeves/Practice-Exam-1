import * as mysql from 'mysql';
import config from '../config';

import Categories from './queries/categories';
import Books from './queries/books';
import Tokens from './queries/tokens';
import Users from './queries/users';

export const pool = mysql.createPool(config.mysql);

export const Query = (query: string, values?: Array<string | number>) => {
    return new Promise<Array<any>>((resolve, reject) => {
        pool.query(query, [values], (err, results) => {
            if(err) reject(err);
            return resolve(results);
        });
    });
};

export default {
    Categories,
    Books,
    Tokens,
    Users
}