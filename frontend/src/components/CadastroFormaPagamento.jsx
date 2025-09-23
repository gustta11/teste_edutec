import { useState } from "react";

export default function CadastroCategorias() {
  const [nome, setNome] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/formaPagamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Forma de pagamento cadastrada!");
        setNome("");
      } else {
        alert(data.erro || "Erro ao cadastrar forma de pagamento");
      }
    } catch (err) {
      console.error(err);
      alert("Erro na conexão com o servidor");
    }
  };

  return (
    <div>
      <h2>Cadastro de forma de pagamento</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Forma de pagamento"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
