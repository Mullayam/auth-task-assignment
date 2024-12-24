import MyImage from '@/components/common/myImage'
import { useAppSelector } from '@/hooks/useAppStore'
import { apiHandlers } from '@/lib/api/handler'
import { __config } from '@/lib/config'
import moment from 'moment'
import toast from 'react-hot-toast'



const UserProfileCard = ({ user }: { user: any }) => {
  const { user: currentUser } = useAppSelector(x => x.auth)

  const handleDelete = async () => {
    try {
      const { data } = await apiHandlers.deleteUser(+user?.uid || user?.id)
      if (!data.success) {
        throw new Error(data.message)
      }
      toast.success(data.message)
    } catch (error: any) {
      toast.error(error.message)

    }
  }
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow ">

      <div className="flex flex-col items-center pb-10">
        <MyImage className="w-48 h-48 my-3 rounded-full shadow-lg" avatar={user?.avatar} name={user?.name} />
        <h1 className=" text-2xl font-semibold text-gray-800">
          {user?.name}
        </h1>
        <h2 className="text-sm text-gray-500 dark:text-gray-400">
          {user?.email}
        </h2>
        <div className="flex mt-4 md:my-6">
          {
            currentUser?.uid.toString() === (user?.uid || user?.id).toString() && (<>

              <button
                onClick={handleDelete}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Delete My Account
              </button>
              <button

                className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Edit
              </button>
            </>)

          }

        </div>
        <div className="flex flex-col items-center gap-2">
          <span>  UserRole:  {user?.role.toLocaleUpperCase() === 'admin' ? <span className="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded  ">
            {user?.role.toLocaleUpperCase()}
          </span> : <span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
            {user?.role.toLocaleUpperCase()}
          </span>}
          </span>
          {user?.createdAt && <span>  Is Email Verified:  {user?.is_email_verified ? <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded">
            Verified
          </span> : <span className="bg-red-100 text-red-600 text-sm font-medium me-2 px-2.5 py-0.5 rounded ">
            Not Verified
          </span>}</span>}
          {user?.createdAt && <span>  Registered At: {moment(user?.createdAt).format('lll')} </span>}
          {user?.updatedAt && <span>  Last Profile Updated At: {moment(user?.updatedAt).format('lll')}</span>}
        </div>
      </div>
    </div>

  )
}

export default UserProfileCard