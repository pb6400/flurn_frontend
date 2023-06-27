import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import LeavesList from './components/leaves/LeavesList';
import LeaveCalendar from './components/leaves/LeaveCalendar';
import CreateLeave from './components/leaves/CreateLeave';
import EditLeave from './components/leaves/EditLeave';

const access_token = '';

const App = () => {

    
  const BrowserRouter = createBrowserRouter([
    {path:"/",element:<Login />},
    {path:"/register",element:<Register/>},
    {path:"/leaves",element:<LeavesList />},
    {path:"/calendar",element:<LeaveCalendar />},
    {path:"/create-leave",element:<CreateLeave />},
    {path:"/edit-leave/:id",element:<EditLeave />},


  ]);

  return (
    <>
  <RouterProvider router={BrowserRouter} />
  </>
  );
};

export default App;
export {access_token};