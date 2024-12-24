import { __config } from '@/lib/config'
import { DUMMY_AVATAR } from '@/lib/utils'

const MyImage = ({
    className = "h-8 w-8 rounded-full", avatar, name
}: { className?: string, avatar: string | null, name?: string }) => {
    return (
        (avatar === null||avatar === undefined || !avatar) ?
            <img className={className}
                src={DUMMY_AVATAR}
                alt={name}
            />
            : <img
                className={className}
                src={`${__config.API_URL}/public/${avatar}`}
                alt={name}
            />
    )
}

export default MyImage