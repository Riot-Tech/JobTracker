import './App.css'
import { RouterProvider } from 'react-router-dom'
import { RootRouter } from './pages/RootRouter';

function App() {

  return (
    <>
      <RouterProvider router={RootRouter} />
    </>
  )
}

export default App;
