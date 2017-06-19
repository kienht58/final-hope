import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class BookItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            borrowed: false
        }
    }

    componentDidMount() {
        const {book} = this.props
        var borrowers = book.borrowers
        if(borrowers) {
            borrowers.forEach(function(borrower) {
                if(borrower.email === 'ha.h@teko.vn') {
                    this.setState({
                        borrowed: true
                    })
                }
            }, this)
        }
    }

    handleBorrow(event, book) {
        event.preventDefault()
        var that = this
        fetch('http://tekobooks.herokuapp.com/api/user/borrow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'ha.h@teko.vn',
                book_id: book.id
            })
        }).then(function(response) {
            if(response.status === 200) {
                const {db} = that.props
                fetch('http://tekobooks.herokuapp.com/api/user/1')
                    .then(function(response) {
                        response.json().then(function(json) {
                            var user = JSON.parse(json)
                            book.borrowers.push(user)
                            db.put({
                                _id: book._id,
                                _rev: book._rev,
                                author: book.author,
                                cover: book.cover,
                                description: book.description,
                                id: book.id,
                                isbn: book.isbn,
                                name: book.name,
                                pages: book.pages,
                                provider: book.provider,
                                publish_year: book.publish_year,
                                quantity: book.quantity,
                                categories: book.categories,
                                borrowers: book.borrowers
                            }).then(function(response) {
                                that.setState({
                                    borrowed: true
                                })
                            })
                        })
                    })
            }
        })
    }

    render() {
        const {book} = this.props
        const {borrowed} = this.state
        return (
            <div className="col-xs-6 col-md-4 col-lg-2">
                <div className="thumbnail">
                    <Link to={'/book/' + book.id}><img className="group list-group-image" src={book.cover} alt=""/></Link>
                    <div className="caption">
                        <div className="row">
                            <p className="text-description" style={{display: 'none'}} dangerouslySetInnerHTML={{__html: book.description}}></p>
                            <p>Star rating</p>
                        </div>
                        {(borrowed) ? (
                            <button className="btn btn-sm btn-default" disabled>Đã mượn</button>
                        ) : (
                            <button className="btn btn-sm btn-primary" onClick={(e) => this.handleBorrow(e, book)}>Mượn sách</button>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default BookItem
