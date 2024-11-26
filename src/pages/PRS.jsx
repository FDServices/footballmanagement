import React, {useState, useEffect} from 'react';
import { NavBar } from '../components';
import { Box, Typography, Stack, Select, MenuItem, CardActionArea, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';


const PRS = () => {
  const players = [
    {
      name: "John Doe",
      position: "Quarterback",
      weight: 225, // Weight in pounds
      squat: 405,
      bench: 275,
      clean: 225,
      jerk: 275,
      vertical: 34,  // Vertical jump in inches
      broad: 10.5,   // Broad jump in feet
      mball: 30,     // Medicine ball throw distance in feet
      tenYard: 1.6,  // 10-yard sprint time in seconds
      tenFly: 1.5,   // 10-yard fly time in seconds
      forty: 4.6     // 40-yard sprint time in seconds
    },
    {
      name: "Michael Johnson",
      position: "Wide Receiver",
      weight: 210,
      squat: 295,
      bench: 215,
      clean: 235,
      jerk: 245,
      vertical: 36,
      broad: 11.0,
      mball: 35,
      tenYard: 1.45,
      tenFly: 1.23,
      forty: 4.4
    },
    {
      name: "Chris Lee",
      position: "Running Back",
      weight: 220,
      squat: 460,
      bench: 295,
      clean: 325,
      jerk: 285,
      vertical: 32,
      broad: 9.8,
      mball: 28,
      tenYard: 1.7,
      tenFly: 1.6,
      forty: 4.5
    },
    {
      name: "David Turner",
      position: "Offensive Lineman",
      weight: 330,
      squat: 550,
      bench: 375,
      clean: 315,
      jerk: 355,
      vertical: 24,
      broad: 8.5,
      mball: 40,
      tenYard: 1.9,
      tenFly: 1.8,
      forty: 5.1
    },
    {
      name: "James Wilson",
      position: "Defensive Lineman",
      weight: 290,
      squat: 500,
      bench: 330,
      clean: 280,
      jerk: 320,
      vertical: 28,
      broad: 9.2,
      mball: 33,
      tenYard: 1.5,
      tenFly: 1.1,
      forty: 4.6
    },
    {
      name: "Tom Harris",
      position: "Linebacker",
      weight: 240,
      squat: 695,
      bench: 515,
      clean: 265,
      jerk: 295,
      vertical: 30,
      broad: 9.5,
      mball: 32,
      tenYard: 1.6,
      tenFly: 1.5,
      forty: 4.7
    },
    {
      name: "Mark Edwards",
      position: "Tight End",
      weight: 260,
      squat: 425,
      bench: 260,
      clean: 225,
      jerk: 250,
      vertical: 30,
      broad: 9.0,
      mball: 28,
      tenYard: 1.8,
      tenFly: 1.7,
      forty: 4.6
    },
    {
      name: "Jake Thompson",
      position: "Cornerback",
      weight: 190,
      squat: 350,
      bench: 215,
      clean: 185,
      jerk: 215,
      vertical: 38,
      broad: 10.2,
      mball: 25,
      tenYard: 1.5,
      tenFly: 1.4,
      forty: 4.4
    },
    {
      name: "Ryan Carter",
      position: "Safety",
      weight: 215,
      squat: 375,
      bench: 240,
      clean: 215,
      jerk: 245,
      vertical: 35,
      broad: 10.0,
      mball: 30,
      tenYard: 1.6,
      tenFly: 1.5,
      forty: 4.5
    },
    {
      name: "Ethan Davis",
      position: "Kicker",
      weight: 185,
      squat: 275,
      bench: 185,
      clean: 135,
      jerk: 155,
      vertical: 22,
      broad: 7.5,
      mball: 15,
      tenYard: 2.0,
      tenFly: 2.0,
      forty: 5.0
    }
  ]; 
  
  
  const playerStatsWithSnaps = [
    {
      name: "John Doe",
      position: "Quarterback",
      snapsPlayed: 650,
      passingYards: 3200,
      passingTouchdowns: 28,
      interceptions: 6,
      rushingYards: 250,
      rushingTouchdowns: 3,
      completions: 240,
      attempts: 350,
      passerRating: 105.2
    },
    {
      name: "Michael Johnson",
      position: "Wide Receiver",
      snapsPlayed: 1200,
      receptions: 80,
      receivingYards: 1200,
      receivingTouchdowns: 9,
      averageYardsPerCatch: 15.0,
      longestReception: 75,
      yardsAfterCatch: 400
    },
    {
      name: "Chris Lee",
      position: "Running Back",
      snapsPlayed: 300,
      rushingYards: 1200,
      rushingTouchdowns: 10,
      receptions: 30,
      receivingYards: 300,
      fumbles: 0,
      carries: 250,
      yardsPerCarry: 4.8
    },
    {
      name: "David Turner",
      position: "Offensive Lineman",
      snapsPlayed: 1100,
      sacksAllowed: 3,
      tackles: 25,
      quarterbackHits: 10,
      pressures: 18,
      pancakes: 12
    },
    {
      name: "James Wilson",
      position: "Defensive Lineman",
      snapsPlayed: 30,
      tackles: 50,
      sacks: 8,
      quarterbackHits: 15,
      tacklesForLoss: 12,
      forcedFumbles: 3,
      fumbleRecoveries: 1
    },
    {
      name: "Tom Harris",
      position: "Linebacker",
      snapsPlayed: 1050,
      tackles: 85,
      sacks: 4,
      interceptions: 2,
      forcedFumbles: 3,
      fumbleRecoveries: 1,
      passDeflections: 7,
      tacklesForLoss: 9
    },
    {
      name: "Mark Edwards",
      position: "Tight End",
      snapsPlayed: 850,
      receptions: 50,
      receivingYards: 700,
      receivingTouchdowns: 5,
      rushingYards: 100,
      rushingTouchdowns: 2,
      averageYardsPerCatch: 14.0
    },
    {
      name: "Jake Thompson",
      position: "Cornerback",
      snapsPlayed: 900,
      tackles: 60,
      interceptions: 5,
      passDeflections: 18,
      forcedFumbles: 1,
      fumbleRecoveries: 1,
      defensiveTouchdowns: 1
    },
    {
      name: "Ryan Carter",
      position: "Safety",
      snapsPlayed: 950,
      tackles: 75,
      interceptions: 3,
      passDeflections: 10,
      forcedFumbles: 2,
      fumbleRecoveries: 2,
      defensiveTouchdowns: 1
    },
    {
      name: "Ethan Davis",
      position: "Kicker",
      snapsPlayed: 130,
      fieldGoalsMade: 22,
      fieldGoalsAttempted: 28,
      fieldGoalPercentage: 78.5,
      longestFieldGoal: 52,
      extraPointsMade: 45,
      extraPointsAttempted: 47
    }
  ];

  const positions = [
    "Quarterback",
    "Wide Receiver",
    "Running Back",
    "Offensive Lineman",
    "Defensive Lineman",
    "Linebacker",
    "Tight End",
    "Cornerback",
    "Safety",
    "Kicker"
  ];

  const [selectedPlayerStats, setSelectedPlayerStats] = useState(null)
  
  const [selectedPosition, setSelectedPosition] = useState('')
  const [filterType, setFilterType] = useState('filtery by');
  const [filteredPlayers, setfilteredPlayers] = useState([]);
  const [openModal, setOpenModal] = useState(false);  // Modal state
  const [selectedPlayer, setSelectedPlayer] = useState(null);  

  useEffect(() => {
    setfilteredPlayers(players);
  }, []);

  useEffect(() => {
    const stats = playerStatsWithSnaps.find(player => player.name === selectedPlayer?.name);

    setSelectedPlayerStats(stats)


  }, [selectedPlayer])
  

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPlayer(null);
  };

  // Modal open handler (set the selected player)
  const handlePlayerClick = (player) => {
    console.log(player)
    setSelectedPlayer(player);
    setOpenModal(true);
  };


  function handleChange(value){
    setSelectedPosition(value)
  }

  function filterByType(value) {
    setFilterType(value);
    console.log(value === 'Explosive Bodyweight'); // Debugging log
  
    if (value === 'Strength Overall') {
      setfilteredPlayers(sortByStrength(players));
    } else if (value === 'Power Overall') {
      setfilteredPlayers(sortByPower(players));
    } else if (value === 'Explosive Overall') {
      setfilteredPlayers(sortByExplosive(players));
    } else if (value === 'Speed Overall') {
      setfilteredPlayers(sortBySpeed(players));
    } else if (value === 'Strength Bodyweight') {
      setfilteredPlayers(sortByStrength(players, true));
    } else if (value === 'Power Bodyweight') {     
      setfilteredPlayers(sortByPower(players, true));
    } else if (value === 'Explosive Bodyweight') {
      console.log(value); // This will now work if the condition is true
      setfilteredPlayers(sortByExplosive(players, true));
    } else if (value === 'Speed Force Score') {
      setfilteredPlayers(sortBySpeed(players, true));
    } else if (value === 'Total Game Production') {
      setfilteredPlayers(calculateTotalScore(playerStatsWithSnaps));
    } else if (value === 'Production Per Snap') {
      setfilteredPlayers(calculateTotalScore(playerStatsWithSnaps, true));
    } else if (value === 'Overall') {
      setfilteredPlayers(calculateOverallBest(players));
    }
  }
  

// Strength Overall: squat + bench
  const sortByStrength = (players, bodyweight = false) => {
      function compare(player) {
        let comparison = player.squat + player.bench;
        if (bodyweight) {
          comparison = player.squat / player.weight + player.bench / player.weight;
        }
        return comparison;
      }

      return players.map(player => ({
        ...player,
        strengthScore: compare(player),
      })).sort((a, b) => b.strengthScore - a.strengthScore);
    };

    // Power Overall: clean + jerk
    const sortByPower = (players, bodyweight = false) => {
      function compare(player) {
        let comparison = player.clean + player.jerk;
        if (bodyweight) {
          comparison = player.clean / player.weight + player.jerk / player.weight;
        }
        return comparison;
      }

      return players.map(player => ({
        ...player,
        powerScore: compare(player),
      })).sort((a, b) => b.powerScore - a.powerScore);
    };

    // Explosive Overall: vertical + (broad * 12) + mball
    const sortByExplosive = (players, bodyweight = false) => {
      function compare(player) {
        let comparison = player.vertical + (player.broad * 12) + player.mball;
        if (bodyweight) {
          comparison = (player.vertical + (player.broad * 12) + player.mball) / player.weight;
        }
        return comparison;
      }

      return players.map(player => ({
        ...player,
        explosiveScore: compare(player),
      })).sort((a, b) => b.explosiveScore - a.explosiveScore);
    };

  // Speed Overall: tenYard + tenFly + forty
  const sortBySpeed = (players,bodyweight=false) => {
    function compare(player) {
      let comparison = player.tenYard + player.tenFly + player.forty
      if (bodyweight) {
        comparison = (player.tenYard + player.tenFly + player.forty) / player.weight;
      }
      return comparison;
    }

    return players.map(player => ({
      ...player,
      speedScore: compare(player)
    })).sort((a, b) => a.speedScore - b.speedScore);
  };
  const calculateGameScore = (player) => {
    let score = 0;
  
    // Offensive Players (Quarterback, Running Back, Wide Receiver)
    if (player.position === "Quarterback") {
      score += player.passingYards * 0.1;  // Passing yards
      score += player.passingTouchdowns * 6;  // Passing touchdowns
      score += player.completions * 0.5;  // Completions
      score -= player.interceptions * 2;  // Interceptions
      score += player.rushingYards * 0.1;  // Rushing yards
      score += player.rushingTouchdowns * 6;  // Rushing touchdowns
    } else if (player.position === "Wide Receiver") {
      score += player.receptions * 1;  // Receptions
      score += player.receivingYards * 0.05;  // Receiving yards
      score += player.receivingTouchdowns * 6;  // Receiving touchdowns
      score += player.yardsAfterCatch * 0.05;  // Yards after catch
      score += Math.floor(player.longestReception / 10);  // Longest reception
    } else if (player.position === "Running Back") {
      score += player.rushingYards * 0.1;  // Rushing yards
      score += player.rushingTouchdowns * 6;  // Rushing touchdowns
      score += player.receptions * 1;  // Receptions
      score += player.receivingYards * 0.1;  // Receiving yards
      score -= player.fumbles * 2;  // Fumbles
      score += player.carries * 0.2;  // Carries
    }
  
    // Defensive Players (Defensive Linemen, Linebackers, Defensive Backs)
    if (player.position === "Defensive Lineman") {
      score += player.tackles * 2;  // Tackles
      score += player.sacks * 4;  // Sacks
      score += player.quarterbackHits * 2;  // Quarterback hits
      score += player.tacklesForLoss * 3;  // Tackles for loss
      score += player.forcedFumbles * 4;  // Forced fumbles
      score += player.fumbleRecoveries * 3;  // Fumble recoveries
    } else if (player.position === "Linebacker") {
      score += player.tackles * 2;  // Tackles
      score += player.sacks * 3;  // Sacks
      score += player.interceptions * 5;  // Interceptions
      score += player.forcedFumbles * 4;  // Forced fumbles
      score += player.fumbleRecoveries * 3;  // Fumble recoveries
      score += player.passDeflections * 1;  // Pass deflections
    } else if (player.position === "Defensive Back") {
      score += player.tackles * 2;  // Tackles
      score += player.interceptions * 5;  // Interceptions
      score += player.passDeflections * 1;  // Pass deflections
      score += player.forcedFumbles * 4;  // Forced fumbles
      score += player.fumbleRecoveries * 3;  // Fumble recoveries
      score += player.defensiveTouchdowns * 6;  // Defensive touchdowns
    }
  
    // Special Teams (Kickers)
    if (player.position === "Kicker") {
      score += player.fieldGoalsMade * 3;  // Field goals made
      score -= player.fieldGoalsAttempted * 0.5;  // Field goals attempted
      score += player.extraPointsMade * 1;  // Extra points made
      score += Math.floor(player.longestFieldGoal / 10) * 2;  // Longest field goal
    }
    console.log(score)
    return score;
  };
  
  const calculateTotalScore = (players,snap=false) => {
    function compare(player,snap){
      let comparison = calculateGameScore(player)
      if(snap){
        comparison = calculateGameScore(player)/player.snaps
      }
      console.log(`${player.name} + ${comparison}`)
      return comparison
    }
    return players.map(player => ({
      ...player,
      gameScore: compare(player,snap),
    })).sort((a, b) => b.gameScore - a.gameScore);  
  };

  const calculateOverallBest = (players) => {
    // Calculate scores for each filter (including bodyweight and per-snap versions)
    const strengthOverallScores = sortByStrength(players).map((p) => p.strengthScore);
    const strengthBodyweightScores = sortByStrength(players, true).map((p) => p.strengthScore);
  
    const powerOverallScores = sortByPower(players).map((p) => p.powerScore);
    const powerBodyweightScores = sortByPower(players, true).map((p) => p.powerScore);
  
    const explosiveOverallScores = sortByExplosive(players).map((p) => p.explosiveScore);
    const explosiveBodyweightScores = sortByExplosive(players, true).map((p) => p.explosiveScore);
  
    const speedOverallScores = sortBySpeed(players).map((p) => p.speedScore);
    const speedBodyweightScores = sortBySpeed(players, true).map((p) => p.speedScore);
  
    const gameScores = calculateTotalScore(players).map((p) => p.gameScore);
    const gamePerSnapScores = calculateTotalScore(players, true).map((p) => p.gameScore);
  
    // Normalize scores (0 to 1) for each metric
    const normalize = (scores) => {
      const min = Math.min(...scores);
      const max = Math.max(...scores);
      return scores.map((score) => (max - min === 0 ? 1 : (score - min) / (max - min)));
    };
  
    // Normalize each set of scores
    const normalizedStrengthOverall = normalize(strengthOverallScores);
    const normalizedStrengthBodyweight = normalize(strengthBodyweightScores);
    const normalizedPowerOverall = normalize(powerOverallScores);
    const normalizedPowerBodyweight = normalize(powerBodyweightScores);
    const normalizedExplosiveOverall = normalize(explosiveOverallScores);
    const normalizedExplosiveBodyweight = normalize(explosiveBodyweightScores);
    const normalizedSpeedOverall = normalize(speedOverallScores);
    const normalizedSpeedBodyweight = normalize(speedBodyweightScores);
    const normalizedGame = normalize(gameScores);
    const normalizedGamePerSnap = normalize(gamePerSnapScores);
  
    // Combine all normalized scores
    return players.map((player, index) => {
      const averageScore =
        (normalizedStrengthOverall[index] +
          normalizedStrengthBodyweight[index] +
          normalizedPowerOverall[index] +
          normalizedPowerBodyweight[index] +
          normalizedExplosiveOverall[index] +
          normalizedExplosiveBodyweight[index] +
          normalizedSpeedOverall[index] +
          normalizedSpeedBodyweight[index] +
          normalizedGame[index] +
          normalizedGamePerSnap[index]) /
        10;
  
      return {
        ...player,
        averageScore,
      };
    }).sort((a, b) => b.averageScore - a.averageScore); // Sort by average score
  };
  
  

  return (
    <Box sx={{ height: '100vh', bgcolor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
      <NavBar />
      <Stack direction="row" sx={{ width: '90%', height: '100%', backgroundColor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Stack sx={{ background: 'white', width: '80%' }}>
          <Typography variant='h2' textAlign={'center'}>Performance Ranking</Typography>
          <Stack>
            <Stack>
            <Select value={filterType} onChange={(e) => { filterByType(e.target.value) }}>
              <MenuItem value='filtery by' disabled>Filter By</MenuItem>
              <MenuItem value='Overall'>Overall</MenuItem>
              <MenuItem value='Strength Overall'>Strength Overall</MenuItem>
              <MenuItem value='Power Overall'>Power Overall</MenuItem>
              <MenuItem value='Explosive Overall'>Explosive Overall</MenuItem>
              <MenuItem value='Speed Overall'>Speed Overall</MenuItem>
              <MenuItem value='Strength Bodyweight'> Strength Bodyweight</MenuItem>
              <MenuItem value='Speed Force Score'> Fastest Bodyweight (force Score)</MenuItem>
              <MenuItem value='Explosive Bodyweight'> Most Explosive Bodyweight</MenuItem>
              <MenuItem value='Powerful Bodyweight'> Most Powerful Bodyweight</MenuItem>
              <MenuItem value='Total Game Production'> Total Game Production</MenuItem>
              <MenuItem value='Production Per Snap'>Production Per Snap</MenuItem>
              
            </Select>
            <Select
              value={selectedPosition}
              onChange={(e)=>{handleChange(e.target.value)}}
              displayEmpty
              style={{ minWidth: 200 }}
            >
              <MenuItem value="">
                <em>Select Position</em>
              </MenuItem>
              {positions.map((position) => (
                <MenuItem key={position} value={position}>
                  {position}
                </MenuItem>
              ))}
            </Select>
            </Stack>
            <Box sx={{ background: 'white' , overflowY:'scroll', maxHeight:'400px'}}>
              {filteredPlayers.length > 0 &&
                filteredPlayers.map((player) => (
                  <>
                    {
                      player.position === selectedPosition || selectedPosition === '' ?
                      <CardActionArea key={player.name} onClick={() => handlePlayerClick(player)}>
                      <Box sx={{ padding: 2, margin: 1, border: '1px solid #ccc', borderRadius: 2 }}>
                        <Typography variant="h6">{player.name}</Typography>
                        <Typography>{player.position}</Typography>
                      </Box>
                    </CardActionArea>
      
                      :
                      <></>
                    }
                  </>
                  
                ))}
            </Box>
          </Stack>
        </Stack>
      </Stack>
      {/* Modal to show player details */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{selectedPlayer?.name}</DialogTitle>
        <DialogContent>
          {selectedPlayer && (
            <Box>
              <Stack direction={'row'}>
                <Stack >
                <Typography><strong>Position:</strong> {selectedPlayer.position}</Typography>
                <Typography><strong>Weight:</strong> {selectedPlayer.weight} lbs</Typography>
                <Typography><strong>Squat:</strong> {selectedPlayer.squat} lbs</Typography>
                <Typography><strong>Bench:</strong> {selectedPlayer.bench} lbs</Typography>
                <Typography><strong>Clean:</strong> {selectedPlayer.clean} lbs</Typography>
                <Typography><strong>Jerk:</strong> {selectedPlayer.jerk} lbs</Typography>
                <Typography><strong>Vertical:</strong> {selectedPlayer.vertical} inches</Typography>
                <Typography><strong>Broad Jump:</strong> {selectedPlayer.broad} feet</Typography>
                <Typography><strong>10-yard Sprint:</strong> {selectedPlayer.tenYard} seconds</Typography>
                <Typography><strong>40-yard Sprint:</strong> {selectedPlayer.forty} seconds</Typography>
                </Stack>
                <Stack >
                  {
                    selectedPlayerStats &&
                    Object.keys(selectedPlayerStats).map((key)=>{
                      if (key === "name" || key === "position") return null;

                      return (
                        <Typography key={key}>
                          <strong>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> {selectedPlayerStats[key]}
                        </Typography>
                      )
      
                    })
                  }
                </Stack>
              
              </Stack>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PRS;
