import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CadastroConvidado() {
  const [form, setForm] = useState({
    nome: '',
    telefone: '',
    email: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('tokenConvidado');
      const response = await fetch("http://localhost:3000/convidado/completar", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Cadastro completo!");
        navigate("/pagina-do-convidado"); // redireciona onde quiser
      } else {
        alert(data.erro || "Erro ao completar cadastro");
      }
    } catch (err) {
      console.error(err);
      alert("Erro na conexão com o servidor");
    }
  };

  return (
    <div>
      <h2>Completar Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome completo"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="telefone"
          placeholder="Telefone"
          value={form.telefone}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
