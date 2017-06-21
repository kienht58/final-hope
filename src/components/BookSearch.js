import React, {Component} from 'react'
import Autosuggest from 'react-autosuggest'

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(arr, value) {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('\\b' + escapedValue, 'i');

  return arr.filter(item => regex.test(getSuggestionValue(item)));
}

function getSuggestionValue(suggestion) {
  return suggestion.name
}

function renderSuggestion(suggestion, { query }) {
  const name = suggestion.name 
  const author = suggestion.author
  const cover = suggestion.cover

  return (
    <div className='row suggestion-content'>
      <div className="cover col-xs-3 col-md-4 col-lg-4">
        <img src={cover} alt="book author"/>
      </div>
      <div className="book-info col-xs-9 col-md-8 col-lg-8">
        <h4>{name}</h4>
        <h5>{author}</h5>
      </div>
    </div>
  );
}

class BookSearch extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
      dataSource: []
    };    
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(this.state.dataSource, value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  async componentDidMount() {
    const {db} = this.props
    var result = await db.allDocs({
      include_docs: true
    })
    var allBooks = result.rows.map(function(row) {
      return row.doc
    })
    this.setState({dataSource: allBooks})
  }

  render() {
    const { value, suggestions } = this.state;
    console.log(suggestions)
    const inputProps = {
      placeholder: "Nhập tên sách, tên tác giả, vv ...",
      value,
      onChange: this.onChange
    };

    return (
      <div className="container">
        <Autosuggest 
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps} />
      </div>
    );
  }
}

export default BookSearch