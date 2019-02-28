import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom'
import { json } from '../utils/api';

export interface IViewBookProps extends RouteComponentProps<{ id: string }> { }

export interface IViewBookState {
    book: {
        title: string;
        author: string;
        price: number;
        name: string;
    };
}

export default class ViewBook extends React.Component<IViewBookProps, IViewBookState> {
    constructor(props: IViewBookProps) {
        super(props);
        this.state = {
            book: {
                title: null,
                author: null,
                price: null,
                name: null
            },
        };

        this.handleDelete = this.handleDelete.bind(this);

    }

    async componentWillMount() {
        let id = this.props.match.params.id;
        try {

            let book = await json(`/api/books/${id}`);

            this.setState({ book });
        } catch (e) {
            console.log(e);
        }
    }

    async handleDelete() {
        let id = this.props.match.params.id;
        try {

            let result = await json(`/api/books/${id}`, 'DELETE');

            this.props.history.push('/books');
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <div className="card m-2 border border-info">
                        <div className="card-body">
                            <div className="card-title font-weight-bold border border-dark border-top-0 border-left-0 border-right-0">Title: {this.state.book.title}</div>
                            <div className="card-subtitle">Author: {this.state.book.author}</div>
                            <div className="card-text">Price: ${this.state.book.price}</div>
                            <div className="card-footer border border-dark border-bottom-0 border-left-0 border-right-0">Category: {this.state.book.name}</div>
                            <div className="d-flex justify-content-between align-items-center">
                                <Link to={`/books/${this.props.match.params.id}/update`} className="btn btn-outline-info mt-2">Edit</Link>
                                <button onClick={this.handleDelete} className="btn btn-danger mt-2">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}