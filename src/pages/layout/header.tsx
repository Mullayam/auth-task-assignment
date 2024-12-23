import React from 'react'
import SiteLogo from './logo'
import { Link, useNavigate } from 'react-router-dom'
import { UserDropdown } from './userDropdown'
import { SettingOutlined } from '@ant-design/icons';
import { notification, type MenuProps } from 'antd';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppStore';
import { apiHandlers } from '@/lib/api/handler';
import { useOpenNotification } from '@/hooks/useToast';
import { logoutUser } from '@/store/slices/auth.actions';
import toast from 'react-hot-toast';
const Header = ({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const { user } = useAppSelector(x => x.auth);
    const dispatch = useAppDispatch()

    const notify = useOpenNotification()
    const navigate = useNavigate()
    const items: MenuProps['items'] = [

        {
            key: '1',
            label: 'Logout',
            icon: <SettingOutlined />,
            extra: '⌘S',
        },
    ];
    const handleLogout = async () => {
        try {
            const res = await apiHandlers.handleLogout()
            if (!res.data.success) {
                throw new Error(res.data.message)
            }
            setOpen(false);
            dispatch(logoutUser())
            toast.success('Logged out successfully')
            return navigate('/login')
        } catch (error) {

        }

    }
    const handleMenuClick: MenuProps['onClick'] = (e) => {
        if (e.key === '1') {
            handleLogout()
        }
    };
    return (
        <header className="fixed z-30 w-full bg-transparent border-b border-gray-200 transition-colors duration-300 dark:border-gray-700 lg:border-b backdrop-blur dark:bg-transparent">
            <div className="mx-auto flex flex-wrap items-center justify-between ">
                <div className="w-full p-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <button onClick={() => setOpen(!open)} className="mr-3 cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-600 hover:text-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:inline">
                                <svg
                                    aria-hidden="true"
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                            <SiteLogo className='h-8' />
                            <div className="ml-16 hidden md:block">
                                <div className="flex items-center px-4">

                                    
                                </div>
                            </div>
                            <span className=" dark:text-white text-slate-800 ">

                            </span>
                        </div>
                        <div className="flex items-center lg:gap-3 ">
                            <div className="ml-4 flex items-center md:ml-6">
                                <small className='hidden md:block mx-2'>{user?.name}</small>
                                <UserDropdown items={items} handleMenuClick={handleMenuClick}>

                                    <button
                                        className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"

                                    >

                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                                            alt=""
                                        />
                                    </button>

                                </UserDropdown>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

    )
}

export default Header