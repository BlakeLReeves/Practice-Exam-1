import * as React from 'react';
import { json, SetAccessToken, User } from '../utils/api';
import { RouteComponentProps } from 'react-router';

export interface IRegisterProps extends RouteComponentProps { }

export interface IRegisterState {
    name: string;
    email: string;
    password: string;
}

export default class Register extends React.Component<IRegisterProps, IRegisterState> {
    constructor(props: IRegisterProps) {
        super(props);
        this.state = {
            name: null,
            email: null,
            password: null,
        };

        this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);

    }

    componentDidMount() {
        if (User && User.role === 'admin') {
            this.props.history.push('/books');
        }
    }

    async handleRegisterSubmit(e: React.ChangeEvent<HTMLFormElement>) {

        e.preventDefault();

        try {
            let result = await json('/auth/register', 'POST', {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            });

            if (result) {
                this.setState({
                    name: '',
                    email: '',
                    password: '',
                })
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
                    <form onSubmit={this.handleRegisterSubmit} className="form-group p-3 my-4 shadow-lg bg-white border border-primary rounded">
                        <label>Name:</label>
                        <input
                            className="form-control p-1 my-2"
                            value={this.state.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ name: e.target.value })} >
                        </input>
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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: e.target.value })} >
                        </input>
                        <button className="btn btn-primary btn-lg shadow mt-2">Register</button>
                    </form>
                </div>
            </div>
        );
    }
}