import * as React from 'react';
import { Link } from 'react-router-dom';

export interface BookCardProps {
    book: { id: number, title: string, author: string, price: number, name: string}
}

const BookCard: React.SFC<BookCardProps> = (props) => {
    return (
        <div className="col-md-6">
            <div className="card m-2 border border-info">
                <div className="card-body">
                    <div className="card-title font-weight-bold border border-dark border-top-0 border-left-0 border-right-0">Title: {props.book.title}</div>
                    <div className="card-subtitle">Author: {props.book.author}</div>
                    <div className="card-text">Price: ${props.book.price}</div>
                    <div className="card-footer border border-dark border-bottom-0 border-left-0 border-right-0">Category: {props.book.name}</div>
                    <Link to={`/books/${props.book.id}`} className="btn btn-outline-info mt-2">View Book</Link>
                </div>
            </div>
        </div>
    );
}

export default BookCard;