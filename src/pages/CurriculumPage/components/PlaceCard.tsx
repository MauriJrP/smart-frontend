import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Grid, Rating} from '@mui/material';
import {IPlace} from '../types';

import {useNavigate} from 'react-router-dom';

interface IProps {
  place: IPlace;
}

export default function PlaceCard({ place }: IProps) {
  const { idPlace, name, rating, description } = place;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/place/${idPlace}`);
  };

  return (
    <Card className="w-full h-96 cursor-pointer" onClick={handleClick}>
      <CardMedia
        component="img"
        // height="140"
        image={`http://localhost:4000/${place.photo}`}
        alt={name}
        className="h-36"
      />
      <CardContent>
        <Rating
          name="read-only"
          value={rating}
          readOnly
        />
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description && description.slice(0, 128)}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}