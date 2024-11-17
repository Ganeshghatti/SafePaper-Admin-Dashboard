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

export default function PaperSetterTable({ paperSetters, onDelete }) {
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
          {paperSetters.map((paperSetter) => (
            <TableRow key={paperSetter._id}>
              <TableCell>{paperSetter.name}</TableCell>
              <TableCell>{paperSetter.email}</TableCell>
              <TableCell>
                {new Date(paperSetter.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell align="center">
                <Tooltip title="Delete">
                  <IconButton
                    color="error"
                    onClick={() => onDelete(paperSetter._id)}
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
