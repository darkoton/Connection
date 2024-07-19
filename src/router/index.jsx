import { createBrowserRouter } from 'react-router-dom';

import Home from '@/routes/home';
import ErrorPage from '@/routes/error';
import Auth from '@/routes/auth';
import ChatsList from '@/components/ChatsList/List';
import Friends from '@/components/ChatsList/Friends';

const routes = [
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        element: <ChatsList />,
      },
      {
        path: '/friends',
        element: <Friends />,
      },
    ],
  },

  {
    path: 'authentication',
    element: <Auth />,
  },
];

const routesWithError = routes.map(r => {
  r.errorElement = <ErrorPage />;
  return r;
});

export default function Router() {
  return createBrowserRouter(routesWithError);
}
