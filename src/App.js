import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { CssBaseline } from '@mui/material';

import Messaging from './components/coachmessaging'
import PMessaging from './components/playermessaging'
import {SignIn, HCoachDash, PlayerDash, EquipmentManager, Training} from './pages'
import Setup from './pages/setup'
import {Roster, Scheduling, PRS, } from './pages'
import {NavBar} from './components'

import {Notes,PersonalRecords,PersonalStats,Sprint_Jump} from './components/Athletes'

import { getEquipment } from './Api'; // Import the functions from api.js


const App = () => {
  const userRole = localStorage.getItem('role')
  const isAuthenticated = !!localStorage.getItem('token'); // Check if user is authenticated

  const [equipmentList, setEquipmentList] = useState([]);

  const [loggedInID, setLoggedInID] = useState('')


  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const data = await getEquipment(); // Fetch equipment data
        console.log('Fetched equipment:', data);
        setEquipmentList(data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching equipment:', error);
      }
    };
      fetchEquipment(); // Fetch equipment when authenticated
  }, []);


  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<SignIn loggedInID={loggedInID} setLoggedInID={setLoggedInID} />} />
        <Route path="/hCoachDash" element={isAuthenticated && userRole === 'Coach' ? <HCoachDash /> : <Navigate to ="/" /> } />
        <Route path="/PlayerDash" element={<PlayerDash /> } />
        <Route path="/setup" element={<Setup />} />
        <Route path="/navbar" element={<NavBar />} />
        <Route path="/training" element={<Training />} />
        
        <Route path="/pmessaging" element={isAuthenticated && userRole === 'Player' ? <PMessaging /> : <Navigate to ="/" /> } /> 
        <Route path="/cmessaging" element={isAuthenticated && userRole === 'Coach' ? <Messaging /> : <Navigate to ="/" />} />
=       <Route path="/Scheduling" element={isAuthenticated && userRole === 'Coach' ? <Scheduling /> : <Navigate to ="/" />} />
        <Route path="/PRS" element={isAuthenticated && userRole === 'Coach' ? <PRS /> : <Navigate to ="/" />} />
        <Route path="/Roster" element={isAuthenticated && userRole === 'Coach' ? <Roster /> : <Navigate to ="/" />} />

        {/* Athlete Links */}
        <Route path="/Notes" element={<Notes setLoggedInID={setLoggedInID} loggedInID={loggedInID}/> } />
        <Route path="/PersonalRecords" element={<PersonalRecords setLoggedInID={setLoggedInID} loggedInID={loggedInID} />} />
        <Route path="/PersonalStats" element={<PersonalStats setLoggedInID={setLoggedInID} loggedInID={loggedInID}/>}  />
        <Route path="/Sprint_Jump" element={<Sprint_Jump setLoggedInID={setLoggedInID} loggedInID={loggedInID}/>}  />

        {/* Organizational  */}
        <Route path="/EquipmentManager" element={

    <EquipmentManager equipment={equipmentList} />

} />
      </Routes>
    </Router>
  );
}

export default App;
