import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import SearchPage from './SearchPage'


class App extends Component {

  constructor(props) {
    super(props);
    this.updateShelf = this.updateShelf.bind(this)
    this.searchShelf = this.searchShelf.bind(this)
  }

  state = {
    books: [],
    showSearchPage: false,
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
    this.setState({shelf: shelf})
      if(book.shelf!== shelf){
        book.shelf = shelf
        BooksAPI
          .update(book, shelf)
          .then((res)=> {
            this.setState(state => ({
              books: state.books.filter(b => b.id !== book.id)
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

  toggleSearchPage() {
    this.setState({showSearchPage: !this.state.showSearchPage})
    this.setState({matchedBooks: []})
  }

  render() {

  const keys = [{"shelfid": "currentlyReading", "shelfname": "Currently Reading"}, {"shelfid":"wantToRead", "shelfname": "Want to Read"}, {"shelfid": "read", "shelfname": "Read"}]

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchPage
            closePage={this.toggleSearchPage.bind(this)}
            onUpdateShelf={(book, shelf) => {this.updateShelf(book, shelf)}}
            books={this.state.matchedBooks}
            shelf={this.state.matchedBooks}
            onSearchShelf={(query)=>{this.searchShelf(query)}}
           />
        )
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
                onUpdateShelf={(book, shelf) => {this.updateShelf(book, shelf)}}
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