import { createBrowserRouter } from 'react-router-dom';

import Home from '@/routes/home';
import ErrorPage from '@/routes/error';
import Auth from '@/routes/auth';
import Chat from '@/components/Chat/Chat';

import chatLoader from '@/router/chatLoader';
const routes = [
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/chat/:id',
        loader: chatLoader,
        element: <Chat />,
      },
      {
        path: '/friend/:id',
        element: <Chat />,
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
