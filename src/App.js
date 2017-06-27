import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom'
import PouchDB from 'pouchdb'

import './App.css'
import BookSearch from './components/BookSearch'
import BookList from './components/BookList'
import BookDetail from './components/BookDetail'

var db = new PouchDB('books')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        books: []
    }
  }

  componentDidMount() {
      var that = this
      db.sync('https://6c7ca13f-773e-463d-9c75-5c714cf8dd87-bluemix.cloudant.com/books', {
        live: true,
        retry: true
    }).on('change', function(change) {
        var flags = {};
        var newBooks = change.change.docs.filter(function(doc) {
            if(flags[doc.id]) {
                return false
            }

            flags[doc.id] = true
            return true
        })
        that.setState({
            books: newBooks
        })
    }).on('error', function(info) {
        console.log('error:', info)
      })
          db.allDocs({
              include_docs: true
          }).then(function(result) {
              var allBooks = result.rows.map(function(row) {
                  return row.doc
              })
              that.setState({
                  books: allBooks
              })
          }).catch(function(error) {
              console.log('error', error)
          })
  }

  render() {
      var allBooks = this.state.books
      allBooks.sort(function(a, b) {
          return a.id - b.id
      })
    return (
        <div>
        <div className="nav-container">
           <nav className="nav-inner transparent">

              <div className="navbar">
                 <div className="container">
                    <div className="row">

                      <div className="brand">
                        <Link to="/tekobook">TEKOBOOK</Link>
                      </div>

                    </div>
                 </div>
              </div>

           </nav>
        </div>


        <section id="header" className="header-five">
        	<div className="container">
        		<div className="row">

        			<div className="col-md-offset-3 col-md-6 col-sm-offset-2 col-sm-8">
                  <div className="header-thumb">
                      <h1 className="wow">Tìm kiếm sách</h1>
                      <BookSearch db={db} />
                  </div>
        			</div>

        		</div>
        	</div>
        </section>

        <Route
            exact path='/tekobook'
            render={(props) => (
              <BookList
                {...props}
                books = {allBooks}
                db = {db}
              />
            )}
          />
          <Route
            path='/tekobook/book/:id'
            render={(props) => (
              <BookDetail
                {...props}
                db = {db}
                books = {allBooks}
              />
            )}
          />

        <footer>
        	<div className="container">
        		<div className="row">
        			<div className="col-md-12 col-sm-12">
        				<p className="wow">TEKOBOOK © 2017</p>
        			</div>

        		</div>
        	</div>
        </footer>
    </div>
    )
  }
}

export default App;
