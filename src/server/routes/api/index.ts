import * as express from 'express';
import * as passport from 'passport';

import categoriesRouter from './categories';
import booksRouter from './books';

const apiRouter = express.Router();

apiRouter.use((req, res, next) => {
    passport.authenticate('bearer', { session: false }, (err, user, info) => {
        if(user) req.user = user;
        return next();
    })(req, res, next);
});

apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/books', booksRouter);

export default apiRouter;