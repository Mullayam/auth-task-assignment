import { IUser } from "@/types/index.ts"
import SidebarListItems from "./sidebarListItems.tsx"


const LeftSidbar = ({ open, user }: { open: boolean, user: IUser }) => {
    return (
        <aside
            className={`fixed top-0 left-0 z-20 flex flex-col pt-16 flex-shrink-0 h-full border-r border-gray-200 dark:border-gray-700 duration-300  transition-width transition-transform ${!open ? "xtranslate-x-0" : "-translate-x-full"
                } lg:translate-x-0 lg:w-64 md:w-64 ${open ? "lg:w-64 md:w-64" : "lg:w-14 md:w-14"
                } xs:bg-gray-50 dark:xs:bg-slate-900 w-64 md:bg-transparent dark:md:bg-transparent`}>
            <div className="h-full overflow-y-auto overflow-x-hidden rounded py-4 px-3   bg-neutral-900 ">
                <div className="flex h-full flex-col justify-between py-2">
                    <div>
                        <div className="mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0  dark:border-gray-700">
                            <SidebarListItems user={user} />
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-x-5" />
                </div>
            </div>
        </aside>
    )
}

export default LeftSidbar