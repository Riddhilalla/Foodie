import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'

function App() {
 
  return (
    <div className='max-w-screen-2xl mx-auto bg-background'>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default App
