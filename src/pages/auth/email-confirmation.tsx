import { FallbackSpinner } from '@/components/fallbackSpinner';
import { apiHandlers } from '@/lib/api/handler';
import { CheckCircleIcon, XCircleIcon } from 'lucide-react';
import React, { useLayoutEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';

const EmailConfirmation = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [status, setStatus] = React.useState<{
        message: string
        isVerified: boolean
    } | null>(null)
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const verifyEmail = React.useCallback(async (token: string) => {
        try {
            const res = await apiHandlers.verifyEmail(token)
            setStatus({
                message: res.data.message,
                isVerified: res.data.success
            })
            setIsLoading(false)
            return
        } catch (error: any) {
            setIsLoading(false)
            setStatus({
                message: error.response.data.message,
                isVerified: false
            })
        }
    }, [])
    useLayoutEffect(() => {
        document.title = "Email Confirmation"
        if (!searchParams.has('token')) {
            navigate('/not-found')
            return
        }
        const token = searchParams.get('token')
        if (token?.trim() === '' || token === null || token === undefined) {
            navigate('/not-found')
            return

        }
        verifyEmail(token as string)

    }, [searchParams])

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white rounded-lg shadow-md max-w-sm w-full">
                <div className="text-center">
                    {isLoading ? <FallbackSpinner /> :
                        status?.isVerified ? (
                            <>
                                <CheckCircleIcon className="mx-auto h-12 w-12 text-green-500" />
                                <h2 className="mt-2 text-lg font-semibold text-gray-900">Email Verified</h2>
                                <p className="mt-1 text-sm text-gray-500">Your email has been successfully verified.</p>
                            </>
                        ) : (
                            <>
                                <XCircleIcon className="mx-auto h-12 w-12 text-red-500" />
                                <h2 className="mt-2 text-lg font-semibold text-gray-900">Verification Failed</h2>
                                <p className="mt-1 text-sm text-red-500">
                                    {status?.message || "There was an error verifying your email."}
                                </p>
                            </>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default EmailConfirmation