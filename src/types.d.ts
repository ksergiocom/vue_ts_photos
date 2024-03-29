import {FieldValue} from 'firebase/firestore'

export type Photo = {
    id?:string
    nombreOriginal?: string
    nombreNuevo?: string
    filePath?: string
    ancho?: string
    alto?: string
    orientacion?: 'horizontal'|'vertical'
    pesoNuevo?: number
    fechaSubida?: FieldValue
    borrada?: boolean
    urlPublica?: string
    aspectRatio?: '16/9'|'9/16'
}

export type Folder = {
    id?:string;
    authorizedUsersId?:string[];
    users?:UserData[];
}


export interface UserData {
    id:string;
    fechaRegistro:Date;
    admin: boolean;
    email:string;
}

export interface NewUserData {
    email:string;
    password:string;
}

export interface Snackbar {
    color: 'green' | 'blue' | 'red'
    text: string
  }