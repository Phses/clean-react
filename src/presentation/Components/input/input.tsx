import React, { useContext } from 'react'
import Styles from './input-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { errorState } = useContext(Context)
  const error = errorState[props.name]
  const getContent = (): string => {
    return '🔴'
  }
  const getStatus = (): string => {
    return error
  }
  return (
    <div className={Styles.inputWrap}>
      <input {...props}/>
      <span title={getStatus()} data-testid={`${props.name}-status`} className={Styles.status}>{getContent()}</span>
    </div>
  )
}

export default Input
