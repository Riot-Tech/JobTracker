import './App.css'
import { RouterProvider } from 'react-router-dom'
import { RootRouter } from './pages/RootRouter';

function App() {

  return (
    <>
      <RouterProvider router={RootRouter} />
      <h1>Hello World!</h1>
    </>
  )
}

export default App;
