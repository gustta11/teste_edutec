import { useState } from "react";

export default function CadastroCategorias() {
  const [nome, setNome] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/categoria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Categoria cadastrada!");
        setNome("");
      } else {
        alert(data.erro || "Erro ao cadastrar categoria");
      }
    } catch (err) {
      console.error(err);
      alert("Erro na conexão com o servidor");
    }
  };

  return (
    <div>
      <h2>Cadastro de Categorias</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome da categoria"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
