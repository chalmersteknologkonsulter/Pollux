import React from 'react';

import { MakeRouteWithSubRoutes } from './MakeRouteWithSubRoutes';
import { Switch, Redirect } from 'react-router-dom';
import SignInScreen from '../SignInScreen/SignInScreen';
import LayoutScreen from '../LayoutScreen/LayoutScreen';
import UserScreen from '../User/List';
import CustomerScreen from '../Customer/List';
import SellerScreen from '../Seller/List';
import OrderScreen from '../Order/List';
import WithdrawScreen from '../Withdraw/List';
import ProjectReports from '../Reports/ProjectReports';
import CategoryScreen from '../Product/CategoryList';
import CategoryDetailsScreen from '../Product/components/CategoryDetails';

const fetchXYZApiRoutes = () => {
  return [
    {
      path: '/HelloWorld',
      component: 'AAA',
    },
  ];
};

const routes = [
  {
    path: '/login',
    component: SignInScreen,
  },

  {
    path: '/page',
    component: LayoutScreen,
    routes: [
      {
        path: '/page/users',
        component: UserScreen,
      },
      {
        path: '/page/customers',
        component: CustomerScreen,
        routes: fetchXYZApiRoutes,
      },
      {
        path: '/page/sellers',
        component: SellerScreen,
      },
      {
        path: '/page/orders',
        component: OrderScreen,
      },
      {
        path: '/page/withdraws',
        component: WithdrawScreen,
      },
      {
        path: '/page/Products',
        component: CategoryScreen,
      },
      {
        path: '/page/ProductDetails',
        component: CategoryDetailsScreen,
      },
      {
        path: '/page/Reports',
        component: ProjectReports,
      },
    ],
  },
];

export const Router = (props) => {
  return (
    <div>
      <Switch>
        {routes.map((route, index) => (
          <MakeRouteWithSubRoutes key={index} {...route} />
        ))}
      </Switch>
      <Redirect to={'/login'} />
    </div>
  );
};
