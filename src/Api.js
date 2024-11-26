import axios from 'axios';
import {jwtDecode} from 'jwt-decode';


const API_URL = 'http://localhost:5000';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  export const getLoggedInUser = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found. User is not logged in.');
    }
    
    try {
      const decoded = jwtDecode(token);
      return decoded; // Contains user info (e.g., id, username, role)
    } catch (error) {
      console.error('Error decoding token:', error);
      throw error;
    }
  };
  

// Player Functions
export const getPlayers = async () => {
    const response = await axios.get(`${API_URL}/players`);
   
    return response.data;
    
  };
  
  export const createPlayer = async (player) => {
    const response = await axios.post(`${API_URL}/players`, player);
    return response.data;
  };
  
  export const updatePlayer = async (playerId, updatedPlayer) => {
    const response = await axios.patch(`${API_URL}/players/${playerId}`, updatedPlayer);
    return response.data;
  };
  
  export const deletePlayer = async (playerId) => {
    await axios.delete(`${API_URL}/players/${playerId}`);
  };

  //Assistant Coach CRUD

  export const getCoach = async () => {
    const response = await axios.get(`${API_URL}/acoaches`);
    return response.data;
  };
  
  export const updateCoach = async (coachId, updatedCoach) => {
    console.log(coachId)
    const response = await axios.patch(`${API_URL}/acoaches/${coachId}`, updatedCoach);
    return response.data;
  };

  //Schedule CRUD
  export const getSchedule = async () => {
    const response = await axios.get(`${API_URL}/schedule`);
    return response.data;
  };

  export const createSchedule = async (schedule) => {
    const response = await axios.post(`${API_URL}/schedule`, schedule);
    return response.data;
  };

  export const updateSchedule = async (scheduleId, updatedSchedule) => {
    const response = await axios.patch(`${API_URL}/schedule/${scheduleId}`, updatedSchedule);
    return response.data;
  };

  export const deleteSchedule = async (scheduleId) => {
    await axios.delete(`${API_URL}/schedule/${scheduleId}`);
  };


// Equipment Functions

export const getEquipment = async () => {
  try {
    const response = await fetch(`${API_URL}/equipment`); // Replace with the actual API URL
    console.log('Raw response:', response); // Check the raw response
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json(); // Parse JSON response
    console.log('Parsed data:', data); // Check the parsed data
    return data; // Ensure data is returned
  } catch (error) {
    console.error('Error in getEquipment:', error);
    throw error; // Rethrow the error if needed
  }
};


export const createEquipment = async (equipment) => {
  const response = await axios.post(`${API_URL}/equipment`, equipment);
  return response.data;
};

export const deleteEquipment = async (equipmentId) => {
  await axios.delete(`${API_URL}/equipment/${equipmentId}`);
};

export const updateEquipment = async (equipmentId, updatedEquipment) => {
  const response = await axios.patch(`${API_URL}/equipment/${equipmentId}`, updatedEquipment);
  return response.data;
};

  // Login user
export const loginUser = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

// User Functions
export const getUser = async () => {
  const response = await axios.get(`${API_URL}/login`);
  return response.data;
};

export const createUser = async (user) => {
  const response = await axios.post(`${API_URL}/setup`, user);
  return response.data;
};

export const deleteUser = async (userId) => {
  await axios.delete(`${API_URL}/login/${userId}`);
};

// Messaging Functions
export const getMessages = async () => {
    try {
      const response = await axios.get(`${API_URL}/message`, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error.response ? error.response.data : error.message);
      throw error;
    }
  };
  

  export const sendMessage = async (message) => {
    try {
      const response = await axios.post(`${API_URL}/message`, message, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error.response ? error.response.data : error.message);
      throw error;
    }
  };
  
  export const deleteMessage = async (messageId) => {
    try {
      await axios.delete(`${API_URL}/message`, {
        params: { id: messageId },
        headers: getAuthHeaders(),
      });  
    } catch (error) {
      console.error('Error deleting message:', error.response ? error.response.data : error.message);
      throw error;
    }
  };