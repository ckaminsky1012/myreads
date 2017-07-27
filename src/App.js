import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookCase from './BookCase'
import SearchPage from './SearchPage'
import BookDetail from './BookDetail'
import { Route } from 'react-router-dom'

class App extends Component {

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

  getBookShelf = (book) => {
    const existingBook = this.state.books.find(b => b.id === book.id)
      if (existingBook) return existingBook.shelf
    return book.shelf
    }

  render() {

    return (
      <div className="app">

        <Route exact path="/" render = {() => (
          <BookCase
            books={this.state.books}
            onUpdateShelf={this.updateShelf}
            shelf={this.state.shelf}
            getBookShelf={this.getBookShelf}
          />
        )}/>

        <Route path="/book/:bookID" component={BookDetail} />

        <Route path="/search" render = {() => (
          <SearchPage
            onUpdateShelf={(book, shelf) => {this.updateShelf(book, shelf)}}
            books={this.state.matchedBooks}
            shelf={this.state.matchedBooks}
            onSearchShelf={(query)=>{this.searchShelf(query)}}
            closePage={this.clearMatchedBooks}
            getBookShelf={this.getBookShelf}
           />
        )}/>

      </div>
    );
  }
}

export default App;