import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const examService = {
  scheduleExam: async (examData) => {
    try {
      const response = await axios.post(`${API_URL}/exams/schedule`, examData, getAuthHeader());
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to schedule exam' };
    }
  },

  getCurrentExam: async () => {
    try {
      const response = await axios.get(`${API_URL}/exams/current`, getAuthHeader());
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch current exam' };
    }
  },

  deleteExam: async (examId) => {
    try {
      const response = await axios.delete(`${API_URL}/exams/${examId}`, getAuthHeader());
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete exam' };
    }
  }
}; 