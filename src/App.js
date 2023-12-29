import './App.css';

import { Route, Navigate, BrowserRouter, Routes } from 'react-router-dom';

import SignUp from './registerPages/SignUp'
import LogIn from './registerPages/LogIn';
import { app } from './server/firebaseInit';
import Dashboard from './dashboard/Dashboard';

import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { supabase } from './server/supabase';
import { CreateUser, GetUser } from './server/supabaseConfig';

function App() {
  // const [checkAuth, setCheckAuth] = useState(null)

  // useEffect(() => {
  //   async function CheckSubscription() {
  //     await supabase.auth.onAuthStateChange((event, session) => {
  //       console.log(session)
  //       if (session !== null) {
  //         setCheckAuth(true)
  //       } else {
  //         setCheckAuth(false)
  //       }
  //     });
  //   }

  //   CheckSubscription()
  // })

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={checkAuth ? <Navigate to='/dashboard' /> : <Navigate to='/signup' />}/> */}
        <Route path='/' element={<Navigate to='/dashboard'/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<LogIn/>}/>
      </Routes>      
  </BrowserRouter>
  );
}

export default App;
