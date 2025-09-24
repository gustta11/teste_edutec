// src/components/ModalPresentear.jsx
import React, { useState } from "react";
import "./ModalPresentear.css";

export default function ModalPresentear({ presente, onClose, onConfirm }) {
  const [mensagem, setMensagem] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");

  const handleSubmit = () => {
    if (!formaPagamento) {
      alert("Escolha uma forma de pagamento.");
      return;
    }

    const dados = {
      mensagem,
      forma_pagamento: formaPagamento,
      id_presente: presente.id,
    };
    console.log(dados)

    onConfirm(dados);
    setMensagem("");
    setFormaPagamento();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Presentear: {presente.nome}</h2>

        <label htmlFor="mensagem">Mensagem para o anfitrião:</label>
        <textarea
          id="mensagem"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          placeholder="Escreva sua mensagem"
        />

        <label htmlFor="formaPagamento">Forma de pagamento:</label>
        <select
          id="formaPagamento"
          value={formaPagamento}
          onChange={(e) => setFormaPagamento(e.target.value)}
        >
          <option value="">Selecione</option>
          <option value="Pix">Pix</option>
          <option value="Cartão">Cartão de Crédito</option>
        </select>

        <div className="modal-buttons">
          <button onClick={handleSubmit}>Confirmar</button>
          <button className="cancel-btn" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
