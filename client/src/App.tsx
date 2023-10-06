import './App.css'
import { RouterProvider } from 'react-router-dom'
import { RootRouter } from './pages/RootRouter';

function App() {

  return (
    <>
      <h1>Hello World!</h1>
      <RouterProvider router={RootRouter} />
    </>
  )
}

export default App;
