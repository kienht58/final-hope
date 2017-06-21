import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom'
import PouchDB from 'pouchdb'

import './App.css'
import BookList from './components/BookList'
import BookDetail from './components/BookDetail'
import BookSearch from './components/BookSearch'
import Login from './components/Login'
import Register from './components/Register'

var db = new PouchDB('books')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        books: []
    }
  }

  componentWillMount() {
      db.sync('http://localhost:5984/books', {
        live: true,
        retry: true
      }).on('error', function(info) {
        console.log('error:', info)
      })
  }

  async componentDidMount() {
      //first time load or when change happen
      var that = this
      db.changes({
          live: true,
          limit: 50,
          since: 'now',
          include_docs: true
      }).on('change', function(change) {
         var bookList = that.state.books
         bookList.push(change.doc)
         that.setState({
             books: bookList
         })
      }).on('error', console.log.bind(console))

      //subsequences
      try {
          var result = await db.allDocs({
              include_docs: true
          })
          var allBooks = result.rows.map(function(row) {
              return row.doc
          })
          this.setState({
              books: allBooks
          })
          console.log('Books loaded and saved during componentDidMount phase of App component.')
      } catch (error) {
          console.log('error', error)
      }
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron text-center">
          <h1 className="logo">TEKOBOOK</h1>
          <label className="search-text">
            Tìm kiếm sách
            <BookSearch db={db}/>
          </label>
        </div>
        <div id="content" className="jumbotron">
          <Route
            exact path='/'
            render={(props) => (
              <BookList
                {...props}
                db = {db}
                books = {this.state.books}
              />
            )}
          />
          <Route
            path='/book/:id'
            render={(props) => (
              <BookDetail
                {...props}
                db = {db}
                books = {this.state.books}
              />
            )}
          />
          <Route
             exact path='/login'
             component={Login}
          />
          <Route
             exact path='/register'
             component={Register}
          />
        </div>
      <footer>
          <div className="footer-container">
              TEKOBOOK 2017
          </div>
      </footer>
    </div>
    )
  }
}

export default App;
