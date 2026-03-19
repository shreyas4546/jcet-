import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AcademicsPage from './pages/AcademicsPage';
import DepartmentsPage from './pages/DepartmentsPage';
import AdmissionsPage from './pages/AdmissionsPage';
import PlacementsPage from './pages/PlacementsPage';
import CampusLifePage from './pages/CampusLifePage';
import NewsEventsPage from './pages/NewsEventsPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'academics', element: <AcademicsPage /> },
      { path: 'departments', element: <DepartmentsPage /> },
      { path: 'admissions', element: <AdmissionsPage /> },
      { path: 'placements', element: <PlacementsPage /> },
      { path: 'campus-life', element: <CampusLifePage /> },
      { path: 'news-events', element: <NewsEventsPage /> },
      { path: 'gallery', element: <GalleryPage /> },
      { path: 'contact', element: <ContactPage /> },
    ],
  },
]);
