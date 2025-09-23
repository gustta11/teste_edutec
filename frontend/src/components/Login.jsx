import { useState } from "react";

export default function Login(){
    const [cpf, setCpf] = useState('')
    const [senha, setSenha] = useState('')

    const handleSubmit = async (e) =>{
        e.preventDefault()

        try{
            const response = await fetch ('http://localhost:3000/usuarioAdmin/login',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({cpf,senha})
        })
            const data = await response.json()

            localStorage.setItem('token', data.token)

            if(response.ok){
                alert(`Seja bem-vindo ${data.nome}`)
            }else{
                alert('Falha no login:' + (data.message || 'Dados incorretos'))
            }
        } catch (error) {
            alert('Erro ao conectar com o servidor')
            console.log(error)
        }
    }

    return (
    <form onSubmit={handleSubmit}>
        <div>
            <label>CPF:</label>
            <input type="text" value={cpf} onChange={(e)=> setCpf(e.target.value)} placeholder="Digite seu CPF" required/>
        </div>

        <div>
            <label>Senha:</label>
            <input type="password" value={senha} onChange={(e)=> setSenha(e.target.value)} placeholder="Digite sua senha" required />
        </div>

        <button type="submit">Entrar</button>
    </form>
)

}


