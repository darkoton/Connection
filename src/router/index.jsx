import { createBrowserRouter } from 'react-router-dom';

import Main from '@/routes/main';
import ErrorPage from '@/routes/error';
import Auth from '@/routes/auth';
const routes = [
  {
    path: '/',
    element: <Main />,
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
