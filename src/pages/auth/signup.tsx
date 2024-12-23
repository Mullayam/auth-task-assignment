import { Link } from "react-router-dom";
import { MyFormFields } from "@/types";
import { MyForm } from "@/components/myForm";
import { createField, FIELDS } from "@/data/fields";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import SiteLogo from "../layout/logo";
import { apiHandlers } from "@/lib/api/handler";

const Signup = () => {
  const name = createField("name","Name",)
  const fields: MyFormFields[] = [name, FIELDS.EMAIL, FIELDS.PASSWORD];

  const handleSubmit: SubmitHandler<any> = async (input) => {
    try {
      const { data } = await apiHandlers.handleRegister(input)
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="container">
        <div>
          <div className="bg-white shadow rounded mb-6">
            <div className="grid md:grid-cols-12">
              <div className="bg-white shadow-md p-12 rounded-s xl:col-span-5 md:col-span-6">
                <div className="mb-12">
                  <SiteLogo className="h-12" />

                </div>
                <h6 className="text-base/[1.6] font-semibold text-gray-600 mb-0 mt-4">
                  Create Your Account
                </h6>
                <p className="text-gray-500 text-sm/[1.6] mt-1 mb-6">
                  Don't have an account? Create your account, it takes less than a
                  minute.
                </p>
                <MyForm
                  fields={fields}
                  onSubmit={handleSubmit}
                >
                  <div className="mb-0 text-center">
                    <button
                      className="block border w-full  text-gray-500 font-medium leading-6 text-center align-middle select-none py-2 px-4 text-sm rounded-md transition-all hover:shadow-md"
                      type="submit"
                    >
                      Register
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
              Already have an account?{" "}
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

  );
};

export default Signup;