import { useState } from "react";

export default function CadastroEvento() {
    const [form, setForm] = useState({
        nome: '',
        data_evento: '',
        localizacao: '',
        anfitriao: '',
        senha_evento: '',
        data_criacao: '',
    })

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
         
        try{
            const token = localStorage.getItem('token')
            const response = await fetch('http://localhost:3000/evento',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                     Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(form)
            })

            const data = await response.json()

            if(response.ok){
                alert('Evento cadastrado com sucesso!')
                setForm({nome:'', data_evento:'', localizacao:'', anfitriao:'',senha_evento:'',data_criacao:''})
            }else {
                alert(data.erro || 'Erro ao cadastrar evento')
            }
        } catch (err) {
            console.error(err)
            alert('Erro na concexão com o servidor')
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Cadastrar Evento</h2>

            <label>Nome do evento:</label>
            <input name="nome" value={form.nome} onChange={handleChange} required />

            <label>Data do evento:</label>
            <input name="data_evento" type="date" value={form.data_evento} onChange={handleChange} required />

            <label>Local:</label>
            <input name="localizacao" value={form.localizacao} onChange={handleChange} required />

            <label>Nome dos anfitriões:</label>
            <input name="anfitriao" value={form.anfitriao} onChange={handleChange}  />

            <label>Senha do evento:</label>
            <input name="senha_evento" type="password" value={form.senha_evento} onChange={handleChange} required />

            <button type="submit">Cadastrar</button>
        </form>
    )
    
}