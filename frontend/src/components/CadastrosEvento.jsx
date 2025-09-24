import { useState, useEffect } from "react";

export default function CadastroEvento() {
  const [form, setForm] = useState({
    nome: "",
    data_evento: "",
    localizacao: "",
    anfitriao: "",
    senha_evento: "",
  });

  const [eventos, setEventos] = useState([]); 
  const [editando, setEditando] = useState(null); 

  useEffect(() => {
    fetchEventos();
  }, []);

  const fetchEventos = async () => {
     const token = localStorage.getItem("tokenAdmin")
    try {
      const response = await fetch("http://localhost:3000/evento/admin",
        {
            headers:{
               Authorization: `Bearer ${token}`,
            }
        }
      );
      const data = await response.json()
      setEventos(data);
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar eventos")
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("tokenAdmin")

      const method = editando ? "PUT" : "POST"
      const url = editando
        ? `http://localhost:3000/evento/${editando}`
        : "http://localhost:3000/evento";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        alert(editando ? "Evento atualizado com sucesso!" : "Evento cadastrado com sucesso!")
        setForm({ nome: "", data_evento: "", localizacao: "", anfitriao: "", senha_evento: "" })
        setEditando(null);
        fetchEventos(); 
      } else {
        alert(data.erro || "Erro ao salvar evento")
      }
    } catch (err) {
      console.error(err);
      alert("Erro na conexão com o servidor")
    }
  };

  const handleEdit = (evento) => {
    setForm(evento);
    setEditando(evento.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Deseja excluir este evento?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/evento/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Evento excluído com sucesso!");
        fetchEventos();
      } else {
        const data = await response.json();
        alert(data.erro || "Erro ao excluir evento")
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir evento")
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>{editando ? "Editar Evento" : "Cadastrar Evento"}</h2>

        <label>Nome do evento:</label>
        <input name="nome" value={form.nome} onChange={handleChange} required />

        <label>Data do evento:</label>
        <input
          name="data_evento"
          type="date"
          value={form.data_evento}
          onChange={handleChange}
          required
        />

        <label>Local:</label>
        <input
          name="localizacao"
          value={form.localizacao}
          onChange={handleChange}
          required
        />

        <label>Nome dos anfitriões:</label>
        <input name="anfitriao" value={form.anfitriao} onChange={handleChange} />

        <label>Senha do evento:</label>
        <input
          name="senha_evento"
          type="password"
          value={form.senha_evento}
          onChange={handleChange}
          required
        />

        <button type="submit">{editando ? "Atualizar" : "Cadastrar"}</button>
      </form>

      <h2>Lista de Eventos</h2>
      <ul>
        {eventos.map((ev) => (
          <li key={ev.id}>
            {ev.nome} — {ev.data_evento} — {ev.localizacao}{" "}
            <button onClick={() => handleEdit(ev)}>Editar</button>
            <button onClick={() => handleDelete(ev.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
