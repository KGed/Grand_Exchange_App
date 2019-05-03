import React, { Component } from 'react';

import SearchBar from './SearchBar';
import ResultsTable from './ResultsTable';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {searchResults: [], resultsTotal: 0}
  }

  handleSearch = data => {
    this.setState({searchResults: data.items, resultsTotal: data.total})
  }

  render() {
    return (
      <div>
        <div>React simple starter</div>
        <SearchBar handleSearch={this.handleSearch} />
        <ResultsTable 
          searchResults={this.state.searchResults}
          resultsTotal={this.state.resultsTotal}
        />
      </div>
    );
  }
}
