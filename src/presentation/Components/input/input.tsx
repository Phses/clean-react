import React, { useContext } from 'react'
import Styles from './input-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)
  const error = state[`${props.name}Error`]
  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }
  const getContent = (): string => {
    return '🔴'
  }
  const getStatus = (): string => {
    return error
  }
  return (
    <div className={Styles.inputWrap}>
      <input {...props} data-testid={props.name} onChange={handleChange}/>
      <span title={getStatus()} data-testid={`${props.name}-status`} className={Styles.status}>{getContent()}</span>
    </div>
  )
}

export default Input
