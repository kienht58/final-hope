import React, { Component } from 'react'
import PouchDB from 'pouchdb'

import './App.css'
import BookSearch from './components/BookSearch'

var db = new PouchDB('books')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        books: []
    }
  }

  componentWillMount() {
      db.sync('https://6c7ca13f-773e-463d-9c75-5c714cf8dd87-bluemix.cloudant.com/books', {
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
