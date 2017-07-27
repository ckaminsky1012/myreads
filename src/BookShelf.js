import React from 'react'
import Book from './Book'

function BookShelf(props) {

    return (

      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{props.title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {props.books.map((book, id) => (
                <li key={id}>
                  <Book
                    book={book}
                    onUpdateShelf={props.onUpdateShelf}
                    shelf={props.shelf}
                    getBookShelf={props.getBookShelf}
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    )// end of return
}// end of class

export default BookShelf