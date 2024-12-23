import SidebarListItems from "./sidebarListItems.tsx"


const LeftSidbar = ({ open }: { open: boolean }) => {
    return (
        <aside
            className={`flex fixed top-0 left-0 z-20 flex-col flex-shrink-0 pt-16 h-full duration-75 border-r  border-gray-200 lg:flex transition-width dark:border-gray-700 ${open ? 'lg:w-64 md:w-60' : 'lg:w-16 md:w-16'} ${open ? 'xs:hidden' : 'xs:block'} xs:bg-gray-50 dark:xs:bg-slate-900 md:bg-transparent dark:md:bg-transparent w-64 md:block`}            >
            <div className="h-full overflow-y-auto overflow-x-hidden rounded py-4 px-3   bg-neutral-900 ">
                <div className="flex h-full flex-col justify-between py-2">
                    <div>
                        <div className="mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0  dark:border-gray-700"

                        >
                            <SidebarListItems />
                        </div>
                        {/* <ul className="mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700"

                        >

                        </ul> */}
                        {/* {open && <DisplayLeftSidebarCard />} */}
                    </div>
                    <div className="flex items-center justify-center gap-x-5">

                    </div>
                </div>
            </div>
        </aside>
    )
}

export default LeftSidbar