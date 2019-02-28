import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './public/Home';
import Navbar from './shared/Navbar';
import RequestBooks from './public/RequestBooks';
import ViewBook from './public/ViewBook';
import UpdateBook from './admin/UpdateBook';
import PostBook from './admin/PostBook';
import Login from './admin/Login';
import Register from './admin/Register';

export default class IApp extends React.Component<IAppProps, IAppState> {
    render() {
        return (
            <Router>
                <>
                    <Navbar />
                    <div className="container">
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/books' component={RequestBooks} />
                            <Route exact path='/books/new' component={PostBook} />
                            <Route exact path='/books/:id' component={ViewBook} />
                            <Route exact path='/books/:id/update' component={UpdateBook} />
                            <Route exact path='/login' component={Login} />
                            <Route exact path='/register' component={Register} />
                        </Switch>
                    </div>
                </>
            </Router>
        );
    }
}

interface IAppProps { }

interface IAppState { }