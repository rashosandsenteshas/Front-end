export interface SendCode  {
    numero: string
}

export interface VerifyCode {
    codigo: string
}

export interface PasswordReset {
    correo: string,
    contrasena: string
}