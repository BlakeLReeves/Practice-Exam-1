import * as React from 'react';
import { Link } from 'react-router-dom';

export interface NavbarProps { }

const Navbar: React.SFC<NavbarProps> = () => {
    return (
        <nav className="nav bg-dark">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/books" className="nav-link">Books</Link>
            <Link to="/books/new" className="nav-link">Post Book</Link>
            <Link to="/login" className="nav-link">Login</Link>
            <Link onClick={() => {localStorage.clear(); this.props.history.replace('/')}} to="/" className="nav-link">Logout</Link>
            <Link to="/register" className="nav-link">Register</Link>
        </nav>
    );
}

export default Navbar;