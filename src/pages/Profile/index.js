import React,{useState, useEffect} from 'react'
import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { FiPower,FiTrash2 } from 'react-icons/fi'
import api from '../../services/api.js'
import './styles.css';
export default function Profile () {
  const ongName = localStorage.getItem('ong_name')
  const ongId = localStorage.getItem('ong_id')
  const [incidents, setIncidents] = useState([])
  const history = useHistory();
  useEffect(() => {
    api.get('profile', {
      headers:{
        authorization: ongId
      }
    }).then(response => {
      setIncidents(response.data);
    })
  },[ongId]);
  async function hadleDeleteIncident (id) {
    try {
      await api.delete(`incidents/${id}`,{
        headers:{
          authorization: ongId
        }
      })
      setIncidents(incidents.filter(incident=> incident.id !== id))
    } catch (err){
      alert('Ocorreu algum erro ')
    }
  };
  function logout () {
    localStorage.clear()
    history.push('/')
  }
  return ( 
   <div className="profile-container">
      <header>
  <img src={logoImg} alt="Be The Hero"/><span>Bem Vinda, {ongName}</span>
        <Link className="button" to="/incidents/new">Cadastrar Novo Caso</Link>
        <button onClick={()=> logout()} type="button">
         <FiPower size={18} color="#e02041"/>
        </button>
      </header>
      <h1>Casos Cadastrados</h1>
      <ul>
        {incidents.map(incident =>(
          <li key={incident.id}>
            <strong>Caso : </strong>
            <p>{incident.title}</p>
            <strong>Descição : </strong>
            <p>{incident.description}</p>
            <strong>Valor : </strong>
            <p>{Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL' }).format(incident.value)}</p>
            <button onClick={()=>{ hadleDeleteIncident(incident.id)}} type='button'>
              <FiTrash2 size={20} color="#a8a8b3"/> 
            </button>
            </li>
        ))}
      </ul>
  </div>
  )
}