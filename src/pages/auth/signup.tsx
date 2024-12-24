import { Link } from 'react-router-dom';
import { MyFormFields } from "@/types";
import { MyForm } from "@/components/myForm";
import { createField, FIELDS } from "@/data/fields";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import SiteLogo from "../layout/logo";
import { apiHandlers } from "@/lib/api/handler";
import { useState } from "react";
import { CloudUpload, Loader2 } from "lucide-react";
import EmailVerificaton from './email-verificaton';
import { setTitle } from '@/lib/utils';

const Signup = () => {
  const [_, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<{ id: string, email: string } | null>(null);
  const [step, setStep] = useState(1);

  const name = createField("name", "Name")
  const fields: MyFormFields[] = [name, FIELDS.EMAIL, FIELDS.PASSWORD];
  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];

    if (file) {
      setUploadedFile(file);
      const filePreview = URL.createObjectURL(file);
      setPreview(filePreview);
    }
  };
  const handleSubmit: SubmitHandler<any> = async (input) => {
    try {
      if (!uploadedFile) {
        toast.error("User avatar is required")
        return
      }
      setIsUploading(true);

      const formData = new FormData();
      formData.append('file', uploadedFile);

      for (const key in input) {
        formData.append(key, input[key]);
      }
      const { data } = await apiHandlers.handleRegister(formData)
      if (!data.success) {
        toast.error(data.message)
        return
      }
      setCurrentUser(data.result)
      setIsUploading(false);
      toast.success(data.message)
      setStep(2)
    } catch (error: any) {
      setIsUploading(false);
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
  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      setUploadedFile(files[0] as File);
      const filePreview = URL.createObjectURL(files[0]);
      setPreview(filePreview);
    }
  }

  setTitle("Sign Up")

  return step === 2 ? <EmailVerificaton
    email={currentUser!.email as string}
    type="verfication"
  /> :
    <div className="min-h-screen flex items-center justify-center">

      <div className="container">
        <div>
          <div className="bg-white shadow rounded mb-6">
            <div className="grid md:grid-cols-12">
              <div className="bg-white shadow-md p-12 rounded-s xl:col-span-5 md:col-span-6">
                <div className="mb-12">
                  <SiteLogo className="h-12" />
                </div>
                {step === 1 && <>
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
                        disabled={isUploading}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        type="submit"
                      >
                        {isUploading ? <>
                          <Loader2 className="w-4 h-4 inline-block animate-spin" />
                          <span className="ml-2">Registering...</span>
                        </> : "Register"}
                      </button>
                    </div>
                  </MyForm>

                </>}


              </div>
              <div className="md:block xl:col-span-7 md:col-span-6">
                <div className="max-w-[80%] mx-auto">
                  <div className="my-12 py-12">
                    <div className="hidden  md:flex items-center justify-center h-full">
                      <SiteLogo className="" />
                    </div>
                    {preview ?
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="mb-4">
                            <img src={preview} alt="Preview" style={{ maxWidth: "100%", maxHeight: "300px" }} />
                          </div>
                        </div>
                      </div> :
                      <div className="flex flex-col h-[300px] border-2 border-dashed border-gray-400 cursor-pointer"
                       onClick={() => document.getElementById('fileInput')?.click()}
                      onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                        <div className="flex flex-col items-center justify-center h-full">
                          <div className="flex flex-col items-center justify-center">
                            <div className="mb-4">
                              <CloudUpload className="w-24 h-24 text-gray-400" />
                            </div>
                            <p className="text-gray-500 text-sm">Drag and drop your Avatar here</p>
                            <button
                              className="mt-2 text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                              onClick={() => document.getElementById('fileInput')?.click()}
                            >
                              Select Files
                            </button>
                            <input
                              type="file"
                              id="fileInput"
                              accept="image/*"
                              className="hidden"
                              onChange={handleFileInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          {step === 1 &&
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
          }
        </div>
      </div>
    </div>


};

export default Signup;