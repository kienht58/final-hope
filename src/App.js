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
    db = new PouchDB('books')
    PouchDB.sync('books', 'http://localhost:5984/books', {
      live: true,
      retry: true
    })
    this.state = {
      books: []
    }
  }

  componentWillMount() {
    db.allDocs({include_docs: true}).then(res => {
      var allBooks =  res.rows.map(row => {
        return row.doc
      })

      this.setState({
        books: allBooks
      })
    })
  }

  render() { 
    return (
      <div className="App">
        <div className="App-header">
          <h2>TEKOBOOK</h2>
        </div>
        <div className="App-intro">
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
        </div>
      </div>
    )
  }
}

export default App;
