import PouchDB from 'pouchdb'
import fetch from 'isomorphic-fetch'

PouchDB.plugin(require('pouchdb-upsert'))
export default function generateDatabase(url) {
	var db = new PouchDB(url)
	db.info().then(function(result) {
		fetch('https://tekobooks.herokuapp.com/api/book/?page=1&limit=100')
		.then(function(response) {
			response.json().then(function(book_json) {
				var books = JSON.parse(book_json).books
				books.forEach(function(book, idx) {
					fetch('https://tekobooks.herokuapp.com/api/book/get-borrowers/' + book.id)
					.then(function(res) {
						res.json().then(function(borrower_json) {
							var borrowers = JSON.parse(borrower_json)
							if(borrowers && borrowers.length) {
								book.borrowers = borrowers
							} else {
								book.borrowers = []
							}
							book._id = '' + book.id

							db.putIfNotExists(book._id, book).then(function(response) {
							}).catch(function(error) {
								console.log("error: ", error)
							})
						})
					})
				})
			})
		})
	})
}