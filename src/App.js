import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import SearchPage from './SearchPage'
import Book from './Book'
import { Link, Route } from 'react-router-dom'

class App extends Component {

  constructor(props) {
    super( props);
    this.updateShelf = this.updateShelf.bind(this)
    this.searchShelf = this.searchShelf.bind(this)
    this.clearMatchedBooks = this.clearMatchedBooks.bind(this)
  }

  state = {
    books: [],
    shelf: '',
    matchedBooks: []
  }

  componentDidMount() {
    BooksAPI
    .getAll()
    .then((books) => {
      this.setState({
        books
      });
    })
  }

  updateShelf = (book,shelf) => {
    this.setState( { shelf: shelf } )
      if( book.shelf !== shelf ){
        book.shelf = shelf
        BooksAPI
          .update(book, shelf)
          .then((res)=> {
            this.setState(state => ({
              books: state.books
                .filter(b => b.id !== book.id)
                .concat([ book ])
            }))
          })
      }
  }

  searchShelf = (query) => {
    this.setState({query: query})
      if(query.trim() !== '') {
        BooksAPI.search(query).then(
          res => {if (res && res.length) {this.setState({ matchedBooks: res })}
          }
        ).catch(function(e){
            console.log('error',e)
          });
      }
  }

  clearMatchedBooks() {
    this.setState({matchedBooks: []})
  }

  render() {

  const keys = [{"shelfid": "currentlyReading", "shelfname": "Currently Reading"}, {"shelfid":"wantToRead", "shelfname": "Want to Read"}, {"shelfid": "read", "shelfname": "Read"}]

    return (
      <div className="app">

        <Route exact path="/" render = {() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
              {keys.map((key) => (
                <BookShelf
                  key = {key.shelfid}
                  title={key.shelfname}
                  books={this.state.books.filter((book) => book.shelf === key.shelfid)}
                  onUpdateShelf={(book, shelf) => {this.updateShelf(book, shelf)}}
                />
              ))}
            <div className="open-search">
              <Link to="/search"> Add a book</Link>
            </div>
          </div>
        )}/>

        <Route path="/book/:bookID" component={Book} />

        <Route path="/search" render = {() => (
          <SearchPage
            onUpdateShelf={(book, shelf) => {this.updateShelf(book, shelf)}}
            books={this.state.matchedBooks}
            shelf={this.state.matchedBooks}
            onSearchShelf={(query)=>{this.searchShelf(query)}}
            closePage={this.clearMatchedBooks.bind(this)}
           />
        )}/>

      </div>
    );
  }
}

export default App;