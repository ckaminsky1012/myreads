import React from 'react';
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

class BookDetail extends React.Component {

  state = {
    book: {}
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

    const { book } = this.state

    return (
      <div className="app">
        <Link className="close-search" to="/">Close</Link>
        <div className="container" style={{width: 970}}>
          <div className="row">
            <div className="col-md-3">
              <div className="book-cover-new" style={{ width: 181, height: 284,  backgroundImage: `url("${book.imageLinks && book.imageLinks.smallThumbnail}")` }}>
              </div>
            </div>
            <div className="col-md-7">
              <div className="indv-book-title">{book.title}</div>
              <div className="indv-book-subtitle">{book.subtitle}</div>
              <div className="indv-book-authors">By: {book.authors && book.authors.join(', ')}</div>
              <div className="indv-book-details">
              <br/>
                <p> {book.description} </p>
                <p> <b>Publisher:</b> {book.publisher} </p>
                <p> <b>Published On:</b> {book.publishedDate} </p>
                <p> <b>Page Count:</b> {book.pageCount} </p>
                <p> <b>Category:</b> {book.categories} </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) //end return
  } //end render
} //end component

export default BookDetail;