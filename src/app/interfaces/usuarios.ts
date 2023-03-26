export interface Usuarios {
    nombre: string,
    apellido: string,
    correo: string,
    contrasena: string
}

export interface Datos {
    nombre:  string,
    correo: string
}

export interface Password {
    contrasena: string
}

export interface userResponse {
    rows: any[]
}