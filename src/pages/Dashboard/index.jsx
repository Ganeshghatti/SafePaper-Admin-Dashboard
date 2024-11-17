import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Paper Setters',
      path: '/dashboard/paper-setters',
      description: 'Manage paper setters'
    },
    {
      title: 'Guardians',
      path: '/dashboard/guardians',
      description: 'Manage guardians'
    },
    {
      title: 'Exam Centers',
      path: '/dashboard/exam-centers',
      description: 'Manage exam centers'
    }
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.path}>
            <Paper
              sx={{
                p: 3,
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'action.hover'
                }
              }}
              onClick={() => navigate(card.path)}
            >
              <Typography variant="h6" gutterBottom>
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
