
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginConvidado() {
  const [cpf, setCpf] = useState('');
  const [senhaEvento, setSenhaEvento] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      
      const response = await fetch('http://localhost:3000/convidado/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,           
        },
        body: JSON.stringify({ cpf, senha_evento: senhaEvento }),
      });

      const data = await response.json();

       localStorage.setItem('tokenConvidado', data.token)

      if (data.status === "Complete") {
        console.log("Cadastro completo")
        
      } else if (data.status === "Cadastro não completo") {
        navigate('/cadastroConvidado');
      }else{
        alert(data.erro || "Falha no login")
      }
    } catch (err) {
      console.error(err);
      alert('Erro na conexão com o servidor');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login de Convidado</h2>
      <input
        type="text"
        placeholder="CPF"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha do Evento"
        value={senhaEvento}
        onChange={(e) => setSenhaEvento(e.target.value)}
        required
      />
      <button type="submit">Entrar</button>
    </form>
  );
}
