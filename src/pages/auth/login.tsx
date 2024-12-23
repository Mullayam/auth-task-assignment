import { Link } from "react-router-dom"
import { SubmitHandler } from 'react-hook-form'
import TestLogo from "@/assets/Logo-Test.png"
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
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})
type ILogin = z.infer<typeof loginSchema>
const Login = () => {
    const dispatch = useAppDispatch()
    const fields: MyFormFields[] = [FIELDS.EMAIL, FIELDS.PASSWORD];

    const handleSubmit: SubmitHandler<ILogin> = async (input) => {
        try {
            const { data } = await apiHandlers.handleLogin(input)
            if (!data.success) {
                toast.error(data.message)
                return

            }
            dispatch(loginUser(data.result.user, data.result.access_token))
            setAuthorizationHeader(data.result.access_token)
            toast.success(JSON.stringify(data.message))

        } catch (error: any) {
            if ("response" in error) {
                toast.error(error.response.data.message)
                for (const key in error.response.data.errors) {
                 toast.error(error.response.data.errors[key])  
                }
                return
       
             }
            toast.error(error.message)

        }
    }




    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
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
                                            className="block border w-full  text-gray-500 font-medium leading-6 text-center align-middle select-none py-2 px-4 text-sm rounded-md transition-all hover:shadow-md"
                                            type="submit"
                                        >
                                            Log In
                                        </button>
                                    </div>
                                </MyForm>

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