import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Alert, CircularProgress } from '@mui/material';
import { getUsers, createUser, deleteUser } from '../../services/userService';
import GuardianTable from './components/GuardianTable';
import AddGuardianDialog from './components/AddGuardianDialog';

export default function Guardians() {
  const [guardians, setGuardians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const loadGuardians = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUsers('guardian');
      setGuardians(response.data);
    } catch (err) {
      setError(err.message || 'Failed to load guardians');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGuardians();
  }, []);

  const handleCreate = async (formData) => {
    try {
      setError(null);
      await createUser({
        ...formData,
        role: 'guardian'
      });
      setOpenDialog(false);
      loadGuardians();
    } catch (err) {
      setError(err.message || 'Failed to create guardian');
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this guardian?')) {
      try {
        setError(null);
        await deleteUser(userId);
        loadGuardians();
      } catch (err) {
        setError(err.message || 'Failed to delete guardian');
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Guardians</Typography>
        <Button variant="contained" onClick={() => setOpenDialog(true)}>
          Add Guardian
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
        <GuardianTable 
          guardians={guardians} 
          onDelete={handleDelete} 
        />
      )}

      <AddGuardianDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleCreate}
      />
    </Box>
  );
}
