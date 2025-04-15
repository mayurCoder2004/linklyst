import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { AppLayout } from './layouts/AppLayout';
import LandingPage from './components/pages/LandingPage';
import Auth from './components/pages/Auth';
import Dashboard from './components/pages/Dashboard';
import Link from './components/pages/Link';
import RedirectLink from './components/pages/RedirectLink';
import UrlProvider from '../Context.jsx';
import RequireAuth from './components/require-auth';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/dashboard',
        element: <RequireAuth>
          <Dashboard />
        </RequireAuth>
      },
      {
        path: '/auth',
        element: <Auth />
      },
      {
        path: '/link/:id',
        element: <RequireAuth>
          <Link />
        </RequireAuth>
      },
      {
        path: '/:id',
        element: <RedirectLink />
      },
    ]
  }
]);

function App() {
  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  )
}

export default App
