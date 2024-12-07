import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  IconButton,
  CircularProgress,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import SecurityIcon from "@mui/icons-material/Security";
import EventIcon from "@mui/icons-material/Event";
import { examService } from "../../services/examService";
import { showToast } from "../../utils/toast";

export default function Dashboard() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
  });
  const [error, setError] = useState(null);
  const [currentExam, setCurrentExam] = useState(null);
  const [loadingExam, setLoadingExam] = useState(true);

  const cards = [
    {
      title: "Paper Setters",
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      path: "/dashboard/paper-setters",
      description: "Manage paper setters and their submissions",
    },
    {
      title: "Guardians",
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      path: "/dashboard/guardians",
      description: "Manage guardians for key sharing",
    },
    {
      title: "Exam Centers",
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      path: "/dashboard/exam-centers",
      description: "Manage exam centers and their access",
    },
  ];

  useEffect(() => {
    loadCurrentExam();
  }, []);

  const loadCurrentExam = async () => {
    try {
      setLoadingExam(true);
      const response = await examService.getCurrentExam();
      setCurrentExam(response.data);
    } catch (err) {
      showToast.error(err.message);
    } finally {
      setLoadingExam(false);
    }
  };

  const handleDeleteExam = async () => {
    if (!window.confirm("Are you sure you want to delete this exam?")) return;

    try {
      await examService.deleteExam(currentExam._id);
      showToast.success("Exam deleted successfully");
      setCurrentExam(null);
    } catch (err) {
      showToast.error(err.message);
    }
  };

  const validateForm = () => {
    const currentDate = new Date();
    const selectedDate = new Date(formData.date);
    const [startHour, startMinute] = formData.startTime.split(":");
    const [endHour, endMinute] = formData.endTime.split(":");

    // Create date objects for start and end times
    const examStartDate = new Date(selectedDate);
    examStartDate.setHours(parseInt(startHour), parseInt(startMinute));

    const examEndDate = new Date(selectedDate);
    examEndDate.setHours(parseInt(endHour), parseInt(endMinute));

    // Check if exam start time is in future
    if (examStartDate <= currentDate) {
      setError("Exam start time must be in the future");
      return false;
    }

    // Check if end time is after start time
    if (examEndDate <= examStartDate) {
      setError("End time must be after start time");
      return false;
    }

    return true;
  };

  const handleScheduleExam = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (!validateForm()) return;

      await examService.scheduleExam(formData);
      showToast.success("Exam scheduled successfully");
      setOpenDialog(false);
      setFormData({ date: "", startTime: "", endTime: "" });
      loadCurrentExam();
    } catch (err) {
      setError(err.message || "Failed to schedule exam");
      showToast.error(err.message || "Failed to schedule exam");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.title}>
            <Paper
              sx={{
                p: 3,
                textAlign: "center",
                cursor: "pointer",
                "&:hover": { bgcolor: "action.hover" },
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onClick={() => navigate(card.path)}
            >
              {card.icon}
              <Typography variant="h6" sx={{ mt: 2 }}>
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {card.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Exam Management</Typography>
          {!currentExam && (
            <Button
              variant="contained"
              startIcon={<EventIcon />}
              onClick={() => setOpenDialog(true)}
            >
              Schedule New Exam
            </Button>
          )}
        </Box>
      </Paper>

      {loadingExam ? (
        <CircularProgress size={24} />
      ) : currentExam ? (
        <Box sx={{ mb: 3, mt: 3 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Current Exam
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography>
                  Date: {new Date(currentExam.date).toLocaleDateString()}
                </Typography>
                <Typography>
                  Time: {currentExam.startTime} - {currentExam.endTime}
                </Typography>
                <Typography>Status: {currentExam.status}</Typography>
              </Box>
              <Button
                variant="outlined"
                color="error"
                onClick={handleDeleteExam}
                disabled={currentExam.status === "in-progress"}
              >
                Delete Exam
              </Button>
            </Box>
          </Paper>
        </Box>
      ) : null}

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <form onSubmit={handleScheduleExam}>
          <DialogTitle>Schedule New Exam</DialogTitle>
          <DialogContent>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
            >
              <TextField
                type="date"
                label="Exam Date"
                InputLabelProps={{ shrink: true }}
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
              <TextField
                type="time"
                label="Start Time"
                InputLabelProps={{ shrink: true }}
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
                required
              />
              <TextField
                type="time"
                label="End Time"
                InputLabelProps={{ shrink: true }}
                value={formData.endTime}
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
                required
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              Schedule Exam
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
