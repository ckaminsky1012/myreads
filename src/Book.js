import React from 'react';
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class Book extends React.Component {

  state = {
    book: ''
  }

  componentDidMount() {
    BooksAPI
    .get(this.props.match.params.bookID)
    .then((book) => {
      this.setState({
        book
      });
    })
  }

	render() {

    console.log(this.state.book)

    const {book} = this.state
		return (
		  <p>hello, {book.title} is the correct id.</p>
		)
	}
}

export default Book;