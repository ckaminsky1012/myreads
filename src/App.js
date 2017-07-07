import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import SearchPage from './SearchPage'

class App extends Component {

  state = {
    books: [],
    showSearchPage: false
  }

  componentDidMount() {
  BooksAPI.getAll().then((books) => {
    this.setState({ books: books})
    console.log(books)
    })
  }

  toggleSearchPage() {
    this.setState({showSearchPage: !this.state.showSearchPage})
  }

  render() {

  const keys = [{"shelfid": "currentlyReading", "shelfname": "Currently Reading"}, {"shelfid":"wantToRead", "shelfname": "Want to Read"}, {"shelfid": "read", "shelfname": "Read"}]

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchPage closePage={this.toggleSearchPage.bind(this)}/> )
        :
        (<div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
            {keys.map((key) => (
              <BookShelf
                key = {key.shelfid}
                title={key.shelfname}
                books={this.state.books.filter((book) => book.shelf === key.shelfid)}
              />
            ))}
          <div className="open-search">
            <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
          </div>
        </div>
        )}
      </div>
    );
  }
}

export default App;