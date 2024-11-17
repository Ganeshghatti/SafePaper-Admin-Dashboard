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

export default function ExamCenterTable({ examCenters, onDelete }) {
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
          {examCenters.map((center) => (
            <TableRow key={center._id}>
              <TableCell>{center.name}</TableCell>
              <TableCell>{center.email}</TableCell>
              <TableCell>
                {new Date(center.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell align="center">
                <Tooltip title="Delete">
                  <IconButton
                    color="error"
                    onClick={() => onDelete(center._id)}
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
