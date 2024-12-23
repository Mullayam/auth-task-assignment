import { Link } from "react-router-dom"
import SiteLogo from "../layout/logo"
import { MyForm } from "@/components/myForm"
import { SubmitHandler } from "react-hook-form";
import { FIELDS } from "@/data/fields";
import { MyFormFields } from "@/types";
import toast from "react-hot-toast";
import { apiHandlers } from "@/lib/api/handler";

const PasswordReset = () => {
  const fields: MyFormFields[] = [FIELDS.EMAIL,];
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

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="container">
        <div>
          <div className="lg:w-1/2 mx-auto mb-6">
            <div className="bg-white shadow-md p-12 rounded-s col-span-6">
              <div className="mb-12 text-center">
                <SiteLogo className="h-24" />
              </div>
              <h6 className="text-base/[1.6] font-semibold text-gray-600 mb-0 mt-4">
                Reset Password
              </h6>
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
              </MyForm>
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