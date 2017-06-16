import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import PouchDB from 'pouchdb'

import './App.css'
import BookList from './components/BookList'
import BookDetail from './components/BookDetail'

var db

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: []
    }
  }

  async componentDidMount() {
    db = new PouchDB('books')
    PouchDB.sync('books', 'http://localhost:5984/books', {
      live: true,
      retry: true
    })
    var result = await db.allDocs({include_docs: true})
    console.log(result)
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
                <a className="navbar-brand" href="#myPage">Logo</a>
              </div>
              <div className="collapse navbar-collapse" id="myNavbar">
                <ul className="nav navbar-nav navbar-right">
                  <li><a href="#about">Login</a></li>
                  <li><a href="#services">Register</a></li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div className="jumbotron text-center">
          <h1>TEKOBOOK</h1>
          <p>Seach for books</p>
          <form className="form-inline">
            <input type="email" className="form-control" size="50" placeholder="Input anything e.g. name, author, category ..." required />
          </form>
        </div>
        <div id="content" className="container">
          <Route
            exact path='/'
            render={(props) => (
              <BookList
                {...props}
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
        </div>
      <footer>TEKOBOOK 2017</footer>
      </div>
    )
  }
}

export default App;
