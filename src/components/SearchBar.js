import React, { Component } from 'react'
import axios from 'axios'

const BASE = `https://cors-anywhere.herokuapp.com/`
const BASE_URL = 'http://services.runescape.com/'
const CATEGORIES = [
  'Miscellaneous',
  'Ammo',
  'Arrows',
  'Bolts',
  'Construction Materials',
  'Construction Projects',
  'Cooking Ingredients',
  'Costumes',
  'Crafting Materials',
  'Familiars',
  'Farming Produce',
  'Fletching Materials',
  'Food and Drink',
  'Herblore Materials',
  'Hunting Equipment',
  'Hunting Produce',
  'Jewellery',
  'Mage Armour',
  'Mage Weapons',
  'Melee Armour- Low Level',
  'Melee Armour Mid-Level',
  'Melee Armour - High Level',
  'Melee Weapons - Low Level',
  'Melee Weapons - Mid Level',
  'Melee Weapons - High Level',
  'Mining and Smithing',
  'Potions',
  'Prayer Armour',
  'Prayer Materials',
  'Range Armour',
  'Range Weapons',
  'Runecrafting',
  'Runes, Spells, and Teleports',
  'Seeds',
  'Summoning Scrolls',
  'Tools and Containers',
  'Woodcutting product',
  'Pocket Items'
]

class SearchBar extends Component {
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
      <div>
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
      </div>
    )
  }
}

export default SearchBar
