import { Box, Button, CardActionArea, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Away from './away.png'
import Pads from './pads.png'
import Helmet from './helmet.png'
import Home from './home.png'



const EquipmentCard = ({equipment,name,setUnassigned, unassigned, assigned, setAssigned,setAssignedFiltered, players,setUnassignedFilter}) => {

  const [open, setOpen] = useState(false)
  const [dropDown, setDropDown] = useState(false)
  const [player, setPlayer] = useState('')

  
  function unassign() {
    if (name !== undefined) {
        for (let i = 0; i < assigned.length; i++) {
            if (assigned[i].player === name) {
                console.log('found');
                
                
                let newEquipment = assigned[i].equipment.filter((item) => item.name !== equipment.name);

                if (newEquipment.length === 0) {
                    let tempAssigned = assigned.filter((player) => player.player !== name);
                    setAssigned([...tempAssigned]);
                    setAssignedFiltered([...tempAssigned])
                } else {
                    let tempAssigned = [...assigned]; 
                    tempAssigned[i].equipment = newEquipment;
                    setAssigned([...tempAssigned]);
                    setAssignedFiltered([...tempAssigned])
                }

               
                let tempUnassigned = [...unassigned];
                let tempEquip =  {
                  equipment: equipment.name,
                  size: equipment.size,
                  player: name,
                }
                if ("type" in equipment) {
                  tempEquip['type'] = equipment.type;
                }
                if ("number" in equipment) {
                  tempEquip['number'] = equipment.number;
                } 
                tempUnassigned.push(tempEquip);
                setUnassigned([...tempUnassigned]);
                setUnassignedFilter([...tempUnassigned])

                break; 
            }
        }
    }
    setOpen(false);
}


  

function assign() {
  let found = false;
 
  for (let i = 0; i < players.length; i++) {
    console.log(players[i].name)
    console.log(player)
    console.log(players[i].name === player)
      if (players[i].name === player) {
          found = true;
          let tempUnassigned = unassigned
          
          const index = tempUnassigned.findIndex(item =>
              item.equipment === equipment.name && item.size === equipment.size && equipment?.type === item?.type && equipment?.number === item?.number
          );

          
          if (index !== -1) {
            tempUnassigned.splice(index, 1); 
          }
          setUnassigned([...tempUnassigned])

          if(assigned.some((item)=>(item.player === player))){

            //the player already has some equipment
            for(let j = 0;j<assigned.length;j++){
              if(assigned[j].player === player){
                console.log("triggered yes have ")
                let temp = assigned
                let tempEquip = {name:equipment.name,size:equipment.size}
                if ("type" in equipment) {
                  tempEquip['type'] = equipment.type;
                }
                if ("number" in equipment) {
                  tempEquip['number'] = equipment.number;
                }
                temp[j].equipment.push(tempEquip)
                
                console.log(temp)
                setAssigned([...temp])
                setAssignedFiltered([...temp])
                

              }
            }
            }else{
              //the player doesn't have equipment
              console.log('triggered no have equipment ')
              let temp = assigned
              let tempEquip = {name:equipment.name,size:equipment.size}
              if ("type" in equipment) {
                tempEquip['type'] = equipment.type;
              }
              if ("number" in equipment) {
                tempEquip['number'] = equipment.number;
              }
              
              temp.push({player:player,equipment:[tempEquip]})
              console.log([...temp])
              setAssigned([...temp])
              setAssignedFiltered([...temp])
    
            }


        }
        setOpen(false)
    }
  }


  


  return (
    <Box>
    <CardActionArea onClick={()=>{setOpen(true)}} sx={{width:'200px'}}>
      {
        equipment.name === 'Home Jersey' &&
        <Stack>
          <img src={Home} alt='home jersey' height={'100px'} width={'100px'}/>
          <Typography textAlign={'center'}>{equipment.size} - {equipment.number}</Typography>
        </Stack>
      }
      {
        equipment.name === 'Away Jersey' &&
        <Stack>
          <img src={Away} alt='Away jersey' height={'100px'} width={'100px'}/>
          <Typography textAlign={'center'}>{equipment.size} - {equipment.number}</Typography>
        </Stack>
      }
      {
        equipment.name === 'Helmet' &&
        <Stack>
          <img src={Helmet} alt='helmet' height={'100px'} width={'100px'}/>
          <Typography textAlign={'center'}>{equipment.size} - {equipment.type}</Typography>
        </Stack>

      }
      {
        equipment.name === 'Pads' &&
        <Stack>
          <img src={Pads} alt='football pads' height={'100px'} width={'100px'}/>
          <Typography textAlign={'center'}>{equipment.size}</Typography>
        </Stack>

      }
    </CardActionArea>
      {
        open && name !== undefined &&
        <Box sx={{zIndex: 10, position:'absolute', right:'30%',left:'30%', top:'50%', backgroundColor:'white', borderRadius:'20px',p:'20px', border:'4px solid black', width:'auto'}}>
          
          <Typography textAlign={'center'}>Check In Equipment?</Typography>
          <Stack direction={'row'} sx={{display:'flex', justifyContent:'space-around'}}> 
            <Button onClick={()=>{unassign()}}>Yes</Button>
            <Button onClick={()=>{setOpen(false)}}>No</Button>
          </Stack>
        </Box>
      }
            {
        open && name === undefined &&
        <Box sx={{zIndex: 10, position:'absolute', right:'30%',left:'30%', top:'50%', backgroundColor:'white', borderRadius:'20px',p:'20px', border:'4px solid black', width:'auto'}}>
          
          <Typography textAlign={'center'}>Assign Equipment To?</Typography>
          <Stack>
          <TextField value={player} onChange={(e)=>{setPlayer(e.target.value, setDropDown(true))}}/>
          <Box sx={{
            position: 'absolute', 
            top:"100px", borderRadius:'10px',backgroundColor: 'white', width: '80%',zIndex: 1,}}>
              {
                player.length >0 && dropDown &&
                players.filter((item)=>item.name.toUpperCase().startsWith(player.toUpperCase()))
                .map((item,idx)=>(
                  <Typography
                    key={idx}
                    sx={{color: 'black', padding: '4px', cursor: 'pointer', borderRadius:'10px', '&:hover': {
                    backgroundColor: 'lightgrey', transform: 'scale(1.05)',  cursor: 'pointer',
                },transition: 'all 0.3s ease'}}
                  onClick={()=>{setPlayer(item.name,setDropDown(false))}}
                >
                  {item.name}
              </Typography>
                ))
              }
          </Box>
          <Stack direction={'row'} sx={{display:'flex', justifyContent:'space-around'}}>
            <Button onClick={()=>{assign()}}>Assign Player</Button>
            <Button onClick={()=>{setOpen(false, setPlayer(''))}}>Cancel</Button>
          </Stack>
         
          </Stack> 
        </Box>
      }
    </Box>
  )
}

export default EquipmentCard