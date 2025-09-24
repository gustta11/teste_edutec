import { useEffect, useState } from "react";

import './Relatorio.css'

export default function Relatorios() {
  const [convidados, setConvidados] = useState([]);
  const [presentesEscolhidos, setPresentesEscolhidos] = useState([]);
  const [totalPresentes, setTotalPresentes] = useState(null);
  const [categoriaMais, setCategoriaMais] = useState(null);
  const [presentesNaoEscolhidos, setPresentesNaoEscolhidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelatorios = async () => {
      try {
        const [
          convidadosRes,
          presentesRes,
          totalRes,
          categoriaRes,
          naoEscolhidosRes,
        ] = await Promise.all([
          fetch("http://localhost:3000/relatorios/presenteSelecionados"),
          fetch("http://localhost:3000/relatorios/listaPresenteConvidado"),
          fetch("http://localhost:3000/relatorios/totalPresente"),
          fetch("http://localhost:3000/relatorios/categoriasMaisEscolhida"),
          fetch("http://localhost:3000/relatorios/presentesNaoEscolhido"),
        ]);

        if (
          !convidadosRes.ok ||
          !presentesRes.ok ||
          !totalRes.ok ||
          !categoriaRes.ok ||
          !naoEscolhidosRes.ok
        ) {
          throw new Error("Erro ao buscar dados dos relatórios");
        }

        const convidadosData = await convidadosRes.json();
        const presentesData = await presentesRes.json();
        const totalData = await totalRes.json();
        const categoriaData = await categoriaRes.json();
        const naoEscolhidosData = await naoEscolhidosRes.json();

        setConvidados(convidadosData);
        setPresentesEscolhidos(presentesData);
        setTotalPresentes(totalData[0].Total);
        setCategoriaMais(categoriaData);
        setPresentesNaoEscolhidos(naoEscolhidosData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatorios();
  }, []);

  if (loading) return <p>Carregando relatórios...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="div-relatorio">
      <h2>Relatórios</h2>

      <section>
        <h3>Convidados com presentes escolhidos</h3>
        <ul>
          {convidados.map((c, i) => (
            <li key={i}>{c.nome}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Lista de presentes escolhidos</h3>
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Convidado</th>
              <th>Presente</th>
              <th>Forma de pagamento</th>
            </tr>
          </thead>
          <tbody>
            {presentesEscolhidos.map((item, i) => (
              <tr key={i}>
                <td>{item.nome}</td>
                <td>{item.nome_presente}</td>
                <td>{item.forma_pagamento}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h3>Total de presentes escolhidos</h3>
        <p>{totalPresentes}</p>
      </section>

      <section>
        <h3>Categoria mais escolhida</h3>
        <p>
           {categoriaMais.map((categoria, index) => (
        <p key={index}>
        {categoria.nome_categoria} ({categoria.Quantidade})
        </p>
        ))}
        </p>
      </section>

      <section>
        <h3>Presentes não escolhidos</h3>
        <ul>
          {presentesNaoEscolhidos.length > 0 ? (
            presentesNaoEscolhidos.map((p, i) => <li key={i}>{p.nome}</li>)
          ) : (
            <p>Todos os presentes foram escolhidos</p>
          )}
        </ul>
      </section>
    </div>
  );
}
