import React from 'react';
import { useRoutes } from 'react-router';
import Login from '../pages/auth/Login';
import NonAuthorizedLayout from '../layouts/auth/NonAuthorizedLayout';
import AuthorizedLayout from '../layouts/auth/AuthorizedLayout';
import { authorizedRoutes } from './routeData';

const Router = () => {
  return useRoutes([
    {
      element: <NonAuthorizedLayout />,
      children: [
        {
          path: '/login',
          element: <Login />,
        },
      ],
    },
    {
      element: <AuthorizedLayout />,
      children: authorizedRoutes,
    },
  ]);
};

export default Router;
