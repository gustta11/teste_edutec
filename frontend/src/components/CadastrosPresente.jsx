import { useEffect, useState } from "react";

import './CadastrosPresente.css'

export default function CadastroPresente() {
  const [form, setForm] = useState({
    nome: '',
    preco: '',
    limite_maximo: '',
    data_criacao: '',
    id_evento: '',
    id_categoria: '',
    id_pagamento: '',
  });

  const [imagem, setImagem] = useState(null);
  const [presentes, setPresentes] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [editingId, setEditingId] = useState(null);

        useEffect(() => {
        fetchEventos()
        fetchPresentes()
        }, []);

  
    const fetchEventos = async () => {
      const token = localStorage.getItem('tokenAdmin');
      try {
        const response = await fetch("http://localhost:3000/evento/admin", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setEventos(data);
      } catch (err) {
        console.error("Erro ao buscar eventos", err);
      }
    };

    const fetchPresentes = async () => {
      const token = localStorage.getItem('tokenAdmin');
      try {
        const response = await fetch("http://localhost:3000/presente", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setPresentes(data);
      } catch (err) {
        console.error("Erro ao buscar presentes", err);
      }
    };


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImagemChange = (e) => {
    setImagem(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nome', form.nome);
    formData.append('preco', form.preco);
    formData.append('limite_maximo', form.limite_maximo);
    formData.append('data_criacao', form.data_criacao);
    formData.append('id_evento', form.id_evento);
    formData.append('id_categoria', form.id_categoria);
    formData.append('id_pagamento', form.id_pagamento);
    if (imagem) formData.append('imagem', imagem);

    const token = localStorage.getItem('tokenAdmin');
    const url = editingId
      ? `http://localhost:3000/presente/${editingId}`
      : 'http://localhost:3000/presente';

    const method = editingId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        fetchPresentes()
        alert(editingId ? 'Presente atualizado com sucesso!' : 'Presente cadastrado com sucesso!');
        setForm({
          nome: '',
          preco: '',
          limite_maximo: '',
          data_criacao: '',
          id_evento: '',
          id_categoria: '',
          id_pagamento: '',
        });
        setImagem(null);
        setEditingId(null);

        if (editingId) {
          setPresentes((prev) =>
            prev.map((p) => (p.id === editingId ? { ...p, ...form } : p))
          );
        } else {
          setPresentes((prev) => [...prev, data]);
        }
      } else {
        alert(data.erro || 'Erro ao salvar presente');
      }
    } catch (err) {
      console.error(err);
      alert('Erro na conexão com o servidor');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar este presente?')) return;

  

    try {
      const token = localStorage.getItem('tokenAdmin');
      const response = await fetch(`http://localhost:3000/presente/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        alert('Presente deletado com sucesso!');
        fetchPresentes()
      } else {
        alert('Erro ao deletar presente');
      }
    } catch (err) {
      console.error(err);
      alert('Erro na conexão com o servidor');
    }
  };

  const handleEdit = (presente) => {
    setForm({
      nome: presente.nome,
      preco: presente.preco,
      limite_maximo: presente.limite_maximo,
      data_criacao: presente.data_criacao,
      id_evento: presente.id_evento,
      id_categoria: presente.id_categoria,
      id_pagamento: presente.id_pagamento,
    });
    setImagem(null);
    setEditingId(presente.id);
  };

  return (
    <div className="div-cadastro-presentes">
      <h2>{editingId ? 'Editar Presente' : 'Cadastro de Presente'}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="form-cadastro-presntes">
        <input
          type="text"
          name="nome"
          placeholder="Nome do presente"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="preco"
          placeholder="Preço"
          value={form.preco}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="limite_maximo"
          placeholder="Limite máximo"
          value={form.limite_maximo}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="data_criacao"
          placeholder="Data de criação"
          value={form.data_criacao}
          onChange={handleChange}
          required
        />

        <select
          name="id_evento"
          value={form.id_evento}
          onChange={handleChange}
          required
        >
          <option value="">Selecione o evento</option>
          {eventos.map((evento) => (
            <option key={evento.id} value={evento.id}>
              {evento.nome}
            </option>
          ))}
        </select>

        <select
          name="id_categoria"
          value={form.id_categoria}
          onChange={handleChange}
          required
        >
          <option value="">Selecione a categoria</option>
          <option value="2">Acessório</option>
          <option value="4">Roupa</option>
        </select>

        <select
          name="id_pagamento"
          value={form.id_pagamento}
          onChange={handleChange}
          required
        >
          <option value="">Selecione a forma de pagamento</option>
          <option value="1">Pix</option>
          <option value="2">Cartão de crédito</option>
        </select>

        <input
          type="file"
          name="imagem"
          accept="image/*"
          onChange={handleImagemChange}
        />

        <button type="submit">{editingId ? 'Atualizar Presente' : 'Cadastrar Presente'}</button>
      </form>

      <h3>Presentes Cadastrados</h3>
      <ul>
       {presentes.map((p) => {
        return (
            <li key={p.id}>
                {p.nome} - R$ {p.preco}
                <button onClick={() => handleEdit(p)}>Editar</button>
                <button onClick={() => handleDelete(p.id)}>Excluir</button>
            </li>
        );
        })}

        </ul>
    </div>
  );
}
