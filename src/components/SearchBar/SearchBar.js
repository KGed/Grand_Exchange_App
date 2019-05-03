import React, { Component } from 'react'

import { SearchBarContainer } from './SearchBarStyles'

import { CATEGORIES, BASE, BASE_URL } from '../Constants/apiConstants'

export class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedVersion: 'itemdb_rs',
      selectedCategory: '1',
      term: '',
      results: [],
      numOfResults: 0,
      selectedNumOfResults: 25
    }
  }

  handleSubmit = event => {
    event.preventDefault()

    let item = this.state.term.toLowerCase()
    let url =
      BASE +
      BASE_URL +
      'm=' +
      this.state.selectedVersion +
      '/api/catalogue/items.json?category=' +
      this.state.selectedCategory +
      '&alpha=' +
      item[0] +
      '&page=1'

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
      })
      .then(response => {
        this.props.handleSearch(response)
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
