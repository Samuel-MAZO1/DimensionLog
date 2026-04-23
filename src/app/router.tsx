import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LazyCharacterListPage, LazyCharacterDetailPage } from './lazy-pages';

// Todas las rutas de la aplicación en un solo lugar.
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/characters" replace />,
  },
  {
    path: '/characters',
    element: <LazyCharacterListPage />,
  },
  {
    path: '/characters/:id',
    element: <LazyCharacterDetailPage />,
  },
  {
    path: '*',
    element: <Navigate to="/characters" replace />,
  },
]);