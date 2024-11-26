import React, { useState, useEffect } from "react";
import { Typography, IconButton, Box, Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PNavBar from "../PNavBar";
import { getPlayers, getLoggedInUser,updatePlayer } from "../../Api";

const PersonalStats = ({ setLoggedInID, loggedInID }) => {
  const [error, setError] = useState(null);
  const [players, setPlayers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const user = await getLoggedInUser(); // Ensure this returns a Promise
        setLoggedInID(user);
  
        const playersData = await getPlayers();
        setPlayers(playersData);
        console.log(playersData)
        console.log(playersData.userid)
        const player = playersData.find((p) => p.userid === loggedInID.userid);
        setCurrentUser(player || null);
      } catch (err) {
        console.error("Error fetching data:", err.message);
        setError("Failed to fetch data");
      }
    };
  
    fetchInitialData();
  }, [setLoggedInID]);
  

  const handleEditClick = async (stat) => {
    if (!currentUser) return;
  
    const value = prompt(`Enter new value for ${stat}:`, currentUser[stat]);
  
    if (value !== null) {
      try {
        // Update the player locally
        const updatedUser = { ...currentUser, [stat]: value };
        setCurrentUser(updatedUser); // Update current user state for immediate UI update
  
        // Update the players list locally
        setPlayers((prevPlayers) =>
          prevPlayers.map((player) =>
            player.userid === currentUser.userid ? updatedUser : player
          )
        );
  
        // Sync the backend
        await updatePlayer(currentUser._id, updatedUser);
      } catch (error) {
        setError(`Failed to update ${stat}: ${error.message}`);
      }
    }
  };
  
  
  const handleUpdate = async (player, newNote) => {
    try {
      await updatePlayer(player._id, {
        ...player,
        notes: [...player.notes, newNote],
      });
  
      const updatedPlayers = await getPlayers();
      setPlayers(updatedPlayers);
    
    } catch (err) {
      setError(`Failed to update player: ${err.message}`);
    }
  };
  

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "black",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ height: "90%" }}>
        <Typography
          variant="h4"
          sx={{ color: "white", textAlign: "center", margin: "10px" }}
        >
          Personal Stats
        </Typography>
        <Box
          sx={{
            padding: "10px",
            margin: "10px",
            backgroundColor: "#333",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
            {currentUser
              ? `${currentUser.name} - ${currentUser.position}`
              : "Loading..."}
          </Typography>
          <Grid container spacing={2}>
            {["weight", "squat", "bench", "clean", "jerk"].map((stat) => (
              <Grid item xs={6} key={stat}>
                <Box
                  sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
                >
                  <Typography sx={{ color: "white", flexGrow: 1 }}>
                    {`${stat.charAt(0).toUpperCase() + stat.slice(1)}: ${
                      currentUser ? currentUser[stat] : "N/A"
                    }`}
                  </Typography>
                  <IconButton
                    onClick={() => handleEditClick(stat)}
                    sx={{ color: "white" }}
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Box sx={{ height: "10%" }}>
        <PNavBar />
      </Box>
    </Box>
  );
};

export default PersonalStats;
