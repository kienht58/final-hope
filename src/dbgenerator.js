import PouchDB from 'pouchdb'
import fetch from 'isomorphic-fetch'

export default function generateDatabase(url) {
		var db = new PouchDB(url)
		db.info().then(function(result) {
			if(result.doc_count === 0) {
				fetch('http://tekobooks.herokuapp.com/api/book/?page=1&limit=100')
				.then(function(response) {
					response.json().then(function(book_json) {
						var books = JSON.parse(book_json).books
						books.forEach(function(book, idx) {
							fetch('http://tekobooks.herokuapp.com/api/book/get-borrowers/' + book.id)
								.then(function(res) {
									res.json().then(function(borrower_json) {
										var borrowers = JSON.parse(borrower_json)
										if(borrowers && borrowers.length) {
											book.borrowers = borrowers
										} else {
											book.borrowers = []
										}
										book._id = '' + book.id
										return db.put(book).then(function(response) {
											console.log("Data inserted into remote database")
										})
									})
								})
						})
					})
				})
			} else {
				console.log('Remote database already initiated. Start synchronizing...')
			}
		})
}
