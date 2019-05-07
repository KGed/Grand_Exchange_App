import React, { Component } from 'react'

import { SearchBarContainer } from './SearchBarStyles'

import { CATEGORIES } from '../Constants/apiConstants'

import {
  getAllResultsFromCategoryByAlpha,
  filterResults
} from '../../data-management/apiWrapper'

export class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedVersion: 'itemdb_rs',
      selectedCategory: '1',
      term: '',
      results: [],
      numOfResults: 0,
      selectedNumOfResults: 25,
      getAllResults: getAllResultsFromCategoryByAlpha()
    }
  }

  handleSubmit = event => {
    event.preventDefault()

    let results = this.state.getAllResults(
      this.state.selectedCategory,
      this.state.term.toLowerCase()[0]
    )

    results.then(data => {
      let filt = filterResults(data, this.state.term)
      console.log(filt)
      this.props.handleSearch(filt)
    })
  }

  render () {
    // generate category list
    let categoryOptions = []
    for (let i = 0; i < CATEGORIES.length; i++) {
      let cell = []
      cell.push(
        <option key={i} value={i}>
          {CATEGORIES[i]}
        </option>
      )
      categoryOptions.push(cell)
    }

    return (
      <SearchBarContainer>
        <form className='search-bar' onSubmit={this.handleSubmit}>
          <select
            name={'version-selector'}
            value={this.state.selectedVersion}
            onChange={e => this.setState({ selectedVersion: e.target.value })}
          >
            <option value={'itemdb_rs'}>Runescape</option>
            <option value={'itemdb_oldschool'}>OSRS</option>
          </select>
          <select
            name={'category-selector'}
            value={this.state.selectedCategory}
            onChange={e => this.setState({ selectedCategory: e.target.value })}
          >
            {categoryOptions}
          </select>
          <input
            name={'search-bar'}
            placeholder='Search the Grand Exchange'
            type='text'
            value={this.state.term}
            onChange={e => this.setState({ term: e.target.value })}
          />
          <button type='submit'>Search</button>
        </form>
      </SearchBarContainer>
    )
  }
}
