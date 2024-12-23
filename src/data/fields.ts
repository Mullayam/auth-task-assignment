import { FieldKeys, InputFieldTypes, MyFormFields } from "@/types"
import { sentenceCase } from "change-case"
import { RegisterOptions } from 'react-hook-form'
export const FIELDS: Record<FieldKeys, MyFormFields> = {
    EMAIL: {
        name: "email",
        label: "Email",
        type: "email",
        validation: {
            required: "Email is required",
            pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
            },
        },
    },
    PASSWORD: {
        name: "password",
        label: "Password",
        type: "password",
        validation: {
            required: "Password is required",
            minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
            },
        },
    },
}
// Overload signatures
export function createField(
    fieldName: string,
    type: InputFieldTypes,
    customName?: string,
    validations?: RegisterOptions
): MyFormFields;

export function createField(
    fieldName: string,
    customName?: string,
    validations?: RegisterOptions
): MyFormFields;

export function createField(
    fieldName: string,
    arg2?: InputFieldTypes | string,
    arg3?: string | RegisterOptions,
    arg4?: RegisterOptions
): MyFormFields {
    const type = (typeof arg2 === "string" && arg2 !== "text" ? arg2 : "text") as InputFieldTypes;
    const validations = (typeof arg4 === "object" ? arg4 : arg3) as RegisterOptions;
    const label = sentenceCase(fieldName);
    return {
        name: fieldName,
        label,
        type,
        validation: {
            required: `${label} is required`,
            ...validations,
        },
    };
}


