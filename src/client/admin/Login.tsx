import * as React from 'react';
import { json, SetAccessToken, User } from '../utils/api';
import { RouteComponentProps } from 'react-router';

export interface ILoginProps extends RouteComponentProps { }

export interface ILoginState {
    email: string;
    password: string;
}

export default class Login extends React.Component<ILoginProps, ILoginState> {
    constructor(props: ILoginProps) {
        super(props);
        this.state = {
            email: null,
            password: null
        };

        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);

    }

    componentDidMount() {
        if (User && User.role === 'admin') {
            this.props.history.push('/books');
        }
    }

    async handleLoginSubmit(e: React.ChangeEvent<HTMLFormElement>) {

        e.preventDefault();

        try {
            let result = await json('/auth/login', 'POST', {
                email: this.state.email,
                password: this.state.password
            });

            if (result) {
                SetAccessToken(result.token, { userid: result.userid, role: result.role });
                if (result.role === 'admin') {
                    this.props.history.push('/books');
                } else {
                    this.props.history.push('/');
                }
            }
        } catch (e) {
            throw e;
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <form onSubmit={this.handleLoginSubmit} className="form-group p-3 my-4 bg-white border border-primary">
                        <label>Email:</label>
                        <input
                            className="form-control p-1 my-2"
                            value={this.state.email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: e.target.value })} >
                        </input>
                        <label>Password:</label>
                        <input
                            className="form-control p-1 my-2"
                            value={this.state.password}
                            type='password'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: e.target.value })} >
                        </input>
                        <button className="btn btn-primary btn-lg shadow mt-2">Login</button>
                    </form>
                </div>
            </div>
        );
    }
}