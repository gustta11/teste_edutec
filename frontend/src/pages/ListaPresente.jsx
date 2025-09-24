import React, { useEffect, useState } from 'react';
import PresentesGrade from '../components/PresentesGrade';
import ModalPresentear from '../components/ModalPresentear';

export default function ListaPresentes() {
  const [presentes, setPresentes] = useState([]);
  const [presenteSelecionado, setPresenteSelecionado] = useState(null);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchPresentes = async () => {
    try {
      const res = await fetch("http://localhost:3000/presente");
      const data = await res.json();
      setPresentes(data);
    } catch (err) {
      console.error("Erro ao buscar presentes", err);
    }
  };

  fetchPresentes();
}, []);

  const handlePresentear = (presente) => {
    setPresenteSelecionado(presente);
  };

  const fecharModal = () => {
    setPresenteSelecionado(null);
  };

  const confirmarPresente = async ({ mensagem, forma_pagamento }) => {
  setLoading(true);
  try {
    const token = localStorage.getItem("tokenConvidado");
    if (!token) {
      alert("Você precisa estar logado como convidado para presentear.");
      setLoading(false);
      return;
    }

    const response = await fetch("http://localhost:3000/presenteEscolhido", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id_presente: presenteSelecionado.id,
        mensagem,
        forma_pagamento: forma_pagamento,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Presente escolhido com sucesso!");
      fecharModal();
    } else {
      alert(data.erro || "Erro ao escolher o presente");
    }
  } catch (error) {
    console.error(error);
    alert("Erro na conexão com o servidor");
  } finally {
    setLoading(false);
  }
};


  return (
    <div>
      <h2>Lista de Presentes</h2>
      <PresentesGrade presentes={presentes} onPresentear={handlePresentear} />

      {presenteSelecionado && (
        <ModalPresentear
          presente={presenteSelecionado}
          onClose={fecharModal}
          onConfirm={confirmarPresente}
        />
      )}

      {loading && <p>Carregando...</p>}
    </div>
  );
}
