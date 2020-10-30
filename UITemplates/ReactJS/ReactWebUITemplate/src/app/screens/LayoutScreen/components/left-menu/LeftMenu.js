import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import GridOnIcon from '@material-ui/icons/GridOn';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AssessmentIcon from '@material-ui/icons/Assessment';

import UserContext from '../../../../context';
import { UserTypes } from '../../../../utils/appConst';

export default function LeftMenu(props) {
  const { user } = React.useContext(UserContext);

  return (
    <List>
      <div>
        <ListItem
          button
          onClick={() => props.onMenuSelection('Users', 'Användare')}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary='Användare' />
        </ListItem>
        {user.UserType === UserTypes.FASTEX_USER && (
          <ListItem
            button
            onClick={() => props.onMenuSelection('Customers', 'Kunder')}
          >
            <ListItemIcon>
              <RecentActorsIcon />
            </ListItemIcon>
            <ListItemText primary='Kunder' />
          </ListItem>
        )}
        {/* {user.UserType === UserTypes.FASTEX_USER && (
          <ListItem button onClick={() => props.onMenuSelection('Sellers')}>
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary='Sellers' />
          </ListItem>
        )} */}

        <ListItem
          button
          onClick={() => props.onMenuSelection('Orders', 'Beställningar')}
        >
          <ListItemIcon>
            <AddShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary='Beställningar' />
        </ListItem>
        <ListItem
          button
          onClick={() => props.onMenuSelection('Withdraws', 'Utplock')}
        >
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary='Utplock' />
        </ListItem>
        {user.UserType === UserTypes.FASTEX_USER && (
          <ListItem
            button
            onClick={() => props.onMenuSelection('Products', 'Produkter')}
          >
            <ListItemIcon>
              <GridOnIcon />
            </ListItemIcon>
            <ListItemText primary='Produkter' />
          </ListItem>
        )}
        <ListItem
          button
          onClick={() => props.onMenuSelection('Reports', 'Projektrapporter')}
        >
          <ListItemIcon>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary='Projektrapporter' />
        </ListItem>
      </div>
    </List>
  );
}
