import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Alert, CircularProgress } from '@mui/material';
import { getUsers, createUser, deleteUser } from '../../services/userService';
import ExamCenterTable from './components/ExamCenterTable';
import AddExamCenterDialog from './components/AddExamCenterDialog';

export default function ExamCenters() {
  const [examCenters, setExamCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const loadExamCenters = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUsers('exam-center');
      setExamCenters(response.data);
    } catch (err) {
      setError(err.message || 'Failed to load exam centers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExamCenters();
  }, []);

  const handleCreate = async (formData) => {
    try {
      setError(null);
      await createUser({
        ...formData,
        role: 'exam-center'
      });
      setOpenDialog(false);
      loadExamCenters();
    } catch (err) {
      setError(err.message || 'Failed to create exam center');
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this exam center?')) {
      try {
        setError(null);
        await deleteUser(userId);
        loadExamCenters();
      } catch (err) {
        setError(err.message || 'Failed to delete exam center');
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Exam Centers</Typography>
        <Button variant="contained" onClick={() => setOpenDialog(true)}>
          Add Exam Center
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
        <ExamCenterTable 
          examCenters={examCenters} 
          onDelete={handleDelete} 
        />
      )}

      <AddExamCenterDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleCreate}
      />
    </Box>
  );
}
