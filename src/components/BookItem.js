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

    handleBorrow(event, id) {
        event.preventDefault()
        fetch('http://tekobooks.herokuapp.com/api/user/borrow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'ha.h@teko.vn',
                book_id: id
            })
        }).then(function(response) {
            if(response.status === 200) {
                this.setState({
                    borrowed: true
                })
            }
        }.bind(this))
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
                            <button className="btn btn-sm btn-primary" onClick={(e) => this.handleBorrow(e, book.id)}>Mượn sách</button>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default BookItem
