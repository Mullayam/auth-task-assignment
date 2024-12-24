import { Link, useNavigate, useSearchParams } from "react-router-dom"
import SiteLogo from "../layout/logo"
import { MyForm } from "@/components/myForm"
import { SubmitHandler } from "react-hook-form";
import { FIELDS } from "@/data/fields";
import { MyFormFields } from "@/types";
import toast from "react-hot-toast";
import { apiHandlers } from "@/lib/api/handler";
import { useCallback, useLayoutEffect, useState } from "react";
import qs from 'qs';
import { PasswordResetScreen } from "./password-reset-form";
import { setTitle } from '@/lib/utils';

const PasswordReset = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [displayForm, setDisplayForm] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [status, setStatus] = useState<{
    message: string
    is_active: boolean
  } | null>(null)
  const fields: MyFormFields[] = [FIELDS.EMAIL];

  /**
   * Handles the submission of the password reset form.
   *
   * @param {{ email: string }} input - The form input
   *
   * @returns {Promise<void>}
   */
  const handleSubmit: SubmitHandler<{ email: string }> = async (input) => {
    try {
      const { data } = await apiHandlers.sendResetPasswordInstructions(input)
      if (!data.success) {
        toast.error(data.message)
        return

      }

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
  const verifyToken = useCallback(async (token: string) => {
    setIsLoading(true)
    try {
      const res = await apiHandlers.checkToken(qs.stringify({ token, type: 'reset' }))
      setStatus({
        message: res.data.message,
        is_active: res.data.success
      })
      setIsLoading(false)
      return
    } catch (error: any) {
      setIsLoading(false)
      setStatus({
        message: error.response.data.message,
        is_active: false
      })
    }
  }, [])
  /**
   * Submits the password reset form data to the server.
   *
   * @param {Object} values - The form input values.
   * @param {string} values.email - The user's email address.
   * @param {string} values.password - The new password.
   * @param {string} values.confirm_password - Confirmation of the new password.
   *
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   *
   * Displays a success message and navigates to the login page if the password reset is successful.
   * Displays an error message if the operation fails.
   */

  const handleSubmitForm = async (values: { email: string, password: string, confirm_password: string }) => {
    try {
      const { data } = await apiHandlers.resetPassword(values, searchParams.get('token') as string)
      if (!data.success) {
        throw new Error(data.message)
      }
      toast.success(data.message)
      navigate('/login')
    } catch (error: any) {
      setStatus({
        message: error.response.data.message,
        is_active: false
      })
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
  useLayoutEffect(() => {
     setTitle("Reset Password")
    if ((searchParams.has('token') && (searchParams.get('token') as string).trim() !== '') && searchParams.has('email') && (searchParams.get('email') as string).trim() !== '') {
      setDisplayForm(true)
    }
    verifyToken(searchParams.get('token') as string)

  }, [searchParams])
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="container">
        <div>
          <div className="lg:w-1/2 mx-auto mb-6">
            <div className="bg-white shadow-md p-12 rounded-s col-span-6">
              <div className="mb-12 text-center">
                <SiteLogo className="h-24" />
              </div>
              {
                displayForm ? status?.is_active ? <PasswordResetScreen email={searchParams.get('email') as string} handleSubmitForm={handleSubmitForm} /> : <>
                  <div className="w-full text-center">
                    <h2 className=" font-bold text-lg text-red-600 mt-1 mb-6">{status?.message}</h2>
                  </div>
                </> : (
                  <>

                    <p className="text-gray-500 text-sm/[1.6] mt-1 mb-6">
                      Enter your email address and we'll send you an email with
                      instructions to reset your password.
                    </p>
                    <MyForm fields={fields} onSubmit={handleSubmit}>
                      <div className="mb-0 text-center">
                        <button
                          className="block border w-full  text-gray-500 font-medium leading-6 text-center align-middle select-none py-2 px-4 text-sm rounded-md transition-all hover:shadow-md"
                          type="submit"
                        >
                          Send Reset Instructions
                        </button>
                      </div>
                    </MyForm></>

                )
              }

            </div>
          </div>
          <div className="w-full text-center">
            <p className="text-gray-500 leading-6 text-base">
              Back to{" "}
              <Link
                to="/login"
                className="text-primary font-semibold ms-1"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PasswordReset 