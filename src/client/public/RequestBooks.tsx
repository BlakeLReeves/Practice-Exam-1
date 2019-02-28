import * as React from 'react';
import { json } from '../utils/api';

import BookCard from './BookCard';

interface IRequestBooksProps {

}

interface IRequestBooksState {
    books: Array<{ id: number, title: string, author: string, price: number, name: string }>;
}

export default class IRequestBooksApp extends React.Component<IRequestBooksProps, IRequestBooksState> {

    constructor(props: IRequestBooksProps) {
        super(props);

        this.state = { books: [] };
    }

    async componentDidMount() {
        try {
            let books = await json('/api/books');
            this.setState({ books });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <>
                <div className="row">
                    {this.state.books.map(book => {
                        return <BookCard key={book.id} book={book} />
                    })}
                </div>
            </>
        )
    }
}