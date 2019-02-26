import * as express from 'express';

import DB from '../../db';
import { HashPassword } from '../../utils/security/passwords';
import { CreateToken } from '../../utils/security/tokens';

const registerRouter = express.Router();

registerRouter.post('/', async (req, res, next) => {
    try {
        let user = req.body;
        user.password = HashPassword(req.body.password);
        let userValues = Object["values"](user);
        let result: any = await DB.Users.insert(userValues);
        let token = await CreateToken({ userid: result.insertId });
        res.json({
            token,
            role: 'admin',
            userid: result.insertId
        });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default registerRouter;