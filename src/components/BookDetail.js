import React, {Component} from 'react'

class BookDetail extends Component {
		constructor(props) {
			super(props)
			this.state = {
				book: [],
				borrowers: []
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

		keepSynchronizing(db) {
			var that = this
			db.changes({
				live: true,
				since: 'now',
				include_docs: true
			}).on('change', function(change) {
				var updatedBook = change.doc
				that.setState({
					book: updatedBook,
					borrowers: updatedBook.borrowers
				})
			}).on('error', console.log.bind(console))
		}

		componentDidMount() {
			const {books} = this.props
			if(books && books.length) {
				const id = this.props.match.params.id
				var idx = this.binarySearch(books, id)

				if(books[idx] !== this.state.book) {
					var book = books[idx]
					this.setState({
						book: book,
						borrowers: book.borrowers
					})
				}
			}
		}

		componentWillUpdate(nextProps, nextState) {
			const {books} = nextProps
			if(books && books.length) {
				const id = this.props.match.params.id
				var idx = this.binarySearch(books, id)

				if(books[idx] !== this.state.book) {
					var book = books[idx]
					this.setState({
						book: book,
						borrowers: book.borrowers
					})
				}
			}
		}

		componentDidUpdate() {
			const {db} = this.props
			this.keepSynchronizing(db)
		}

		render() {
				const {book, borrowers} = this.state
				return (
					<div className="container">
	        	<div className="row book-detail">
	                <div className="col-xs-4 item-photo">
	                    <img src='http://books.google.com/books/content?id=_MW7oQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api' className="book-cover" alt="book cover"/>
	                </div>
	                <div className="col-xs-5">
	                    <h3>{book.name}</h3>    
	                    <h5>{book.author}</h5>
	        
	                    <p>ISBN: {book.isbn}</p>
											<p>Publisher: {book.provider}</p>
											<p>Quantity: {book.quantity}</p>
											<div className="book-borrower">
												<span><strong>Borrowers: </strong></span>
												{borrowers.length ? (
													borrowers.map(function(borrower) {
														return (
															<img src={borrower.avatar} key={borrower.id} className="borrower-avatar" alt="avatar" />
														)
													})
												) : (
													<span>Chưa có ai mượn sách này</span>
												)}
											</div>
											<div className="category-tag">
												<span><strong>Category: </strong></span>
												<span>Art, </span>
												<span>Business, </span>
												<span>Ebooks</span>
											</div>                                               
	                </div>                              
	        
	                <div className="col-xs-9">
	                    <div style={{width:'100%'}}>
	                    		<hr />
	                        <p dangerouslySetInnerHTML={{__html: book.description}}></p>
	                    </div>
	                </div>		
	            </div>
	        </div>
				)
		}
}

export default BookDetail
