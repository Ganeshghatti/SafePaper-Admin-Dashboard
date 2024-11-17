import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Alert, CircularProgress } from '@mui/material';
import { getUsers, createUser, deleteUser } from '../../services/userService';
import PaperSetterTable from './components/PaperSetterTable';
import AddPaperSetterDialog from './components/AddPaperSetterDialog';

export default function PaperSetters() {
  const [paperSetters, setPaperSetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const loadPaperSetters = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUsers('paper-setter');
      setPaperSetters(response.data);
    } catch (err) {
      setError(err.message || 'Failed to load paper setters');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPaperSetters();
  }, []);

  const handleCreate = async (formData) => {
    try {
      setError(null);
      await createUser({
        ...formData,
        role: 'paper-setter'
      });
      setOpenDialog(false);
      loadPaperSetters();
    } catch (err) {
      setError(err.message || 'Failed to create paper setter');
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this paper setter?')) {
      try {
        setError(null);
        await deleteUser(userId);
        loadPaperSetters();
      } catch (err) {
        setError(err.message || 'Failed to delete paper setter');
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Paper Setters</Typography>
        <Button variant="contained" onClick={() => setOpenDialog(true)}>
          Add Paper Setter
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <PaperSetterTable 
          paperSetters={paperSetters} 
          onDelete={handleDelete} 
        />
      )}

      <AddPaperSetterDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleCreate}
      />
    </Box>
  );
}
