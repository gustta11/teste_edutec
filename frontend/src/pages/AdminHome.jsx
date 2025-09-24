import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminHome.css";

export default function AdminHome() {
  const navigate = useNavigate();

  return (
    <div className="admin-home-container">
      <h1>Painel do Administrador</h1>

      <div className="button-group">
        <button onClick={() => navigate("/cadastro-categorias")}>
          Cadastro de Categorias
        </button>

        <button onClick={() => navigate("/cadastro-formas-pagamento")}>
          Cadastro de Formas de Pagamento
        </button>

        <button onClick={() => navigate("/cadastro-eventos")}>
          Cadastro de Eventos
        </button>

        <button onClick={() => navigate("/cadastro-presentes")}>
          Cadastro de Presentes
        </button>

        <button onClick={() => navigate("/lista-presentes-escolhidos")}>
          Lista de Presentes Escolhidos
        </button>

        <button onClick={() => navigate("/relatorios")}>
          Relatórios
        </button>
      </div>
    </div>
  );
}