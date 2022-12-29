import React, { useState } from 'react'
import Styles from './login-styles.scss'
import { Header, Input, Footer, FormStatus } from '@/presentation/Components'
import Context from '@/presentation/contexts/form/form-context'

type statusProps = {
  isLoading: boolean
  errorMessage: string
}
const Login: React.FC = () => {
  const status = useState<statusProps>({
    isLoading: false,
    errorMessage: ''
  })
  return (
    <div className={Styles.login}>
      <Header />
      <Context.Provider value={status}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu email" />
          <Input type="password" name="password" placeholder="Digite sua senha"/>
          <button type="submit" className={Styles.submit}>Entrar</button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
