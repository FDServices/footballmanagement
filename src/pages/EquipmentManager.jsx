import { Button, Card, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, Stack, Typography, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { EquipmentCard } from '../components';
import axios from 'axios';
import {NavBar} from '../components'
import { getPlayers } from '../Api'

const API_URL = 'http://localhost:5000';

/*

  Things to come back to
  
  Removing the new type with a button
  fixing filter on top
  widths of cards
*/



const EquipmentManager = ({equipment}) => {
  const [assignedEquipment, setAssignedEquipment] = useState([]);
  const [unassigned, setUnassigned] = useState([]);
  const [open, setOpen] = useState(false);
  const [playersList, setPlayers] = useState([]);
  const [error, setError] = useState(null);


  //sort assigned
  const [assignedFiltered, setAssignedFiltered] = useState([])
  const [name, setName] = useState('')
  const [itemsLeft, setItemsLeft] = useState('items left')

  //sort unassigned
  const [unassignedFiltered, setUnassignedFiltered] = useState([])
  const [numberOrType, setNumberOrType] = useState('')
  const [equipmentType, setEquipmentType] = useState('Equipment Type')

  //to add more equipment
  const [helmetTypes, setHelmetTypes] = useState([{type:'', amount:0,size:'Size'}])
  const [padSizes, setPadSizes] = useState([{amount:0,size:'Size'}])
  const [jerseySize, setJerseySize] = useState("Size")
  const [JerseyNumber, setJerseyNumber] = useState(0)
  const [awayjerseySize, setawayJerseySize] = useState("Size")
  const [awayJerseyNumber, setAwayJerseyNumber] = useState(0)

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

  function addJersey(type) {
    let tempEquip;
    let temp = unassigned;
 
    // Construct the equipment object based on the type (Home or Away)
    if (type === 'Away') {
      tempEquip = {
        equipment: "Away Jersey",
        size: awayjerseySize,
        number: awayJerseyNumber,
        name: '',
      };
    } else if (type === 'Home') {
      tempEquip = {
        equipment: "Home Jersey",
        size: jerseySize,
        number: JerseyNumber,
        name: '',
      };
    }
    temp.push(tempEquip)
    setUnassigned([...temp])
    setUnassignedFiltered([...temp])
  
    // Send the equipment to the backend API
    fetch('http://localhost:5000/equipment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([tempEquip]) // Send the equipment as an array
    })
      .then(response => response.json())
      .then(data => {
        console.log('Equipment added successfully:', data);
        // Optionally, you can update the UI with the response data if necessary
      })
      .catch(error => {
        console.error('Error adding equipment:', error);
      });
  }
  

  function addEquipment(equipmentList, type) {
    let equipmentToSend = [];
    let tempUnassigned = unassigned;

    // Build the equipment data
    for (let i = 0; i < equipmentList.length; i++) {
        console.log('Building equipment for:', equipmentList[i]);  // Log to inspect each item
        for (let j = 0; j < equipmentList[i].amount; j++) {
            let tempEquip = {
                equipment: type,  // This is the type of equipment (Pads, Helmet, etc.)
                size: equipmentList[i].size,  // The size of the equipment
                name: '',  // Placeholder for name if necessary
            };

            // Check if the item has a 'type' property, e.g., for helmets
            if ('type' in equipmentList[i]) {
                tempEquip['type'] = equipmentList[i].type;
            }

            console.log('Equipment being sent:', tempEquip);  // Log the equipment data before sending

            // Ensure both 'equipment' and 'size' are set
            if (!tempEquip.equipment || !tempEquip.size) {
                console.error('Missing required fields:', tempEquip);
                return;  // Stop the function if required fields are missing
            }

            tempUnassigned.push(tempEquip);



    fetch('http://localhost:5000/equipment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([tempEquip]) // Send the equipment as an array
    })
      .then(response => response.json())
      .then(data => {
        console.log('Equipment added successfully:', data);
        // Optionally, you can update the UI with the response data if necessary
      })
      .catch(error => {
        console.error('Error adding equipment:', error);
      });
    }
  }
}

  function editLists(value,key,idx,list,setList){
    let temp = list
    temp[idx][key] = value
    setList([...temp])
  }
  function addHelmet(){
    let temp = helmetTypes
    temp.push({type:'', amount:''})
    setHelmetTypes([...temp])
  }
  function returnObject(item){
    let temp = {name: item.equipment, size: item.size}
    if ("type" in item) {
      temp['type'] = item.type;
    }
    if ("number" in item) {
      temp['number'] = item.number;
    }
    return temp
  }

  function sortby(sortType, listOfEquipment) {
    let sorted = listOfEquipment.sort((a, b) => {
      // Sort by equipment first
      if (a.equipment < b.equipment) return -1;
      if (a.equipment > b.equipment) return 1;
  
      // If equipment is the same, sort by size
      if (a.size < b.size) return -1;
      if (a.size > b.size) return 1;
  
      return 0;
    });
  
    let selectSorted = [];
  
    if (sortType === 'unassigned') {
      for (let i = 0; i < sorted.length; i++) {
        if (sorted[i].player === '') {
          selectSorted.push(sorted[i]);
        }
      }
      return [...selectSorted];
    } else if (sortType === 'assigned') {
      let players = [];
  
      for (let i = 0; i < sorted.length; i++) {
        if (sorted[i].player !== '') {
          let found = false;
  
          for (let j = 0; j < players.length; j++) {
            if (sorted[i].player === players[j].player) {
              found = true;
  
              // Add the equipment to the player's existing list
              let tempEquip = { 
                name: sorted[i].equipment, 
                size: sorted[i].size 
              };
  
              if ("type" in sorted[i]) {
                tempEquip['type'] = sorted[i].type;
              }
              if ("number" in sorted[i]) {
                tempEquip['number'] = sorted[i].number;
              }
  
              players[j].equipment.push(tempEquip);
            }
          }
  
          // If the player is not found, create a new entry
          if (!found) {
            let tempEquip = { 
              name: sorted[i].equipment, 
              size: sorted[i].size 
            };
  
            if ("type" in sorted[i]) {
              tempEquip['type'] = sorted[i].type;
            }
            if ("number" in sorted[i]) {
              tempEquip['number'] = sorted[i].number;
            }
  
            players.push({
              player: sorted[i].player,
              equipment: [tempEquip] // Initialize with the equipment array
            });
          }
        }
      }
      return [...players];
    } else {
      return sorted;
    }
  }
  
  useEffect(() => {
    if(name.length>0){
      let newAssigned = assignedEquipment.filter((item)=>item.player.toUpperCase().startsWith(name.toUpperCase()))
      setAssignedFiltered([...newAssigned])
    }else{
      setAssignedFiltered([...assignedEquipment])
    }
    if( typeof(itemsLeft)==='number'){
      let newAssigned = assignedEquipment.filter((item)=>item.equipment.length===itemsLeft)
      setAssignedFiltered([...newAssigned])
    }
  }, [name,itemsLeft])

  useEffect(() => {
    let filtered = [...unassigned];
  
    // Apply `numberOrType` filter if it has a value
    if (numberOrType.length > 0) {
      filtered = filtered.filter((item) => {
        if ('type' in item && item.type.toUpperCase().startsWith(numberOrType.toUpperCase())) {
          return true;
        }
        if ('number' in item && item.number.toString().startsWith(numberOrType)) {
          return true;
        }
        return false;
      });
    }
  
    // Apply `equipmentType` filter if it's not the default
    if (equipmentType !== 'Equipment Type' && equipmentType !== 'Any') {
      filtered = filtered.filter((item) => item.equipment.toLowerCase() === equipmentType.toLowerCase());
    }
  
    // If no filters are applied, reset to the original unassigned list
    if (equipmentType === 'Equipment Type' && numberOrType.length === 0 || equipmentType === 'Any' && numberOrType.length === 0) {
      filtered = [...unassigned];
    }
  
    // Update the filtered list
    setUnassignedFiltered(filtered);
  }, [numberOrType, equipmentType, unassigned]);
  
  useEffect(() => {
    if (equipment.length > 0) {
      setAssignedEquipment(sortby('assigned', equipment));
      setAssignedFiltered(sortby('assigned', equipment))
      setUnassigned(sortby('unassigned', equipment));
      setUnassignedFiltered(sortby('unassigned', equipment))

    }
  }, [equipment]);

  return (
      <Box sx={{  height: '100vh',  display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor:'black' }}>
      <NavBar/>
      
       <Stack  sx={{height:'100vh', width:'90%', padding:'10px'}}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor:'black'}}>
          <Typography variant='h2' sx={{color:'white'}}>Equipment Management</Typography>
        </Box>
      <Box sx={{ height: '90%', width:'100%', display: 'flex', flexDirection: 'column', }}>
      <Typography variant='h5' sx={{ mb: '30px',color:'white', mt:'5px' }}>Assigned Equipment</Typography>
        <Stack direction='row' sx={{display:'flex', justifyContent:'left', width:'100%', }}>
         
          
          <TextField 
            label="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            sx={{ 
              '& .MuiInputLabel-root': { color: 'black' }, 
              '& .MuiOutlinedInput-root': { 
                '&.Mui-focused fieldset': { borderColor: 'white' }, 
                '& input': { color: 'black', backgroundColor: 'white', borderRadius: '5px' } 
              } , mr:'20px'
            }} 
          />

          <Select 
            sx={{ 
              width: '200px', 
              color: 'white', 
              backgroundColor: 'white', 
              borderRadius: '5px', 
              '& .MuiSelect-outlined': { padding: '8px' }, 
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'black' }, 
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, 
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }
            }} 
            value={itemsLeft} 
            onChange={(e) => setItemsLeft(e.target.value)}
>
  <MenuItem value="items left" disabled><Typography sx={{color:'black'}}> Items Left </Typography></MenuItem>
  <MenuItem value="any"><Typography sx={{color:'black'}}> any </Typography></MenuItem>
  <MenuItem value={4}><Typography sx={{color:'black'}}> 4 </Typography></MenuItem>
  <MenuItem value={3}><Typography sx={{color:'black'}}> 3 </Typography></MenuItem>
  <MenuItem value={2}><Typography sx={{color:'black'}}> 2 </Typography></MenuItem>
  <MenuItem value={1}><Typography sx={{color:'black'}}> 1 </Typography></MenuItem>
</Select>

        </Stack>
        <Stack direction={'row'}>
          {
            assignedFiltered.length > 0 &&
            assignedFiltered.map((item, idx) => (
              <Card sx={{ margin: '10px' }} key={idx}>
                <Typography>{item.player}</Typography>
                {
                  item.equipment.map((equipment, id) => (
                    <div key={id}>
                      <EquipmentCard 
                        equipment={equipment} 
                        key={id} 
                        name={item.player} 
                        unassigned={unassigned} 
                        setUnassigned={setUnassigned} 
                        assigned={assignedEquipment} 
                        setAssigned={setAssignedEquipment} 
                        setAssignedFiltered={setAssignedFiltered}
                        setUnassignedFilter={setUnassignedFiltered}
                      />
                     
                    </div>
                  ))
                }
              </Card>
            ))
          }
        </Stack>
      </Box>
     

      {/* 
      
        UNASSIGNED EQUIPMENT 
      
      */}
   <Typography variant='h5' sx={{ mb: '30px', color:'white' }}>Unassigned Equipment</Typography>
      <Stack direction={'row'} sx={{display:'flex', justifyContent:'left',width:'100%' }}>
         
          
          <TextField 
            label="Type/Number" 
            value={numberOrType} 
            onChange={(e) => setNumberOrType(e.target.value)} 
            sx={{ 
              '& .MuiInputLabel-root': { color: 'black' }, 
              '& .MuiOutlinedInput-root': { 
                '&.Mui-focused fieldset': { borderColor: 'white' }, 
                '& input': { color: 'black', backgroundColor: 'white', borderRadius: '5px' } 
              } , mr:'20px'
            }} 
          />
      <Select 
        sx={{ 
          width: '200px', 
          color: 'white', 
          backgroundColor: 'white', 
          borderRadius: '5px', 
          '& .MuiSelect-outlined': { padding: '8px' }, 
          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'black' }, 
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, 
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }
        }} 
        value={equipmentType} 
        onChange={(e) => setEquipmentType(e.target.value)}
      >
        <MenuItem value="Equipment Type" disabled>  <Typography sx={{color:'black'}}> Equipment Type </Typography> </MenuItem>
        <MenuItem value="Any"><Typography sx={{color:'black'}}> Any </Typography></MenuItem>
        <MenuItem value="Away Jersey"><Typography sx={{color:'black'}}> Away Jersey </Typography></MenuItem>
        <MenuItem value="Home Jersey"><Typography sx={{color:'black'}}> Home Jersey </Typography></MenuItem>
        <MenuItem value="Helmet"><Typography sx={{color:'black'}}> Helmet </Typography></MenuItem>
        <MenuItem value="Pads"><Typography sx={{color:'black'}}> Pads </Typography></MenuItem>
      </Select>

        </Stack>
        <Stack direction={'row'}>
          {
            unassignedFiltered.length > 0 &&
            unassignedFiltered.map((item, idx) => (
              <Card sx={{ margin: '10px' }} key={idx}>
                <EquipmentCard 
                  equipment={returnObject(item)} 
                  players={playersList} 
                  unassigned={unassigned} 
                  setUnassigned={setUnassigned} 
                  assigned={assignedEquipment} 
                  setAssigned={setAssignedEquipment} 
                  key={idx} 
                  setAssignedFiltered={setAssignedFiltered}
                  setUnassignedFilter={setUnassignedFiltered}
                />
              
              </Card>
            ))
          }
        </Stack>
        
     {/*
      Buttons and such 
    */}

      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        sx={{
          backgroundColor:'#4B0101',
          position: 'absolute',
          right: 10,
          top: 10,
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          fontSize: '26px',
        }}
      >
        +
      </Button>

      {/* Modal/Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md"  sx={{ '& .MuiPaper-root': { backgroundColor: '#4B0101', color: 'white' } }} >
        <DialogTitle textAlign="center">New Equipment</DialogTitle>
        <DialogContent dividers>
          {/* Home Jerseys */}
          <Typography>Home Jerseys</Typography>
          <TextField
            label="Number"
      
            sx={{ width: '100px', marginRight: 2, '& .MuiInputBase-root': { color: 'black', backgroundColor: 'white' }, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '& .MuiInputLabel-root': { color: 'black' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }}
            value={JerseyNumber}
            onChange={(e) => setJerseyNumber(e.target.value)}
            
          />
          <Select value={jerseySize} onChange={(e) => setJerseySize(e.target.value)} sx={{ color: 'black', backgroundColor: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}>
            <MenuItem value="Size" disabled>Size</MenuItem>
            <MenuItem value="XS">XS</MenuItem>
            <MenuItem value="S">S</MenuItem>
            <MenuItem value="M">M</MenuItem>
            <MenuItem value="L">L</MenuItem>
            <MenuItem value="XL">XL</MenuItem>
            <MenuItem value="XXL">XXL</MenuItem>
            <MenuItem value="XXXL">XXXL</MenuItem>
          </Select>
          <Button variant="outlined" sx={{   marginTop: '16px', color: 'white', borderColor: 'white', m: '5px', '&:hover': { borderColor: 'white', backgroundColor: 'transparent' }, '&.MuiButton-outlined': { borderColor: 'white' }, '&.MuiButton-outlined:hover': { borderColor: 'white', backgroundColor: 'transparent' } }} onClick={() => addJersey('Home')}>Add Jersey</Button>

          {/* Away Jerseys */}
          <Typography mt={2}>Away Jerseys</Typography>
          <TextField
            label="Number"
            sx={{ width: '100px', marginRight: 2, '& .MuiInputBase-root': { color: 'black', backgroundColor: 'white' }, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '& .MuiInputLabel-root': { color: 'black' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }}
            value={awayJerseyNumber}
            onChange={(e) => setAwayJerseyNumber(e.target.value)}
          />
          <Select value={awayjerseySize} onChange={(e) => setawayJerseySize(e.target.value)} sx={{ color: 'black', backgroundColor: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}>
            <MenuItem value="Size" disabled>Size</MenuItem>
            <MenuItem value="XS">XS</MenuItem>
            <MenuItem value="S">S</MenuItem>
            <MenuItem value="M">M</MenuItem>
            <MenuItem value="L">L</MenuItem>
            <MenuItem value="XL">XL</MenuItem>
            <MenuItem value="XXL">XXL</MenuItem>
            <MenuItem value="XXXL">XXXL</MenuItem>
          </Select>
          <Button variant="outlined" sx={{ color: 'white', borderColor: 'white', m: '5px', '&:hover': { borderColor: 'white', backgroundColor: 'transparent' }, '&.MuiButton-outlined': { borderColor: 'white' }, '&.MuiButton-outlined:hover': { borderColor: 'white', backgroundColor: 'transparent' } }} onClick={() => addJersey('Away')}>Add Jersey</Button>

          {/* Pads */}
          <Typography mt={2}>Pads</Typography>
          {padSizes &&
            padSizes.map((item, idx) => (
              <Stack key={idx} direction="row" spacing={2} alignItems="center" mt={1}>
                <Select
                  value={item.size}
                  onChange={(e) => editLists(e.target.value, 'size', idx, padSizes, setPadSizes)}
                  sx={{ color: 'black', backgroundColor: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
                >
                  <MenuItem value="Size" disabled>Size</MenuItem>
                  <MenuItem value="XS">XS</MenuItem>
                  <MenuItem value="S">S</MenuItem>
                  <MenuItem value="M">M</MenuItem>
                  <MenuItem value="L">L</MenuItem>
                  <MenuItem value="XL">XL</MenuItem>
                  <MenuItem value="XXL">XXL</MenuItem>
                  <MenuItem value="XXXL">XXXL</MenuItem>
                </Select>
                <TextField
                   sx={{ width: '100px', marginRight: 2, '& .MuiInputBase-root': { color: 'black', backgroundColor: 'white' }, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '& .MuiInputLabel-root': { color: 'black' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }}
                  label="Number"
                  value={item.amount}
                  type="number"
                  onChange={(e) => editLists(e.target.value, 'amount', idx, padSizes, setPadSizes)}
                />
              </Stack>
            ))}
           <Button variant="outlined" sx={{  color: 'white', borderColor: 'white', m: '10px 5px 5px 5px ', '&:hover': { borderColor: 'white', backgroundColor: 'transparent' }, '&.MuiButton-outlined': { borderColor: 'white' }, '&.MuiButton-outlined:hover': { borderColor: 'white', backgroundColor: 'transparent' } }} onClick={() => addEquipment(padSizes, 'Pads')} >
            Add Pads
          </Button>

          {/* Helmets */}
          <Typography mt={2}>Helmets</Typography>
          {helmetTypes.map((item, idx) => (
            <Stack key={idx} direction="row" spacing={2} alignItems="center" mt={1}>
              <TextField
                label="Type"
                value={item.type}
                sx={{ width: '100px', marginRight: 2, '& .MuiInputBase-root': { color: 'black', backgroundColor: 'white' }, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '& .MuiInputLabel-root': { color: 'black' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }}
                onChange={(e) => editLists(e.target.value, 'type', idx, helmetTypes, setHelmetTypes)}
              />
              <Select
                value={item.size}
                onChange={(e) => editLists(e.target.value, 'size', idx, helmetTypes, setHelmetTypes)}
                sx={{ color: 'black', backgroundColor: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
              >
                <MenuItem value="Size" disabled>Size</MenuItem>
                <MenuItem value="XS">XS</MenuItem>
                <MenuItem value="S">S</MenuItem>
                <MenuItem value="M">M</MenuItem>
                <MenuItem value="L">L</MenuItem>
                <MenuItem value="XL">XL</MenuItem>
                <MenuItem value="XXL">XXL</MenuItem>
                <MenuItem value="XXXL">XXXL</MenuItem>
              </Select>
              <TextField
                label="Number"
                value={item.amount}
                sx={{ width: '100px', marginRight: 2, '& .MuiInputBase-root': { color: 'black', backgroundColor: 'white' }, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '& .MuiInputLabel-root': { color: 'black' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }}
                type="number"
                onChange={(e) => editLists(e.target.value, 'amount', idx, helmetTypes, setHelmetTypes)}
              />
            </Stack>
          ))}
          <Button onClick={addHelmet} variant="outlined" sx={{   marginTop: '16px', color: 'white', borderColor: 'white', m: '5px', '&:hover': { borderColor: 'white', backgroundColor: 'transparent' }, '&.MuiButton-outlined': { borderColor: 'white' }, '&.MuiButton-outlined:hover': { borderColor: 'white', backgroundColor: 'transparent' } }}>
            New Helmet Type
          </Button>
          <Button variant="outlined" sx={{   marginTop: '16px', color: 'white', borderColor: 'white', m: '5px', '&:hover': { borderColor: 'white', backgroundColor: 'transparent' }, '&.MuiButton-outlined': { borderColor: 'white' }, '&.MuiButton-outlined:hover': { borderColor: 'white', backgroundColor: 'transparent' } }} onClick={() => addEquipment(helmetTypes, 'Helmet')} >
            Add Helmets
          </Button>
        </DialogContent>

        <DialogActions>
        <Button variant="outlined" sx={{   marginTop: '16px', color: 'white', borderColor: 'white', m: '5px', '&:hover': { borderColor: 'white', backgroundColor: 'transparent' }, '&.MuiButton-outlined': { borderColor: 'white' }, '&.MuiButton-outlined:hover': { borderColor: 'white', backgroundColor: 'transparent' } }} onClick={() => setOpen(false)} >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      </Stack>
    </Box>
  );
};

export default EquipmentManager;
