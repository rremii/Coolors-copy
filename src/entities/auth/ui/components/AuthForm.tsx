import React, { FC } from "react"
import styled from "styled-components"

interface props {
  children: React.ReactNode
  onSubmit: () => void
}

export const AuthForm: FC<props> = ({ children, onSubmit }) => {
  return (
    <AuthFormLayout autoComplete="off" onSubmit={onSubmit}>
      {children}
    </AuthFormLayout>
  )
}

const AuthFormLayout = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  gap: 15px;
  margin-top: 24px;
  padding: 0 24px;
  overflow: hidden;
`
