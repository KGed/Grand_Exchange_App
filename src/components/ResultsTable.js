import React, { Component } from 'react'

class Table extends Component {
  constructor (props) {
    super(props)
  }

  // Render Function
  render () {
    // generate table
    let rows = []
    for (let item of this.props.searchResults) {
      let itemID = item.id
      let cell = []
      let img = (
        <td key={'img' + itemID}>
          <img src={item.icon_large} />
        </td>
      )
      cell.push(img)
      cell.push(<td key={'name' + itemID}>{item.name}</td>)

      if (item.current.price[item.current.price.length - 1] == 'k') {
        cell.push(<td key={'price' + itemID}>{item.current.price}</td>)
      } else {
        cell.push(<td key={'price' + itemID}>{item.current.price + 'gp'}</td>)
      }

      cell.push(<td key={'description' + itemID}>{item.description}</td>)
      rows.push(<tr key={itemID}>{cell}</tr>)
    }

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>Icon</th>
              <th>Item</th>
              <th>Price</th>
              <th>Description</th>
            </tr>
            {rows}
          </tbody>
        </table>
        <p>Results Returned: {rows.length}</p>
      </div>
    )
  }
}

export default Table
