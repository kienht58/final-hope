import React, {Component} from 'react'

import BookItem from './BookItem'

class BookList extends Component {
		render() {
			const {books, db} = this.props
				return (
					<div className="row book-list">
						{(books && books.length) ? (
							books.map(book => {
								return (
									<BookItem book={book} db={db} key={book.id}/>
								)
							})
						) : (
							<div className="loading">Loading</div>
						)}
					</div>
				)
		}
}

export default BookList
