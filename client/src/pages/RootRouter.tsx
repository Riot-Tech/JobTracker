import { 
    createBrowserRouter, 
    createRoutesFromElements, 
    Route, 
    Link, 
    Outlet 
} from 'react-router-dom'
import SignUp from './SignUp';
import Login from './Login';
import Profile from './Profile';
import Applications from './Applications';
import Spontaneous from './Spontaneous';

const Root = () => {
    return (
      <>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <Link to="/">Profile</Link>
          <Link to="/signup">SignUp</Link>
          <Link to="/login">Login</Link>
          <Link to="/applications">Applications</Link>
          <Link to="/spontaneous">Spontaneous applications</Link>
        </div>
        <div>
          <Outlet />
        </div>
      </>
    )
}

export const RootRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route index element={<Profile />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
      <Route path='/applications' element={<Applications />} />
      <Route path='/spontaneous' element={<Spontaneous />} />
    </Route>
  )
);