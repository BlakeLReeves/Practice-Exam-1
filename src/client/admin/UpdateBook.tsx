import * as React from 'react';
import { json, User } from '../utils/api';
import { RouteComponentProps } from 'react-router';

export interface IUpdateBookProps extends RouteComponentProps<{ id: string }> { }

export interface IUpdateBookState {
    title: string;
    author: string;
    price: number;
    categoryid: number;
    categories: { id: number, name: string }[];
    selectedCategoryId: string;
}

export default class UpdateBook extends React.Component<IUpdateBookProps, IUpdateBookState> {
    constructor(props: IUpdateBookProps) {
        super(props);
        this.state = {
            title: null,
            author: null,
            price: null,
            categoryid: null,
            categories: [],
            selectedCategoryId: null
        };

        this.handleEdit = this.handleEdit.bind(this);
        this.handleSelectCategoryChange = this.handleSelectCategoryChange.bind(this);

    }

    async componentWillMount() {
        // if(!Author || Author.authorid === null || Author.role !== 'admin') {
        //     this.props.history.replace('/login');
        // }
        let id = this.props.match.params.id;

        try {
            let book = await json(`/api/books/${id}`);
            this.setState({
                title: book.title,
                author: book.author,
                price: book.price,
                categoryid: book.categoryid
            });

            let categories = await json('/api/categories');
            this.setState({ categories });
        } catch (e) {
            console.log(e);
        }
    }

    async handleEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        let id = this.props.match.params.id;
        let data = {
            title: this.state.title,
            author: this.state.author,
            price: this.state.price,
            categoryid: this.state.selectedCategoryId
        }
        console.log(data)
        try {

            let result = await json(`/api/books/${id}`, 'PUT', data);
            if (result) {
                this.setState({
                    title: '',
                    author: '',
                    price: null,
                    categoryid: null
                })
            }

            this.props.history.replace('/books');
        } catch (e) {
            console.log(e);
        }
    }

    renderCategories() {
        return this.state.categories.map(category => {
            return <option key={category.id} value={category.id}>{category.name}</option>
        })
    }

    handleSelectCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({ selectedCategoryId: e.target.value })
    }

    render() {

        const { title, author, price, categoryid } = this.state;

        return (
            <div className="row">
                <div className="col-md-12">
                    <form onSubmit={(e) => this.handleEdit(e)} className="form-group m-2">
                        <label>Title:</label>
                        <input 
                        type="text" 
                        value={title} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ title: e.target.value })} 
                        className="form-control d-block" 
                        placeholder={title} >
                        </input>
                        <label>Author:</label>
                        <input 
                        type="text" 
                        value={author} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ author: e.target.value })} 
                        className="form-control d-block" 
                        placeholder={author} >
                        </input>
                        <label>Price:</label>
                        <input 
                        type="number" 
                        value={price} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ price: e.target.valueAsNumber })} 
                        className="form-control d-block" >
                        </input>
                        <label>Category:</label>
                        <select
                            value={this.state.selectedCategoryId}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => this.setState({ selectedCategoryId: e.target.value })}
                            className="form-control p-1 my-2"
                        >
                            <option>Select a category ...</option>
                            {this.renderCategories()}
                        </select>
                        <div className="d-flex justify-content-between align-items-center">
                            <button className="btn btn-info mt-2">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}