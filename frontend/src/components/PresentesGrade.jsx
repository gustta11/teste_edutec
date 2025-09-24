import './PresentesGrade.css';

export default function PresentesGrade({ presentes, onPresentear }) {
  return (
    <div className="grade-container">
        
      {presentes.map((presente) => {
 

  return (
    <div className="presente-card" key={presente.id}>
      <img
        src={`http://localhost:3000/uploads/${presente.imagem}`}
        alt={presente.nome}
        className="presente-imagem"
      />
      <h4>{presente.nome}</h4>
      <p>Preço: R$ {parseFloat(presente.preco).toFixed(2)}</p>
      <button onClick={() => onPresentear(presente)}>Presentear</button>
    </div>
  );
})}
    </div>
  );
}
