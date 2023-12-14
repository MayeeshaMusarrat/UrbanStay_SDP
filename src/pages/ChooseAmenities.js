import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

export default function ChooseAmenities() {
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);

  React.useEffect(() => {
    
    fetchAmenities();
  }, []); 

  const handleConfirm = () => {
    
 
  const parsedRightList = right;
  const temp_arr = [];

  parsedRightList.forEach(item => {
    if (item === 'Wifi') {
      temp_arr.push('wifi');
    } 
    else if (item === 'Parking') {
      temp_arr.push('parking');
    }
    else if (item === 'Dryer') {
      temp_arr.push('Dryer');
    }
    else if (item === 'TV') {
      temp_arr.push('TV');
    }
    else if (item === 'AC') {
      temp_arr.push('AC');
    }
    else if (item === 'Waterfront') {
      temp_arr.push('Waterfront');
    }
  });

  localStorage.setItem('rightList', JSON.stringify(temp_arr));
  };


  const PID = localStorage.getItem('PID');
  const fetchAmenities = async () => {
    try {
      const response = await fetch(`http://localhost:5001/getAmenitiesChoose/${PID}`);
      const data = await response.json();

      console.log("amenities: " , data);
      setLeft(data.searchResults.map((result) => result.Name));
    } catch (error) {
      console.error('Error fetching amenities:', error);
    }
  };

  function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }
  
  function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
  }
  
  function union(a, b) {
    return [...a, ...not(b, a)];
  }

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card>
     
        <CardHeader
          sx={{ px: 2, py: 1 }}
          avatar={
            <Checkbox
              onClick={handleToggleAll(items)}
              checked={numberOfChecked(items) === items.length && items.length !== 0}
              indeterminate={
                numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
              }
              disabled={items.length === 0}
              inputProps={{
                'aria-label': 'all items selected',
              }}
            />
          }
          title={title}
          subheader={`${numberOfChecked(items)}/${items.length} selected`}
        />
        <Divider />
        <List
          sx={{
            width: 500,
            height: 350,
            bgcolor: 'background.paper',
            overflow: 'auto',
          }}
          dense
          component="div"
          role="list"
        >
          {items.map((value) => {
            const labelId = `transfer-list-all-item-${value}-label`;

            return (
              <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      'aria-labelledby': labelId,
                    }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${value}`} />
              </ListItem>
            );
          })}
        </List>
      
    </Card>
  );

  return (
    <> 
    <div style = {{backgroundColor: "white", height: "490px", width: "900px", borderRadius: "10px"}}> 
    <Grid container spacing={7} justifyContent="center" alignItems="center">
      <Grid item style = {{width: "400px"}}> {customList('Choices', left)}  </Grid>
      <Grid item>



        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>


    
      <Grid item style = {{width: "400px"}}> {customList('Chosen', right)} </Grid>

      <Button
      variant = "outlined"
      
      size = "small"
      style = {{
        left: "400px",
        top: "-60px",
      }}
      onClick={handleConfirm}
      
      > Confirm </Button>




    </Grid>
    </div>
    </>
    
  );
}
