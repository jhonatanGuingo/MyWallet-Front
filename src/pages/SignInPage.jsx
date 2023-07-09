import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"

export default function SignInPage() {
  const navigate = useNavigate();
  return (
    <SingInContainer>
      <form>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" />
        <input placeholder="Senha" type="password" autocomplete="new-password" />
        <button>Entrar</button>
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
