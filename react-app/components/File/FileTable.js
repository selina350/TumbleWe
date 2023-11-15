import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

function createData (name, type) {
  return { name, type }
}

const rows = [
  createData('index.html' ),
  createData('', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
]
const FileTable = () => {
  return <Table sx={{ minWidth: 650 }}>
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        {/*<TableCell align="right">Type</TableCell>*/}
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row) => (
        <TableRow
          key={row.name}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          {/*<TableCell align="right">{row.type}</TableCell>*/}
        </TableRow>
      ))}
    </TableBody>
  </Table>
}

export default FileTable