import { useEffect, useState } from 'react';
import './ListaPresentesEscolhidos.css'

export default function ListaPresentesEscolhidos() {
  const [presentesEscolhidos, setPresentesEscolhidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPresentesEscolhidos = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/relatorios/listaPresenteConvidado');
        if (!response.ok) {
          throw new Error('Erro ao buscar presentes escolhidos');
        }
        const data = await response.json();
        setPresentesEscolhidos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

  
    fetchPresentesEscolhidos();
  }, []);
  console.log(presentesEscolhidos)

  if (loading) return <p>Carregando presentes escolhidos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='div-listaPresentes'>
      <h2>Presentes Escolhidos</h2>
      {presentesEscolhidos.length === 0 ? (
        <p>Nenhum presente escolhido ainda.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Convidado</th>
              <th>Presente</th>
              <th>Forma de Pagamento</th>
            </tr>
          </thead>
          <tbody>
           {presentesEscolhidos.map((item) => {
  console.log('Item presente escolhido:', item); // 👈 Aqui está o log

  return (
    <tr key={item.id}>
      <td>{item.nome}</td>
      <td>{item.nome_presente}</td>
      <td>{item.forma_pagamento}</td>
    </tr>
  );
})}
          </tbody>
        </table>
      )}
    </div>
  );
}
