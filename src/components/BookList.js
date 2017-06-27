import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class BookList extends Component {
		render() {
			var {books} = this.props
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
			 								   <Link to={'/tekobook/book/' + book.id}><img src={book.cover} className="img-responsive" alt="Book cover" /></Link>
											   <Link to={'/tekobook/book/' + book.id} className="btn btn-default">Read More</Link>
			 								</div>
			 							</div>
										)
									})
									) : (
										<div className="preloader">

									        <div className="sk-spinner sk-spinner-pulse"></div>

									    </div>
									)}
							</div>
				 		</div>
					</section>
				)
		}
}

export default BookList
