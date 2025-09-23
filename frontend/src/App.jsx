
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import AdminHome from './pages/AdminHome'

function App() {
 

  return (
    <Router>
      <Routes>
        <Route path="/" element ={<Login/>}/>
        <Route path="/admin" element = {<AdminHome/>}/>
      </Routes>
    </Router>
  )
}

export default App
