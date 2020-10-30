// @flow

import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Edit } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import DeleteConfirmationDialog from '../../../components/DeleteConfirmationDialog';

type Props = {
  /** Classes attached with the component */
  classes: Object,
  /** Category Object */
  category: Object,
  /** Function to edit category */
  onClick: Function,
  /** Function to detele category */
  onDelete: Function,
};

const styles = {
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    width: '100%',
    padding: 10,
  },
  cardContent: {
    flexGrow: 1,
  },
  cardContentDescription: {
    height: 100,
    overflow: 'scroll',
  },
};

/**
 * Custom MaterialUI Card component
 * Shows information about an Category
 */
const Category = ({ classes, category, onClick, onDelete }: Props) => {
  const { card, cardMedia, cardContent, cardContentDescription } = classes;
  const { ImageURL, Title, Description } = category;
  return (
    <Card className={card}>
      {/* <CardMedia className={cardMedia} image={imageUrl} /> */}
      <CardMedia
        className={classes.cardMedia}
        component='img'
        height='100'
        alt={Title}
        image={ImageURL}
        title={Title}
      />
      <CardContent className={cardContent}>
        <Typography gutterBottom variant='h5' component='h2'>
          {Title}
        </Typography>
        <div className={cardContentDescription}>
          <Typography>{Description}</Typography>
        </div>
      </CardContent>
      <CardActions>
        <IconButton color='secondary' size='small' onClick={onClick}>
          <Edit />
        </IconButton>
        <DeleteConfirmationDialog
          title='Bekräftelse'
          message='Är du säker på att du vill radera produktinformationen?'
          onConfirmation={(event) => onDelete(category)}
        ></DeleteConfirmationDialog>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(Category);
