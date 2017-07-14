import React from 'react';
import * as BooksAPI from './BooksAPI'

class Book extends React.Component {

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
    console.log(this.state.book.imageLinks)

    return (

      <div className="bookshelf">
      <div className="book-cover" style={{ width: 300, height: 396, backgroundImage: `url("${book.imageLinks && book.imageLinks.smallThumbnail}")` }}>
                  </div>
        <div className="bookshelf-books">
          <ol className="books-grid">
            <li>
              <div className="book">
                <div className="book-top">
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </div>
    )
  }
}

export default Book;