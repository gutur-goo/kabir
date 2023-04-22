import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Logo from '../../assets/images/logo2.jpeg';

export default function ActionAreaCard({heading,subheading,handleClick}) {
  return (
    <Card onClick={handleClick} sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={Logo}
          alt="green iguana"
        />
        <CardContent style={{backgroundColor:'#5090D3',borderWidth:1,borderColor:'#5090D3'}}>
          <Typography gutterBottom variant="h5" component="div">
            {heading}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subheading}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
