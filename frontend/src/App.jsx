
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import AdminHome from './pages/AdminHome'
import LoginConvidado from './components/LoginConvidado'
import CadastroConvidado from './components/CadastroConvidado'

function App() {
 

  return (
    <Router>
      <Routes>
        <Route path="/" element ={<LoginConvidado/>}/>
        <Route path="/admin" element = {<AdminHome/>}/>
        <Route path="/cadastroConvidado" element= {<CadastroConvidado/>}/>
      </Routes>
    </Router>
  )
}

export default App
