import { useEffect, useState } from "react";

export default function CadastroPresente (){
    const [form, setForm] = useState({
        nome: '',
        preco: '',
        limite_maximo: '',
        data_criacao: '',
        id_evento: '',
        id_categoria: '',
        id_pagamento: '',
    })

    const [eventos, setEventos] = useState([])

    useEffect(()=>{

        const fecthEventos = async () =>{
            const token = localStorage.getItem('token')

            try{
                const response = await fetch("http://localhost:3000/evento/admin", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                const data = await response.json()
                setEventos(data)
            } catch (err) {
                console.error("Erro ao buscar eventos", err)
            }
        }

        

        fecthEventos()
    }, [])

    const [imagem, setImagem] = useState(null)

    const handleChange = (e) =>{
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleImagemChange = (e) =>{
        setImagem(e.target.files[0])
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()

        const formData = new FormData()
        formData.append('nome',form.nome)
        formData.append('preco',form.preco)
        formData.append('limite_maximo',form.limite_maximo)
        formData.append('data_criacao',form.data_criacao)
        formData.append('id_evento', form.id_evento)
        formData.append('id_categoria',form.id_categoria)
        formData.append('id_pagamento',form.id_pagamento)
        if(imagem){
            formData.append('imagem',imagem)
        }

        try{
            const token = localStorage.getItem('token')
            const response = await fetch('http://localhost:3000/presente',{
                method: 'POST',
                headers:{
                    Authorization: `Bearer ${token}`
                },
                body: formData
        })
            const data = await response.json()

            if(response.ok){
                alert('Presente cadastrado com sucesso!')
                setForm({nome:'', preco:'', limite_maximo:'',data_criacao:'',id_categoria:'',id_pagamento:''})
                setImagem(null)
            }else {
                alert(data.erro || 'Erro ao cadastrar presente')
            }
        } catch (err) {
                console.error(err)
                alert('Erro na concexão com o servidor')
        }
    }

     return(
        <div>
            <h2>Cadastro de Presente</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                    <select
                    name="id_evento"
                    value={form.id_evento}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione o evento</option>
                    {eventos.map((evento)=>{
                        return(
                        <option key = {evento.id} value={evento.id}>
                             {evento.nome}
                        </option>
                        )
                    })}
                </select>

                <select
                    name="id_categoria"
                    value={form.id_categoria}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione a categoria</option>
                    <option value="2">Acessório</option>
                    <option value="3">Casa</option>
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

                <button type="submit">Cadastrar Presente</button>
            </form>

           
        </div>
    )
    
}