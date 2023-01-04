import React from 'react'
import { render, RenderResult, cleanup, fireEvent } from '@testing-library/react'
import Login from './login'
import { validation } from '@/presentation/protocols/validation'

type sutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

class ValidationSpy implements validation {
  errorMessage: string
  input: object
  validation (input: object): string {
    this.input = input
    return this.errorMessage
  }
}

const makeSut = (): sutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={ validationSpy }/>)
  return {
    sut,
    validationSpy
  }
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should render with initial state', () => {
    const { sut } = makeSut()
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Campo obrigatorio')
    expect(emailStatus.textContent).toBe('🔴')
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Campo obrigatorio')
    expect(passwordStatus.textContent).toBe('🔴')
  })
  test('Shold call validation with correct value', () => {
    const { sut, validationSpy } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: 'anyEmail' } })
    expect(validationSpy.input).toEqual({
      email: 'anyEmail'
    })
  })
})
