import React from 'react';
import escapeRegExp from 'escape-string-regexp';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book'
import DebounceInput from 'react-debounce-input';

class SearchPage extends React.Component {

	static PropTypes = {
		books: PropTypes.array.isRequired,
		onUpdateShelf: PropTypes.func.isRequired,
		onSearchShelf: PropTypes.func.isRequired,
		closePage: PropTypes.func.isRequired,
		shelf:PropTypes.string.isRequired,
		getBookShelf: PropTypes.func.isRequired
	}

	state = {
		query: ''
	}

	updateQuery = (query) => {
     	this.setState({query})
     	this.props.onSearchShelf(query)
    }

	render() {

		const {books, onUpdateShelf, shelf, getBookShelf} = this.props
		const { query } = this.state

		let showingBooks
    		if(query){
	        	let match = new RegExp (escapeRegExp(query),'i')
	       			showingBooks= books.filter(book=>match.test(book.title) || match.test(book.authors))
	       	}
			else {
  				showingBooks = books
    		}

		return (
			<div className="search-books">
			    <div className="search-books-bar">
			        <Link className="close-search" onClick={this.props.closePage} to="/">Close
			        </Link>
			            <div className="search-books-input-wrapper">
			            	<DebounceInput
				            	debounceTimeout={250}
				            	type="text"
				            	value={this.state.query}
				            	placeholder="Search by title or author"
	            				onChange= {event => this.updateQuery(event.target.value)}
			            	/>
			            </div>
			    </div>
			    <div className="search-books-results">
              		<ol className="books-grid">
                		{showingBooks.map((book, id) => (
                  			<li key={id}>
			                    <Book
			                      book={book}
			                      onUpdateShelf={onUpdateShelf}
			                      shelf={shelf}
			                      getBookShelf={getBookShelf}
			                    />
                  			</li>
            			))}
             		 </ol>
             	</div>
          	</div>

		) //end return
	} // end render
} //end component

export default SearchPage;