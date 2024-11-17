import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function GuardianTable({ guardians, onDelete }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {guardians.map((guardian) => (
            <TableRow key={guardian._id}>
              <TableCell>{guardian.name}</TableCell>
              <TableCell>{guardian.email}</TableCell>
              <TableCell>
                {new Date(guardian.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell align="center">
                <Tooltip title="Delete">
                  <IconButton
                    color="error"
                    onClick={() => onDelete(guardian._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
