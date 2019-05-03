import styled from 'styled-components'

export const ResultsTableContainer = styled.div``

export const Table = styled.table`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`

export const TableHead = styled.thead``

export const TableBody = styled.tbody``

export const TableRow = styled.tr`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`

export const TableData = styled.td`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  width: ${props => props.width}%;
  height: 100px;
  border: 1px solid gray;
`

//Here we just extend TableData
//If you want different styling for TableHeader
//You can put it below
export const TableHeader = styled.td`
  text-align: center;
  width: ${props => props.width}%;
  height: 30px;
`
