import PouchDB from 'pouchdb'
import fetch from 'isomorphic-fetch'

export default function generateDatabase(url) {
		var db = new PouchDB(url)
		db.info().then(function(result) {
			if(result.doc_count === 0) {
				fetch('http://tekobooks.herokuapp.com/api/book/?page=1&limit=10')
				.then(function(result) {
					result.json().then(function(res) {
						var books = JSON.parse(res).books
						books.forEach(function(book, idx) {
							fetch('http://tekobooks.herokuapp.com/api/book/get-borrowers/' + book.id)
								.then(function(result) {
									result.json().then(function(res) {
										var borrowers = JSON.parse(res)
										if(borrowers) {
											book.borrowers = borrowers
										}
										book._id = '' + book.id
										console.log(book)
										db.put(book).then(function(response) {
											console.log('insert successful', response)
										}).catch(function(error) {
											console.log(error)
										})
									})
								})
						})
					})
				})
			} else {
				console.log('already initiated. Prepare to sync.')
			}
		})
}