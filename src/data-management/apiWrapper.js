const fetch = require('node-fetch')

import {
  CATEGORIES,
  BASE,
  BASE_URL
} from '../components/Constants/apiConstants'

/*
    Function:   fetchFromAPI
    Params:     url = string
    Purpose:    using the node-fetch module, verify the response is ok and then return the promise for a json response.
*/
const fetchFromAPI = url => {
  return fetch(BASE + url).then(response => {
    if (response.ok) {
      return response.json()
    }
  })
}

/*
    Function:   getCatalogueByCategory
    Params:     category = integer/string
    Purpose:    returns a Promise for a JSON reponse from the Runescape API. Response is a list containing the number of items in that category associated with the beginning letter.
*/
const getCatalogueByCategory = category => {
  const url = `http://services.runescape.com/m=itemdb_rs/api/catalogue/category.json?category=${category}`
  return fetchFromAPI(url)
}

/*
    Function:   getCatalogueByAlpha
    Params:     category = integer/string
                alpha    = string
                page     = integer/string
    Purpose:    returns a Promise for a JSON reponse from the Runescape API. Response is a list of items from the GE with the first letter provided on the page provided.
*/
const getCatalogueByAlpha = (category, alpha, page) => {
  const url = `http://services.runescape.com/m=itemdb_rs/api/catalogue/items.json?category=${category}&alpha=${alpha}&page=${page}`
  return fetchFromAPI(url)
}

export const getAllResultsFromCategoryByAlpha = () => {
  let cache = {}

  return async (category, alpha) => {
    if (cache[category] == undefined) {
      // determine number of items in a category.
      let itemsInCategory = await getCatalogueByCategory(0)

      if (itemsInCategory == undefined) {
      }
      itemsInCategory = itemsInCategory.alpha.filter(item => {
        return item.letter == alpha
      })[0].items

      let searchResults = []
      for (let i = 1; i <= itemsInCategory % 12; i++) {
        let res = await getCatalogueByAlpha(category, alpha, i)
        searchResults = [...searchResults, ...res.items]
      }

      cache[category] = {}
      cache[category][alpha] = searchResults

      return searchResults
    } else {
      return cache[category][alpha]
    }
  }
}

export const filterResults = (results, term) => {
  return results.filter(item => {
    if (item.name.toLowerCase().includes(term.toLowerCase())) {
      return item
    }
  })
}
