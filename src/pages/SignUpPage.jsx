import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { ThreeDots } from "react-loader-spinner";

axios.defaults.baseURL = `${import.meta.env.VITE_API_URL}`;

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

    const promise = axios.post('/cadastro', {
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
        <input disabled = {load} data-test = "name" placeholder="Nome" required value = {name} onChange = {e => setName(e.target.value)} type="text" />
        <input disabled = {load} data-test = "email" placeholder="E-mail" required type="email" value = {email} onChange = {e => setEmail(e.target.value)} />
        <input disabled = {load} data-test = "password" placeholder="Senha" required type="password" value = {pass} onChange = {e => setPass(e.target.value)} autocomplete="new-password" />
        <input disabled = {load} data-test = "conf-password" placeholder="Confirme a senha" required type="password" value = {confirmPass} onChange = {e => setConfirmPass(e.target.value)} autocomplete="new-password" />
        <button disabled = {load} data-test = "sign-up-submit" type="submit"> {load ? (<ThreeDots
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
