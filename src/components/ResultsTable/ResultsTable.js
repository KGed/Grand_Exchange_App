import React, { Component } from 'react'

import {
  ResultsTableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableData
} from './ResultsTableStyles'

export class ResultsTable extends Component {
  constructor (props) {
    super(props)
  }

  renderTableHeader = () => {
    return (
      <TableHead>
        <TableRow>
          <TableHeader width={10}>Icon</TableHeader>
          <TableHeader width={20}>Item</TableHeader>
          <TableHeader width={20}>Price</TableHeader>
          <TableHeader width={50}>Description</TableHeader>
        </TableRow>
      </TableHead>
    )
  }

  renderTableBody = () => {
    const { searchResults } = this.props

    return (
      <TableBody>
        {searchResults.map(item => {
          return (
            <TableRow key={item.id}>
              <TableData width={10}>
                <img src={item.icon_large} />
              </TableData>
              <TableData width={20}>{item.name}</TableData>
              <TableData width={20}>
                {item.current.price[item.current.price.length - 1] === 'k' ||
                item.current.price[item.current.price.length - 1] === 'm'
                  ? item.current.price
                  : `${item.current.price}gp`}
              </TableData>
              <TableData width={50}>{item.description}</TableData>
            </TableRow>
          )
        })}
      </TableBody>
    )
  }

  // Render Function
  render () {
    return (
      <ResultsTableContainer>
        <Table>
          {this.renderTableHeader()}
          {this.renderTableBody()}
        </Table>
      </ResultsTableContainer>
    )
  }
}
