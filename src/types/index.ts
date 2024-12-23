/* eslint-disable @typescript-eslint/no-explicit-any */
export type InputFieldTypes = "text" | "email" | "password" | "number";
export type FieldKeys = "EMAIL" | "PASSWORD"
export interface MyFormFields {
    name: string;
    label: string;
    type: InputFieldTypes;
    validation?: object;
}
export type IAction = {
    type: string;
    payload?: any;
}
export enum ERole {
    ADMIN = "ADMIN",
    USER = "USER"
}
export type IUser = {
    uid: string;
    email: string;
    name: string;
    role: ERole;
    avatar: string;
}
export interface AllUserDataType {
    id: number
    name: string
    email: string
    role: string
    avatar: any
    is_email_verified: boolean
    email_verification_token: string
    email_verification_token_expiry: string
    email_verified_at: any
    password_reset_token: any
    password_reset_token_expiry: string
    password_reset_at: any
    status: string
    deleted_at: any
    createdAt: string
    updatedAt: string
}
