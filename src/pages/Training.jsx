import React,{useState, useEffect} from 'react'
import { NavBar } from '../components'
import {Box,Stack,CardActionArea,Typography} from '@mui/material'
import { getPlayers, updatePlayer } from '../Api'


const Training = () => {

 /* const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const playersData = await getPlayers();
        setPlayers(playersData);
       
      } catch (err) {
        setError('Failed to fetch players');
      }
    };

    fetchPlayers();
  }, []);


  const handleUpdate = async () => {
    try {
      await updatePlayer(editingId, { name: newName, position: newPosition, height: newHeight, weight: newWeight });
      setPlayers(players.map(player => 
        player._id === editingId ? { ...player, name: newName, position: newPosition, height: newHeight, weight: newWeight } : player
      ));
      setEditingId(null);
      setNewName('');
      setNewPosition('');
      setNewHeight('');
      setNewWeight('');
    } catch (err) {
      setError('Failed to update player');
    }
  };
*/

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

  
  
  

  const [selectedPlayer, setSelectedPlayer]= useState(null)
  const [abilityBreak, setAbilityBreak] = useState(null)
  const [message, setmessage] = useState('')


  function createIndx(player){
    let strIdx = []
    let powIdx = []
    let expIdx = []
    let spdIdx = []

    //strength
    strIdx.push(player.bench/player.weight) 
    strIdx.push((player.squat/player.weight + .25)/1.5)
    //power
    powIdx.push((player.clean/player.weight-.2)/.7)
    powIdx.push((player.jerk/player.weight-.75)/.5)
    //explosive
    expIdx.push((player.mball-10)/20)
    expIdx.push((player.vertical * Math.sqrt(player.weight))/330)
    expIdx.push((player.broad*12 * Math.sqrt(player.weight))/1000)
    //speed
    let mph = 20.45/player.tenFly
    if(player.weight <= 185){
      spdIdx.push((player.forty-5.1)/-.4)
      spdIdx.push((mph-16)/4)
      spdIdx.push((player.tenYard-1.8)/-.16)
    } else if(player.weight > 185 && player.weight <= 215){
      spdIdx.push((player.forty-5.5)/-.6)
      spdIdx.push((mph-15)/4)
      spdIdx.push((player.tenYard-1.85)/-.16)

   } else if(player.weight > 216 && player.weight <= 245){
     spdIdx.push((player.forty-5.9)/-.8)
    spdIdx.push((mph-14)/4)
     spdIdx.push((player.tenYard-1.9)/-.16)
       }else if(player.weight > 246 && player.weight <= 265){
       spdIdx.push((player.forty-6.3)/-1)
      spdIdx.push((mph-13)/4)
       spdIdx.push((player.tenYard-1.95)/-.16)
    } else if(player.weight > 265){
      spdIdx.push((player.forty-6.7)/-1.2)
      spdIdx.push((mph-12)/4)
      spdIdx.push((player.tenYard-2)/-.16)
    }
    let breakDown = {
      str:strIdx.reduce((sum,num)=>sum + num,0)/ strIdx.length < 0 ? 0 : strIdx.reduce((sum,num)=>sum + num,0)/ strIdx.length,
      pow:powIdx.reduce((sum,num)=>sum + num,0)/ powIdx.length< 0 ? 0 : powIdx.reduce((sum,num)=>sum + num,0)/ powIdx.length,
      exp:expIdx.reduce((sum,num)=>sum + num,0)/ expIdx.length< 0 ? 0 : expIdx.reduce((sum,num)=>sum + num,0)/ expIdx.length,
      spd:spdIdx.reduce((sum,num)=>sum + num,0)/ spdIdx.length < 0 ? 0 : spdIdx.reduce((sum,num)=>sum + num,0)/ spdIdx.length,
      total:
      (strIdx.reduce((sum,num)=>sum + num,0)/ strIdx.length < 0 ? 0 : strIdx.reduce((sum,num)=>sum + num,0)/ strIdx.length) + 
      (powIdx.reduce((sum,num)=>sum + num,0)/ powIdx.length< 0 ? 0 : powIdx.reduce((sum,num)=>sum + num,0)/ powIdx.length) + 
      (expIdx.reduce((sum,num)=>sum + num,0)/ expIdx.length< 0 ? 0 : expIdx.reduce((sum,num)=>sum + num,0)/ expIdx.length) + 
      (spdIdx.reduce((sum,num)=>sum + num,0)/ spdIdx.length < 0 ? 0 : spdIdx.reduce((sum,num)=>sum + num,0)/ spdIdx.length)
    }
    console.log(breakDown)
    setAbilityBreak(breakDown)

  }

  function createAnalysis(indexes,player){
    const sortedKeys = Object.keys(indexes).sort((key1, key2) => indexes[key1] - indexes[key2]);
    sortedKeys.pop()
    console.log(sortedKeys)

    let newMessage = ''

    if(sortedKeys[0] === 'str'){
      newMessage += 'This player is weak in comparison to all other traits, this is not inherently bad, however if his athletic numbers are still low, this means that he needs to improve his strength with a phase of hypertrophy/muscle building with sets of 5-8, following by a phase ramping above 85% of 1rm up to 95% for sets of 3-5. If his athletic numbers are extremely high, this is the outcome that is desired.'
    }else if(sortedKeys[0] === 'pow'){
      newMessage += 'This player cannot produce force against weight well. This can be fixed by leveraging his higher strength with french conrast training, pairing heavy compound movements with quick plyometrics. '

    }else if(sortedKeys[0] === 'exp'){
      newMessage += 'This player is not explosive in comparison to what his strength,power, and speed may suggest. Because his explosiveness is less than speed, the athlete may have good top end mechanics or running form, but acceleration is most likely slower than possible. Increased use of plyometrics and lighlty loaded plyometrics will increase this.'
    }else if(sortedKeys[0] === 'spd'){
      newMessage += 'This player is slow in comparison to what his strength,power, and explosiveness may suggest. increasing the reps in plyometrics to practice the repeating force of sprinting, as well as focusing on technique will increase the athletes speed.'
    }

    if(sortedKeys[1] === 'str'){
      newMessage += 'Next, the athletes strength is the second weakest. For field and power athletes, the goal is to always be more relatively powerful, explosive, and fast than simply brute strength. Whatever element is lacking needs to be brought up by maintaining strength while focusing on athletic performance, especially if the athletes numbers are average or above average. Otherwise, increasing strength may see a general increase in all abilities. '
    }else if(sortedKeys[1] === 'pow'){
      if(player.position in ['Offensive Lineman','Defensive Lineman']){
        newMessage += 'Next, Power usually comes second for all football players, but as lineman power is even more important as usually they have to shove heavy opponents within moments of the ball snapping. the use of olympic lifting variations such as the hang clean and clean pull will give the athlete the ability to produce great force against weight. '

      }else{
        newMessage += 'Next, Power usually comes second for all football athletes except for linemen. So long as the athletes actual numbers are not low, this is how it should be. If power is severely lacking however, the use of contrast training (pairing heavy weight with quick plyometrics) and generally moving heavy weight quickly such as olympic lifting variations  will greatly improve power. '

      }
    }else if(sortedKeys[1] === 'exp'){
      newMessage += 'Next, Explosiveness is always a vital key for athletes and should never be neglected. Light olympic lifts like snatch variations, lightly weighted plyometrics, and bodyweight plyometrics will increaese explosiveness. '

    }else if(sortedKeys[1] === 'spd'){
      newMessage += 'Next, Speed is the most important element athletes and should always take priority. Learning Form and sprinting maximul effort 2 times a week for 15-40yds will see gains in speed over time. '

    }

    if(sortedKeys[2] === 'str'){
      newMessage += 'If Strength is the second highest aspect, the player needs to focus almost entirely on bringing up the two lagging aspects, maintaining strength with low-medium volume around 75-85% 1rm while moving towards hyper-athletic style training, beginning with 1-2 olympic variations, following by a compound movement contrasted with a plyometric or a medball followed by one or two accessories + core. Do all of this with maximal intent for 2-4 reps. '
    }else if(sortedKeys[2] === 'pow'){
      newMessage += 'Depending on the athletes style of play, power being second highest could be good, especially for a football player who focuses on using brute force to beat the opponent. Explosiveness should never be too far behind this however, and for finess linemen, explosiveness should take slight precedent. Use Snatches and lighter weighted explosive movements, while still moving heavy weight fast as well, such as box squats, cleans, etc. 1-3 reps. '

      
      
    }else if(sortedKeys[2] === 'exp'){
      newMessage += 'in most cases, this is where explosivenss should be. Explosiveness aids in acceleration which can increase speed. So in order to increase both speed and explosiveness jump high and far with as much intent as possible. '

    }else if(sortedKeys[2] === 'spd'){
      newMessage += 'Speed is the key in football, if the athletes numbers are good, continue focusing on explosive training and technique, if his numbers arent good, he may just have good technique and needs to increase his explosivenss to aid acceleration.  '
    }

    if(sortedKeys[3] === 'str'){
      newMessage += 'If strength is the athletes best aspect then they may have a good foundation to build on, but this is not helpful for athletic development, Start with power training block by utilizing the contrast method, then lighten the load and increase the volume of plyometrics and jumps, all the while, do speed drills and sprint maximally 1-2 times a week for 15-40 yds. '
    }else if(sortedKeys[3] === 'pow'){
      newMessage += 'If Power is the athletes best aspect, then translating it to explosiveness and speed is the key to increased athletic performance with lighter olympic variations, and contrast training with a lightly loaded jump followed by an unloaded one.'
    }else if(sortedKeys[3] === 'exp'){
      newMessage += 'Explosiveness being the athletes best ascpect is a good thing as it can translate to greater speed, add more speed drills to the athletes routine and continue to do plyometrics and jumps. '
    }else if(sortedKeys[3] === 'spd'){
      newMessage += 'Speed being the best ascpect is generally the goal of athletic development. To continue, you must start from strength move along the strength-speed line with 1-2 4 week blocks of strength 1-2 block of power, a block of explosiveness training while continuing to push your speed as much as possible 1-2 times a week. '
    }

    setmessage(newMessage)

  } 
 

  useEffect(() => {
    if(selectedPlayer!==null && abilityBreak !== null){
      setmessage(createAnalysis(abilityBreak,selectedPlayer))
      console.log(createAnalysis(abilityBreak,selectedPlayer))
    }
  }, [abilityBreak])
  



  return (
    <Box sx={{ height: '100vh', bgcolor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <NavBar />
    <Stack sx={{ width: '90%', height: '100%', backgroundColor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
        <Stack direction={'row'} sx={{width:'100%', background:'white',overflowX:'scroll'}}>
          {
            players.length > 0 &&
            players.map((player)=>(
              <CardActionArea sx={{width:'200px',height:'100px'}} onClick={()=>{setSelectedPlayer(player,createIndx(player))}}>
                <Typography textAlign={'center'}>
                  {player.name}
                </Typography>
              </CardActionArea>

            ))
          }
        </Stack>
        <Box sx={{width:'100%',height:'80%',background:'white',mt:'20px'}}>
          <Box>
          <Stack direction={'row'} sx={{display:'flex',justifyContent:'space-around'}}>
            <Typography variant='h2'>{selectedPlayer && `${selectedPlayer.name}`}</Typography>
            <Typography variant='h2'>{selectedPlayer && `${selectedPlayer.position}`}</Typography>
          </Stack>
          <Box>    
          {

            abilityBreak &&
            <Stack direction={'row'} sx={{display:'flex', justifyContent:'space-around'}}>
              <Typography>Strength Heavy: {(abilityBreak.str/abilityBreak.total*100).toFixed(2)}%</Typography>
              <Typography>Power Heavy: {(abilityBreak.pow/abilityBreak.total*100).toFixed(2)}%</Typography>
              <Typography>Explosive Heavy: {(abilityBreak.exp/abilityBreak.total*100).toFixed(2)}%</Typography>
              <Typography>Speed Heavy: {(abilityBreak.spd/abilityBreak.total*100).toFixed(2)}%</Typography>
            
            </Stack>
          }
          </Box>
          <Box sx={{mt:'20px',mb:'20px'}}>
            <Typography textAlign={'center'}>{message}</Typography>
          </Box>
          { selectedPlayer !== null &&
      
          <Stack direction={'row'} sx={{display:'flex', justifyContent:'space-around',width:'100%'}}>
          <Stack><Typography><strong>Position:</strong></Typography> <Typography>{selectedPlayer.position}</Typography></Stack>
                
                <Stack><Typography><strong>Squat:</strong></Typography> <Typography >{selectedPlayer.squat} lbs</Typography> </Stack>
                <Stack><Typography><strong>Bench:</strong></Typography> <Typography>{selectedPlayer.bench} lbs</Typography></Stack>
                <Stack><Typography><strong>Clean:</strong></Typography> <Typography >{selectedPlayer.clean} lbs</Typography></Stack>
                <Stack><Typography><strong>Jerk:</strong></Typography> <Typography >{selectedPlayer.jerk} lbs</Typography></Stack>
                <Stack><Typography><strong>Vertical:</strong></Typography> <Typography>{selectedPlayer.vertical} inches</Typography></Stack>
                <Stack><Typography><strong>Broad Jump:</strong></Typography> <Typography>{selectedPlayer.broad} feet</Typography></Stack>
                <Stack><Typography><strong>10-yard Sprint:</strong></Typography> <Typography >{selectedPlayer.tenYard} seconds</Typography></Stack>
                <Stack><Typography><strong>40-yard Sprint:</strong></Typography> <Typography>{selectedPlayer.forty} seconds</Typography></Stack>
          </Stack>
          }
        </Box>
        </Box>
    </Stack>
  </Box>
  )
}

export default Training