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
      const {books} = this.state
    return (
        <div>
        <div className="nav-container">
           <nav className="nav-inner transparent">

              <div className="navbar">
                 <div className="container">
                    <div className="row">

                      <div className="brand">
                        <Link to="/">TEKOBOOK</Link>
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
            exact path='/'
            render={(props) => (
              <BookList
                {...props}
                books = {books}
                db = {db}
              />
            )}
          />
          <Route
            path='/book/:id'
            render={(props) => (
              <BookDetail
                {...props}
                db = {db}
                books = {books}
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
