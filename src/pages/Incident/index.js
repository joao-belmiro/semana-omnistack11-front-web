import React,{ useState } from 'react'
import { Link,useHistory } from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'
import api from '../../services/api.js'
import './styles.css'
export default function Incident () {
  const [title ,setTile] = useState('');
  const [description ,setDescription] = useState('');
  const [value ,setValue] = useState('');
  const ongId = localStorage.getItem('ong_id')
  const history = useHistory();
  async function saveIncident (e){
    e.preventDefault();
    try { 
      const data = {
        title,
        description,
        value
      }
      await api.post('incidents',data,{
        headers:{
          authorization:ongId
        }
      })
      alert('salvo com sucesso')
      history.push('/profile')
    } catch (err){
      alert('Ocorreu algum erro')
    }
  }
  return (
    <div className="incident-container">
    <div className="content">
    <section>
    <img src={logoImg} alt="logo"/>
     <h1>Cadastrar Novo Caso</h1>
     <p>Descrva o caso detalhadamente para encontrar um herói par resolver isso.</p>
     <Link className="back-link" to="/profile">
       <FiArrowLeft size={16} color="#E02041"/>
       Voltar para Home
    </Link>
    </section>
    <form onSubmit={saveIncident}>
      <input 
      placeholder="Título"
      value={title}
      onChange={e=> setTile(e.target.value)}/>
      <textarea 
      placeholder="Descrição"
      value={description}
      onChange={e=> setDescription(e.target.value)}/>
      <input placeholder="Valor Em Reais"
       value={value}
       onChange={e=> setValue(e.target.value)}/>
      <button className="button" type="submit">Cadastrar</button>
    </form>
    </div>
    </div>
  )  

}