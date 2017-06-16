import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class BookList extends Component {
		render() {
			const {books} = this.props
			var bookList = books.map(book => {
				return (
					<div
						key={book.id}
						className="col-xs-6 col-md-4 col-lg-2"
					>
						<div className="thumbnail">
							<Link to={'/book/' + book.id}><img className="group list-group-image" src={book.cover} alt=""/></Link>
							<div className="caption">
								<div className="row">
									<p className="text-description" style={{display: 'none'}} dangerouslySetInnerHTML={{__html: book.description}}></p>
									<p>Star rating</p>
								</div>
								<a className="btn btn-sm btn-default">Add to Read</a>
							</div>
						</div>
					</div>
				)
			})
				return (
					<div className="row book-list">
						{bookList}
					</div>
				)
		}
}

export default BookList