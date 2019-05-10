import fetch from 'node-fetch'
import {
  fetchApiBegin,
  fetchApiSuccess,
  fetchApiFailure
} from '../actions/fetchActions'

import {
  CATEGORIES,
  BASE,
  BASE_URL,
  CATEGORY_PAGE_MAX_LENGTH
} from '../components/Constants/apiConstants'

/*
    Function:   fetchFromAPI
    Params:     url = string
    Purpose:    using the node-fetch module, verify the response is ok and then return the promise for a json response.
*/
const fetchFromAPI = async url => {
  let data = await fetch(BASE + url)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
    })
    .then(json => json)

  return data
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

export const getAllResultsFromCategoryByAlpha = async (category, alpha) => {
  // determine number of items in a category.
  let itemsInCategory = await getCatalogueByCategory(0)
  itemsInCategory = itemsInCategory.alpha.filter(item => {
    return item.letter == alpha
  })[0].items

  let searchResults = []
  for (let i = 1; i <= itemsInCategory % CATEGORY_PAGE_MAX_LENGTH; i++) {
    let res = await getCatalogueByAlpha(category, alpha, i)
    searchResults = [...searchResults, ...res.items]
  }

  return searchResults
}

export const filterResults = (results, term) => {
  let res = results.filter(item => {
    if (item.name.toLowerCase().includes(term.toLowerCase())) {
      return item
    }
  })
  return res
}

export const getFilteredResults = () => {
  let cache = {}

  return dispatch => {
    dispatch(fetchApiBegin())
    return async (category, alpha, searchTerm) => {
      if (cache[category] == undefined) {
        return getAllResultsFromCategoryByAlpha(category, alpha)
          .then(data => {
            cache[category] = {}
            cache[category][alpha] = data
            dispatch(
              fetchApiSuccess(filterResults(cache[category][alpha], searchTerm))
            )
            return data
          })
          .catch(error => dispatch(fetchApiFailure(error)))
      } else {
        return filterResults(cache[category][alpha], searchTerm)
      }
    }
  }
}
