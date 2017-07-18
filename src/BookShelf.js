import React from 'react';
import { Link } from 'react-router-dom'

class BookShelf extends React.Component {

	render() {

		const { books, onUpdateShelf } = this.props

		return (
			<div className="bookshelf">
            	<h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                	<ol className="books-grid">
                		{books.map((book) => (
                		<li key={book.id}>
                        <div className="book">
	                        <div className="book-top">
		                        <Link to={`/book/${book.id}`}>
		                        	<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}>
		                            </div>
		                        </Link>
	                            <div className="book-shelf-changer">
		                            <select value={book.shelf} onChange={event =>onUpdateShelf(book, event.target.value)}>
		                                <option value="none" disabled>Move to...</option>
		                                <option value="currentlyReading">Currently Reading</option>
		                                <option value="wantToRead">Want to Read</option>
		                                <option value="read">Read</option>
		                                <option value="none">None</option>
		                              </select>
	                            </div>
                          	</div>
                          	<div className="book-title">{book.title} </div>
                          	<div className="book-authors">{book.authors.join(', ')} </div>
                        </div>
                      	</li>
                      	))}
                	</ol>
                </div>
            </div>
		)
	}
}

export default BookShelf;