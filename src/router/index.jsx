import { createBrowserRouter } from 'react-router-dom';

import App from '@/routes/app';
import ErrorPage from '@/routes/error/error';
import Auth from '@/routes/auth';
import Chat from '@/components/Chat/Chat';
import ChatEmpty from '@/components/Chat/Empty';
import Home from '@/routes/Home';

import chatLoader from '@/router/chatLoader';
const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <ChatEmpty />,
      },
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
  {
    path: 'home',
    element: <Home />,
  },
];

const routesWithError = routes.map(r => {
  r.errorElement = <ErrorPage />;
  return r;
});

export default function Router() {
  return createBrowserRouter(routesWithError);
}
