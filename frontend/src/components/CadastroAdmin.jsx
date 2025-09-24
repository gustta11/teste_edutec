import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CadastroAdmin.css"; // Caso queira estilizar, crie esse arquivo

export default function CadastroAdmin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    cpf: "",
    nome: "",
    senha: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/usuarioAdmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Admin cadastrado com sucesso!");
        navigate("/login-admin"); 
      } else {
        alert(data.erro || "Erro ao cadastrar admin");
      }
    } catch (error) {
      alert("Erro na conexão com o servidor");
      console.error(error);
    }
  };

  return (
    <div className="div-cadastro-admin">
      <h2>Cadastro de Admin</h2>
      <form onSubmit={handleSubmit} className="form-cadastro-admin">
        <label>CPF:</label>
        <input
          type="text"
          name="cpf"
          value={form.cpf}
          onChange={handleChange}
          placeholder="Digite o CPF"
          required
        />

        <label>Nome:</label>
        <input
          type="text"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Digite o nome"
          required
        />

        <label>Senha:</label>
        <input
          type="password"
          name="senha"
          value={form.senha}
          onChange={handleChange}
          placeholder="Digite a senha"
          required
        />

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
