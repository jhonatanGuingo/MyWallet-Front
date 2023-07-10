import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";


axios.defaults.baseURL = `${import.meta.env.VITE_API_URL}`;

export default function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('')
  const {user, setUser} = useContext(UserContext);

  function signIn(e){
    e.preventDefault();
    const promise = axios.post("/signIn", {
      email: email,
      senha: pass
    });

    promise.then((res) => {
      const {userId, name, token} = res.data
      setUser({userId, name, token});
      localStorage.setItem("user", JSON.stringify({userId, name, token}))
      navigate("/home")
    })

    promise.catch(err => {
      alert(err.response.data);
    })

  }
  return (
    <SingInContainer>
      <form onSubmit={signIn}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" required value = {email} onChange = {e => setEmail(e.target.value)}/>
        <input placeholder="Senha" type="password" autocomplete="new-password" required value = {pass} onChange = {e => setPass(e.target.value)}/>
        <button type="submit">Entrar</button>
      </form>

      <Link to = {`/cadastro`}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
