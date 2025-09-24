import { useState, useEffect } from "react";

import './CadastroFormaPagamento.css'

export default function CadastroFormaPagamento() {
  const [nome, setNome] = useState("");
  const [formaPagamento, setFormaPagamento] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    carregarFormaPagamento();
  }, []);

  const carregarFormaPagamento = async () => {
    try {
      const res = await fetch("http://localhost:3000/FormaPagamento");
      const data = await res.json();
      setFormaPagamento(data);
    } catch (err) {
      alert("Erro ao carregar Formas de pagamento");
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editandoId
        ? `http://localhost:3000/formaPagamento/${editandoId}`
        : "http://localhost:3000/formaPagamento";
      const method = editandoId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(editandoId ? "Forma de pagamento atualizada!" : "Forma de pagamento cadastrada!");
        setNome("");
        setEditandoId(null);
        carregarFormaPagamento();
      } else {
        alert(data.erro || "Erro ao salvar forma de pagamento");
      }
    } catch (err) {
      alert("Erro ao salvar");
      console.error(err);
    }
  };

  const handleEditar = (formaPagamento) => {
    setNome(formaPagamento.nome);
    setEditandoId(formaPagamento.id);
  };

  const handleExcluir = async (id) => {
    const confirmar = window.confirm("Deseja realmente excluir esta forma de pagamento?");
    if (!confirmar) return;

    try {
      const res = await fetch(`http://localhost:3000/formaPagamento/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Forma de pagamento excluída!");
        carregarFormaPagamento();
      } else {
        alert("Erro ao excluir forma de pagamento");
      }
    } catch (err) {
      alert("Erro ao excluir");
      console.error(err);
    }
  };

  return (
    <div className="div-cadastro-formaPagamento">
      <h2>{editandoId ? "Editar Forma de pagamento" : "Cadastro de Formas de pagamento"}</h2>

      <form onSubmit={handleSubmit} className="form-cadastro-formaPagamento">
        <input
          type="text"
          placeholder="Nome da forma de pagamento"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <button type="submit">{editandoId ? "Atualizar" : "Cadastrar"}</button>
        {editandoId && (
          <button
            type="button"
            onClick={() => {
              setEditandoId(null);
              setNome("");
            }}
          >
            Cancelar edição
          </button>
        )}
      </form>

      <ul>
        {formaPagamento.map((formaPagamento) => (
          <li key={formaPagamento.id}>
            {formaPagamento.nome}{" "}
            <button onClick={() => handleEditar(formaPagamento)}>Editar</button>{" "}
            <button onClick={() => handleExcluir(formaPagamento.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
