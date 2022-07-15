import './App.css'
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import useAuth from './hooks/useAuth'
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Profile from './pages/Profile';
import Help from './pages/Help';

function App() {
  const { authIsReady, user } = useAuth()



  return (
    <Router>
      {authIsReady && (
        <div className="App">
          <Routes>
            <Route exact path='/' element={(!user && <Home />) || (user && <Navigate to='/dashboard'/>)} />
            <Route path='/login' element={<Login />} />
            <Route path='/sign-up' element={(!user && <SignUp />) || (user &&<Navigate to='/dashboard'/>)} />
            <Route path='/dashboard' element={(user && <Dashboard />) || (!user &&<Navigate to='/sign-up'/>)} />
            <Route path='/history' element={(user && <History />) || (!user &&<Navigate to='/sign-up'/>)} />
            <Route path='/profile' element={(user && <Profile />) || (!user &&<Navigate to='/sign-up'/>)} />
            <Route path='/help' element={(user && <Help />) || (!user &&<Navigate to='/sign-up'/>)} />
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;
