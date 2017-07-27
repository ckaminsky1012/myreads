import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';

function BookCase(props) {

    return (

	    <div className="list-books">
	        <div className="list-books-title">
	          <h1>MyReads</h1>
	        </div>
	        <div className="list-books-content">
		        <BookShelf
		            books={props.books.filter(book => book.shelf === 'currentlyReading')}
		            shelf={props.selectedShelf}
		            title="Currently Reading"
		            onUpdateShelf={props.onUpdateShelf}
		            getBookShelf={props.getBookShelf}
		        />
		        <BookShelf
		            books={props.books.filter(book => book.shelf === 'wantToRead')}
		            shelf={props.selectedShelf}
		            title="Want to Read"
		            onUpdateShelf={props.onUpdateShelf}
		            getBookShelf={props.getBookShelf}
		        />
		        <BookShelf
		            books={props.books.filter(book => book.shelf === 'read')}
		            shelf={props.selectedShelf}
		            title="Read"
		            onUpdateShelf={props.onUpdateShelf}
		            getBookShelf={props.getBookShelf}
		        />
		        <div className="open-search">
		            <Link to="/search" >Add a book</Link>
		        </div>
	        </div>
	    </div>
    ); //end return
} //end component

export default BookCase;