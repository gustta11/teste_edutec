
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import AdminHome from './pages/AdminHome'
import LoginConvidado from './components/LoginConvidado'
import CadastroConvidados from './components/CadastroConvidado'
import ListaPresente from './pages/ListaPresente'
import Home from './pages/Home'
import CadastroCategorias from './components/CadastroCategorias'
import CadastroFormasPagamento from './components/CadastroFormaPagamento'
import CadastroEventos from './components/CadastrosEvento'
import CadastroPresentes from './components/CadastrosPresente'
import ListaPresentesEscolhidos from './components/ListaPresentesEscolhidos'
import Relatorios from './components/relatorio'


function App() {
 

  return (
    <Router>
      <Routes>
        <Route path="/" element ={<Home/>}/>
        <Route path="/admin" element = {<AdminHome/>}/>
        <Route path="/login-admin" element ={<Login/>}/>
        <Route path="/login-convidado" element ={<LoginConvidado/>}/>
        <Route path="/selecionar-presentes" element= {<ListaPresente/>}/>
        <Route path="/cadastro-categorias" element={<CadastroCategorias />} />
        <Route path="/cadastro-convidados" element={<CadastroConvidados />} />
        <Route path="/cadastro-formas-pagamento" element={<CadastroFormasPagamento />} />
        <Route path="/cadastro-eventos" element={<CadastroEventos />} />
        <Route path="/cadastro-presentes" element={<CadastroPresentes />} />
        <Route path="/lista-presentes-escolhidos" element={<ListaPresentesEscolhidos />} />
        <Route path="/relatorios" element={<Relatorios />} />
      </Routes>
    </Router>
  )
}

export default App
