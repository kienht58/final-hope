import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class BookList extends Component {
		render() {
			const {books} = this.props
				return (
					<section id="blog">
						<div className="container">

							<h1>Danh mục sách</h1>

						  <div className="row">
							  {(books && books.length) ? (
								  books.map(book => {
									  return (
			 							<div className="wow col-md-2 col-sm-2" key={book.id}>
			 								<div className="blog-thumb">
			 								   <Link to={'book/' + book.id}><img src={book.cover} className="img-responsive" alt="Book cover" /></Link>

			 								</div>
			 							</div>
										)
									})
									) : (
										<div className="loading">Loading</div>
									)}
							</div>
				 		</div>
					</section>
				)
		}
}

export default BookList
