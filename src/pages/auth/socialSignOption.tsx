import { Icons } from '@/components/icons'
import { apiHandlers } from '@/lib/api/handler'
import React from 'react'
import toast from 'react-hot-toast'

const SocialSignOption = ({ isSocialEnabled }: { isSocialEnabled: boolean }) => {
    const handleSocialSign = async (provider: string) => {
        try {
            const res = await apiHandlers.handleSocialLogin(provider)
            if (!res.data.success) {
                throw new Error(res.data.message)
            }

            window.location.assign(res.data.result.redirect)
        } catch (error: any) {
            toast.error(error.message)
        }
    }
    return (
        <React.Fragment>
            <div className="py-4 text-center">
                <span className="fs-13 fw-bold">OR</span>
            </div>
            <div className="w-full">
                <button
                    disabled={isSocialEnabled}
                    onClick={() => {
                        if (!isSocialEnabled) {
                            handleSocialSign('google')
                        }
                    }}
                    className="block border w-full text-gray-500 font-medium leading-6 text-center align-middle select-none py-2 px-4 text-sm rounded-md transition-all hover:shadow-md"
                >
                    <span className="flex items-center justify-center">
                        <Icons.Google />
                        <span className="ms-2">Sign in with Google</span>
                    </span>
                </button>
            </div>
        </React.Fragment>
    )
}

export default SocialSignOption