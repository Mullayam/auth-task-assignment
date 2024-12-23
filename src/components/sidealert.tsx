type SideAlert = {
    text: string
    button?: boolean
    handleClickChange?: () => void
}
export default function SideAlert({
    text,
    button = true,
    handleClickChange,
}: SideAlert) {
    return (
        <aside className="top-center-4 z-100 bg-slate-700  fixed end-10 flex items-center justify-center gap-4 rounded-lg dark:bg-black px-5 py-3 text-white">
            <span className="text-sm font-medium hover:opacity-75 cursor-pointer">{text}</span>

            {button && (
                <button
                    className="rounded bg-white/20 p-1 hover:bg-white/10 cursor-pointer"
                    onClick={handleClickChange}
                >


                    +
                </button>
            )}
        </aside>
    )
}