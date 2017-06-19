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
      <div className="App">
        <div className="App-header">
          <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <Link to='/' className="navbar-brand">Logo</Link>
              </div>
              <div className="collapse navbar-collapse" id="myNavbar">
                <ul className="nav navbar-nav navbar-right">
                  <li><a href="/login">Đăng nhập</a></li>
                  <li><a href="/register">Đăng kí</a></li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div className="jumbotron text-center">
          <h1>TEKOBOOK</h1>
          <p>Tìm kiếm sách</p>
          <BookSearch db={db}/>
        </div>
        <div id="content" className="container">
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
