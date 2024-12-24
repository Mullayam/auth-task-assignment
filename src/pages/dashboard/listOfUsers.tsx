import MyImage from '@/components/common/myImage'
import SearchFilter from '@/components/common/searchFilter'
import { useDebounce } from '@/hooks/useDebounce'
import { apiHandlers } from '@/lib/api/handler'
import { __config } from '@/lib/config'
import { AllUserDataType } from '@/types'
import { useLayoutEffect, useState } from 'react'
import toast from 'react-hot-toast'

const ListOfUsers = ({ fetchUserWithId }: { fetchUserWithId: (id: string) => void }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredUsers, setFilteredUsers] = useState<AllUserDataType[]>([])
    const [debouncedValue] = useDebounce(searchTerm, 1500)
    const handleFilterData = async () => {
        try {
            if (searchTerm === '') {
                const { data } = await apiHandlers.searchUser("all")
                if (!data.success) {
                    throw new Error(data.message)
                }
                setFilteredUsers(data.result.data)
                return
            }
            const { data } = await apiHandlers.searchUser(searchTerm)
            if (!data.success) {
                throw new Error(data.message)
            }
            setFilteredUsers(data.result.data)
        } catch (error: any) {
            toast.error(error.message)
        }
    }
    useLayoutEffect(() => {
        handleFilterData()
    }, [debouncedValue])
    return (
        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
            <div className="flex items-center justify-between mb-4">

                <SearchFilter
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
            </div>
            <div className="flow ">
                <ul role="list" className="divide-y h-[400px] overflow-y-auto divide-gray-200 dark:divide-gray-700">
                    {filteredUsers.length > 0 ? filteredUsers.map((user, i) => (
                        <li key={i} className="py-4 sm:py-4 hover:bg-gray-50 dark:hover:bg-gray-50">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <MyImage avatar={user.avatar} name={user.name}/>

                                </div>
                                <div className="flex-1 min-w-0 ms-4">
                                    <p className="text-sm font-medium text-gray-900 truncate  ">
                                        {user.name}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate ">
                                        {user.email}
                                    </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    <button
                                        onClick={
                                            () => fetchUserWithId(user.id.toString())
                                        }
                                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-none text-sm px-5 py-1 text-center me-2 mb-2"
                                    >
                                        View
                                    </button>
                                </div>
                            </div>
                        </li>
                    )) :
                        <div>
                            <p className='text-center'>No User Found with the {searchTerm} term</p>
                        </div>}


                </ul>
            </div>
        </div>

    )
}

export default ListOfUsers