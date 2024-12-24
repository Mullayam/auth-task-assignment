import { Link, useNavigate, useParams } from "react-router-dom"
import { SubmitHandler } from 'react-hook-form'
import z from 'zod'
import toast from "react-hot-toast"
import { MyForm } from "@/components/myForm"
import { MyFormFields } from "@/types"
import { FIELDS } from "@/data/fields"
import { apiHandlers } from "@/lib/api/handler"
import { useAppDispatch } from "@/hooks/useAppStore"
import { loginUser } from "@/store/slices/auth.actions"
import { setAuthorizationHeader } from "@/lib/api/instance"
import SiteLogo from "../layout/logo"
import { setTitle } from '@/lib/utils';
import React, { useState } from "react"
import SocialSignOption from "./socialSignOption"
import { useUpdatedSearchParams } from "@/hooks/useQueryParams"
import { Spinner } from "@/components/common/spinner"

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})
type ILogin = z.infer<typeof loginSchema>
const Login = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [isSocialEnabled, setIsSocialEnabled] = useState(false)
    const [searchParams, setSearchParams] = useUpdatedSearchParams()
    const params = useParams()
    const [resendEmail, setResendEmail] = useState(false)
    const [currentEmail, setCurrentEmail] = useState<string | null>(null)
    const [isSending, setIsSending] = useState<boolean>(false)
    const fields: MyFormFields[] = [FIELDS.EMAIL, FIELDS.PASSWORD];
    const resendEmailHandler = async () => {
        setIsSending(true)
        try {
            const { data } = await apiHandlers.resendEmail(currentEmail!)
            if (!data.success) {
                toast.error(data.message)
                return
            }
            toast.success(data.message)
            setResendEmail(false)
            setIsSending(false)

        } catch (error: any) {
            if ("response" in error) {
                toast.error(error.response.data.message)
                for (const key in error.response.data.result) {
                    toast.error(error.response.data.result[key])
                }
                return
            }
            toast.error(error.message)
            setIsSending(false)

        }
    }
    const updateStore = (data: any) => {
        dispatch(loginUser(data.result.user, data.result.access_token))
        setAuthorizationHeader(data.result.access_token)
        toast.success(JSON.stringify(data.message))
    }
    const handleSubmit: SubmitHandler<ILogin> = async (input) => {
        try {
            setCurrentEmail(input.email)
            const { data } = await apiHandlers.handleLogin(input)
            if (!data.success) {
                toast.error(data.message)
                if (data.message.trim().toLowerCase() === "Your Account is Not Active,Please Verify Your Email".trim().toLowerCase()) {
                    setResendEmail(true)
                }
                return
            }
            updateStore(data)

        } catch (error: any) {
            if ("response" in error) {
                toast.error(error.response.data.message)
                for (const key in error.response.data.result) {
                    toast.error(error.response.data.result[key])
                }
                return

            }
            toast.error(error.message)

        }
    }
    const handleProviderCallback = async (provider: string, query: string) => {
        try {
            const { data } = await apiHandlers.handleSocialLoginCallback(provider, query)
            if (!data.success) {
                toast.error(data.message)
                return
            }
            updateStore(data)
            setIsSocialEnabled(false)

        } catch (error: any) {
            setIsSocialEnabled(false)
            toast.error(error.message)
            navigate("/login")
        }
    }
    React.useLayoutEffect(() => {
        setTitle("Login")
        if (params.provider === "google") {
            setIsSocialEnabled(true)
            handleProviderCallback(params.provider, searchParams.toString())
        }

    }, [searchParams])


    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            {isSocialEnabled && <Spinner />}
            <div className="container">
                <div>
                    <div className=" shadow rounded mb-6">
                        <div className="grid md:grid-cols-12">
                            <div className="bg-white shadow-md p-12 rounded-s xl:col-span-5 md:col-span-6">
                                <div className="mb-12">
                                    <SiteLogo className="h-12" />
                                </div>
                                <h6 className="text-base/[1.6] font-semibold text-gray-600 mb-0 mt-4">
                                    Welcome back!
                                </h6>
                                <p className="text-gray-500 text-sm/[1.6] mt-1 mb-6">
                                    Enter your email address and password to access admin panel.
                                </p>

                                <MyForm fields={fields} onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <Link
                                            to="/reset-password"
                                            className="float-right text-gray-500 text-xs border-b border-dashed pb-1 ms-1"
                                        >
                                            Forgot your password?
                                        </Link>

                                    </div>
                                    <div className="flex items-center mb-4">
                                        <input
                                            id="remember"
                                            type="checkbox"
                                            className="shrink-0 border-gray-400 rounded text-blue-600"
                                        />
                                        <label
                                            htmlFor="remember"
                                            className="text-xs/none text-gray-700 font-medium ms-3"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                    <div className="mb-0 text-center">
                                        <button
                                            disabled={resendEmail || isSocialEnabled}
                                            className="block border w-full  text-gray-500 font-medium leading-6 text-center align-middle select-none py-2 px-4 text-sm rounded-md transition-all hover:shadow-md"
                                            type="submit"
                                        >
                                            Log In
                                        </button>
                                    </div>
                                </MyForm>
                                <SocialSignOption isSocialEnabled={isSocialEnabled} />


                                {resendEmail && <div
                                    id="alert-additional-content-4"
                                    className="p-4 my-4 text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800"
                                    role="alert"
                                >
                                    <div className="flex items-center">
                                        <svg
                                            className="flex-shrink-0 w-4 h-4 me-2"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                        </svg>
                                        <span className="sr-only">Info</span>
                                        <h3 className="text-lg font-medium">Email Verification</h3>
                                    </div>
                                    <div className="mt-2 mb-4 text-sm">
                                        It Seems Your Account is Not Active,Please Verify Your Email. Click the button below to resend the verification email in case you didn't receive it.
                                    </div>
                                    <div className="flex">
                                        <button
                                            disabled={isSending}
                                            onClick={resendEmailHandler}
                                            className="text-white bg-yellow-800 hover:bg-yellow-900 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-yellow-300 dark:text-gray-800 dark:hover:bg-yellow-400 dark:focus:ring-yellow-800"
                                        >
                                            <svg
                                                className="me-2 h-3 w-3"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 14"
                                            >
                                                <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                                            </svg>
                                            Resend
                                        </button>
                                        <button
                                            onClick={() => setResendEmail(false)}
                                            className="text-yellow-800 bg-transparent border border-yellow-800 hover:bg-yellow-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-gray-800 dark:focus:ring-yellow-800"
                                            data-dismiss-target="#alert-additional-content-4"
                                            aria-label="Close"
                                        >
                                            Dismiss
                                        </button>
                                    </div>
                                </div>
                                }
                            </div>

                            <div className="hidden md:block xl:col-span-7 md:col-span-6">
                                <div className="max-w-[80%] mx-auto">
                                    <div className="my-12 py-12">
                                        <div className="flex items-center justify-center h-full">
                                            <SiteLogo className="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full text-center">
                        <p className="text-gray-500 leading-6 text-base">
                            Don't have an account?{" "}
                            <Link
                                to="/sign-up"
                                className="text-primary font-semibold ms-1"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login