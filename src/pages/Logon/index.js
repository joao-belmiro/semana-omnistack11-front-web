import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom/'
import { FiLogIn } from 'react-icons/fi'
import './styles.css'
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'
import api from '../../services/api.js'
export default function Logon () {
  const [id, setId] = useState('');
  const history = useHistory();
  async function hadleLogon (e) {
    e.preventDefault();
    try {
      const response = await api.post('session',{id})
      localStorage.setItem('ong_name', response.data.name)
      localStorage.setItem('ong_id', id)
      history.push('/profile')
      console.log(`bem vindo ${response.data.name}`)

    } catch (err){
        alert('Falha no login tente novamente')
    }
  }
  return (
    <div className="logon-container">
      <section  className="form">
        <img src={logoImg} alt="logo"/>
        <form onSubmit={hadleLogon}>
        <h1>Faça o Seu Logon</h1>
         <input placeholder="Sua ID"
         value={id}
         onChange={e=>{setId(e.target.value)}}/> 
         <button className="button" type="submit">Entrar</button>
         <Link  className="back-link" to="/register">
          <FiLogIn size={16} color="#E02041"/>
            Faça seu Cadastro
         </Link>
        </form>
      </section>
      <img src={heroesImg} alt="heroes"/>
    </div>   
  )
}