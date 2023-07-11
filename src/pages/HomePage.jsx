import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Transactions from "../components/Transactions";
import React from "react"
axios.defaults.baseURL = `${import.meta.env.VITE_API_URL}`;

export default function HomePage() {
  const { user, setUser, lsUser } = useContext(UserContext);
  const [soma, setSoma] = useState(0);
  const { userId, token } = user;
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  let positivo = 0;
  let negativo = 0;

  function logOut() {
    localStorage.clear();
    setUser({});
    navigate("/");
  }

  useEffect(() => {
   

    if(localStorage.getItem('user') === null){
      console.log("entrei no if")
      navigate('/')
      return
    }
    const promise = axios.get(
      `/busca-transacao/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    promise.then((res) => setTransactions(res.data));
    
      somar()
  }, [transactions]);

  
  function somar(){
    
    for(let i = 0; i < transactions.length; i++){
      
      if(transactions[i].type === 'entrada'){
        positivo += Number(transactions[i].value)
       
      }else{
        negativo += Number(transactions[i].value)
        
      }
    }
    let somatorio = positivo - negativo;
    setSoma(somatorio);
    
  }
  
  return (
    <HomeContainer>
      <Header>
        <h1 data-test = "user-name">Olá, {user.name} </h1>
        <BiExit data-test = "logout" onClick={logOut} />
      </Header>

      <TransactionsContainer>
        <ul>
          {transactions.length === 0 ? (
            <span> Você ainda não tem transações</span>
          ) : (
            transactions.slice(0).reverse().map((transaction) => (
              <Transactions
                key={transaction._id}
                transaction={transaction}
              />
            ))
          )}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={soma >= 0 ? "entrada" : "saida"} data-test = "total-amount">{soma.toFixed(2).replace(".",",")}</Value>
        </article>
      </TransactionsContainer>

      <ButtonsContainer>
        <button data-test = "new-income" onClick={() => navigate("/nova-transacao/entrada")}>
          <AiOutlinePlusCircle />
          <p>
            Nova <br /> entrada
          </p>
        </button>
        <button data-test = "new-expensive" onClick={() => navigate("/nova-transacao/saida")}>
          <AiOutlineMinusCircle />
          <p>
            Nova <br />
            saída
          </p>
        </button>
      </ButtonsContainer>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`;
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`;
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;

  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`;
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "entrada" ? "green" : "red")};
`;
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`;
