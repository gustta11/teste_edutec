import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  const irParaLoginAdmin = () => {
    navigate("/login-admin");
  };

  const irParaLoginConvidado = () => {
    navigate("/login-convidado");
  };

  return (
    <div className="home-container">
      <h1>Bem-vindo ao Sistema de Presentes</h1>

      <button className="btn" onClick={irParaLoginAdmin}>
        Login Administrador
      </button>

      <button className="btn" onClick={irParaLoginConvidado}>
        Login Convidado
      </button>
    </div>
  );
}
