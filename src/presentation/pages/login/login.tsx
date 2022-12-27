import React from 'react'
import Styles from './login-styles.scss'
import Spinner from '@/presentation/Components/spinner/spinner'
import Header from '@/presentation/Components/header/header'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <Header />
      <div className={Styles.form}>
        <h2>Login</h2>
        <div className={Styles.inputWrap}>
          <input type="email" name="email" placeholder="Digite seu email"/>
          <span className={Styles.status}>🔴</span>
        </div>
        <div className={Styles.inputWrap}>
        <input type="password" name="password" placeholder="Digite sua senha"/>
          <span className={Styles.status}>🔴</span>
        </div>
        <button type="submit" className={Styles.submit}>Entrar</button>
        <span className={Styles.link}>Criar conta</span>
        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner}/>
          <span className={Styles.error}>Erro</span>
        </div>
      </div>
      <div className={Styles.footer} />
    </div>
  )
}

export default Login
