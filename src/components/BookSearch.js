import React,{Component} from 'react'

class BookSearch extends Component {
    render() {
        return (
            <div className="form-inline">
                <input type="email" className="form-control" size="50" placeholder="Nhập tên sách, tên tác giả, vv ..." required />
            </div>
        )
    }

}

export default BookSearch
