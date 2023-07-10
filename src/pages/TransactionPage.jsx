import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

export default function TransactionsPage(props) {
  const {tipo} = useParams();
  const {user} = useContext(UserContext);
  const {token, userId} = user;
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const navigate =useNavigate();

  axios.defaults.baseURL = `${import.meta.env.VITE_API_URL}`;

  const headers = {
    headers: {Authorization: `Bearer ${token}`}
  }

  const body = {
    userId: userId, 
    value: value,
    description: description
  }
  function sendTransaction(e){
    e.preventDefault();
    const promise = axios.post(`/nova-transacao/${tipo}`,body , headers )

    promise.then (res => {
      navigate('/home');
    })

    promise.catch (err => {
      alert(err.response.data)
    })

  }
  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={sendTransaction}>
        <input data-test = "registry-amount-input" placeholder="Valor" type="text" required value = {value} onChange={e => setValue(e.target.value)} />
        <input data-test = "registry-name-input" placeholder="Descrição" type="text" required value = {description} onChange={e => setDescription(e.target.value)} />
        <button data-test = "registry-save" type="submit">Salvar {tipo}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
