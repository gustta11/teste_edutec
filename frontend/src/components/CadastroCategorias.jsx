import { useState, useEffect } from "react";

import './CadastroCategoria.css'

export default function CadastroCategorias() {
  const [nome, setNome] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    carregarCategorias();
  }, []);

  const carregarCategorias = async () => {
    try {
      const res = await fetch("http://localhost:3000/categoria");
      const data = await res.json();
      setCategorias(data);
    } catch (err) {
      alert("Erro ao carregar categorias");
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editandoId
        ? `http://localhost:3000/categoria/${editandoId}`
        : "http://localhost:3000/categoria";
      const method = editandoId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(editandoId ? "Categoria atualizada!" : "Categoria cadastrada!");
        setNome("");
        setEditandoId(null);
        carregarCategorias();
      } else {
        alert(data.erro || "Erro ao salvar categoria");
      }
    } catch (err) {
      alert("Erro ao salvar");
      console.error(err);
    }
  };

  const handleEditar = (categoria) => {
    setNome(categoria.nome);
    setEditandoId(categoria.id);
  };

  const handleExcluir = async (id) => {
    const confirmar = window.confirm("Deseja realmente excluir esta categoria?");
    if (!confirmar) return;

    try {
      const res = await fetch(`http://localhost:3000/categoria/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Categoria excluída!");
        carregarCategorias();
      } else {
        alert("Erro ao excluir categoria");
      }
    } catch (err) {
      alert("Erro ao excluir");
      console.error(err);
    }
  };

  return (
    <div className="div-cadastro-categoria">
      <h2>{editandoId ? "Editar Categoria" : "Cadastro de Categorias"}</h2>

      <form onSubmit={handleSubmit} className="form-cadastro-categoria">
        <input
          type="text"
          placeholder="Nome da categoria"
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
        {categorias.map((categoria) => (
          <li key={categoria.id}>
            {categoria.nome}{" "}
            <button onClick={() => handleEditar(categoria)}>Editar</button>{" "}
            <button onClick={() => handleExcluir(categoria.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
