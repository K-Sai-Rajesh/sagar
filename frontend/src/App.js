import './App.css';
import { Navigate, useRoutes } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import SimpleSnackbar from './pages/Notification';
// import Dashboard from './layout/Dashboard';
import Users from './pages/Users';
import LandingPage from './pages/LandingComponents/LandingPage';
import SignIn from './pages/LandingComponents/SignIn';
import PageNotFound from './pages/PageNotFound';
import BasicTabs from './pages/Tabs';
import Pricing from './pages/LandingComponents/Pricing';
import AddUser from './pages/AddUser';
import UserDashboard from './pages/UserDashboard';
import Chat from './pages/ChatBox';
import Events from './pages/LandingComponents/Events';
import Auth from './layout/Auth';
import AddEvents from './pages/AddEvents';
import Event from './pages/Event';
import EventsTable from './pages/EventLists';
import EventsList from './pages/LandingComponents/EventsList';
import EventSections from './pages/LandingComponents/EventSection';

function App() {
  const load = useSelector(state => state?.LoadingReducer?.load)
  const { acceptCookies } = useSelector(state => state.LoginReducer)
  const routes = useRoutes([
    {
      path: '',
      element: <LandingPage />
    },
    {
      path: 'signin',
      element:
        <>
          {
            !acceptCookies ?
              <Navigate to='/signin' />
              :
              <SignIn />
          }
        </>
    },
    {
      path: 'events',
      element: <Events />,
      children: [
        {
          path: '',
          element: <EventSections />
        },
        {
          path: 'list',
          element: <EventsList />
        }
      ]
    },
    {
      path: 'subscription',
      element: <Pricing />
    },
    {
      path: 'admin',
      element:
        <Auth />,
      children: [
        {
          path: '',
          element: <></>
        },
        {
          path: 'users',
          element: <Users />
        },
        {
          path: 'add_user',
          element: <AddUser admin={true} user={false} />
        },
        {
          path: 'events',
          element: <AddEvents />,
          children: [
            {
              path: 'add',
              element: <Event />
            },
            {
              path: '',
              element: <EventsTable />
            }
          ]
        }
      ]
    },
    {
      path: 'dashboard',
      element: <Auth />,
      children: [
        {
          path: '',
          element: <UserDashboard />
        },
        {
          path: 'users',
          element: <Users />
        },
        {
          path: 'chats',
          element: <Chat />
        },
        {
          path: 'friend',
          element: <BasicTabs />
        },
        {
          path: 'edit',
          element: <AddUser admin={false} user={true} />
        }
      ]
    },
    {
      path: 'error',
      element: <PageNotFound />
    },
    {
      path: '/dashboard/*',
      element: <PageNotFound />
    },
    {
      path: '/*',
      element: <PageNotFound />
    },
  ])

  return (
    <>
      <SimpleSnackbar />
      {
        routes
      }
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
        open={load}
      >
        <CircularProgress color="inherit" />
      </Backdrop >
    </>
  );
}

export default App;