import React, {Component} from 'react'

class BookDetail extends Component {
		constructor(props) {
				super(props)
				this.state = {
						book: [],
				}
		}

		binarySearch(arr, id) {
				var left = 0, right = arr.length, mid
				while(left < right) {
						mid = (left + right) >>> 1
						arr[mid]._id < id ? left = mid + 1: right = mid
				}

				return left
		}

		componentWillReceiveProps(nextProps) {
				const {books} = nextProps
				if(books && books.length) {
						const id = this.props.match.params.id
						var idx = this.binarySearch(books, id)

						this.setState({
								book: books[idx]
						})
				}
		}

		componentDidMount() {
				const db = this.props.db
				db.changes({
						live: true,
						since: 'now',
						include_docs: true
				}).on('change', change => {
						var doc = change.doc
						if(doc._id === this.state.book._id) {
								this.setState({
										book: doc
								})
						}
				})
		}

		render() {
				const {book} = this.state
				return (
					<div className="row book-detail">
						<div className="col-xs-12 col-md-4 col-lg-5 book-cover">
							<img src={book.cover} alt="book cover" />
						</div>
						<div className="col-xs-12 col-md-8 col-lg-7">
							<h2>{book.name}</h2>
							<h3>{book.author}</h3>
							<p dangerouslySetInnerHTML={{__html: book.description + '...'}}></p>
							<p><strong>ISBN: {book.isbn}</strong></p>
							<p><strong>Publisher: {book.provider}</strong></p>
							<p><strong>Quantity: {book.quantity}</strong></p>
							<p><strong>Borrowers: {book.borrowers}</strong></p>
							<div className="category-tag">
								<span><strong>Category: </strong></span>
								<p>Art</p>
								<p>Business</p>
								<p>Ebooks</p>
							</div>
						</div>
					</div>
				)
		}
}

export default BookDetail
