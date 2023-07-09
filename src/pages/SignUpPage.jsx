import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { ThreeDots } from "react-loader-spinner";


export default function SignUpPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const {user, setUser} = useContext(UserContext);
  const [load, setLoad] = useState(false);

  function signUp(e){
    e.preventDefault();
    setLoad(true);

    if(pass != confirmPass) {
      alert("As senhas devem ser iguais")
      setLoad(false);
      return 
    }

    const promise = axios.post('http://localhost:5000/cadastro', {
      name: name,
      email: email,
      senha: pass
    } )

    promise.then (res => {
      navigate("/")
    })

    promise.catch (err => {
      alert(err.response.data)
      setLoad(false)
    })
  }
  return (
    <SingUpContainer>
      <form onSubmit={signUp}>
        <MyWalletLogo />
        <input disabled = {load} placeholder="Nome" required value = {name} onChange = {e => setName(e.target.value)} type="text" />
        <input disabled = {load} placeholder="E-mail" required type="email" value = {email} onChange = {e => setEmail(e.target.value)} />
        <input disabled = {load} placeholder="Senha" required type="password" value = {pass} onChange = {e => setPass(e.target.value)} autocomplete="new-password" />
        <input disabled = {load} placeholder="Confirme a senha" required type="password" value = {confirmPass} onChange = {e => setConfirmPass(e.target.value)} autocomplete="new-password" />
        <button disabled = {load} type="submit"> {load ? (<ThreeDots
         height="40"
         width="40"
         radius="9"
         color="#FFFFFF"
         ariaLabel="loading"
         wrapperStyle
         wrapperClass/>

        ) :  ("Cadastrar")} 
        </button>
      </form>

      <Link to = {`/`}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
