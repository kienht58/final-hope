import React,{Component} from 'react'

class BookSearch extends Component {
    render() {
        return (
        	<div>
            <input type="email" aria-label="Tìm kiếm sách" id="book-search" className="form-control" size="50" placeholder="Nhập tên sách, tên tác giả, vv ..." required />
        	</div>
        )
    }

}

export default BookSearch
