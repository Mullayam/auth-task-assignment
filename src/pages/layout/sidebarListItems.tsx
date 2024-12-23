import { Icons } from '@/components/icons'
import { MenuItemsGroup, SidebarMenuItems } from '@/data/MenuItems'
import React from 'react'
import { Link } from 'react-router-dom'
import { snakeCase } from 'change-case'
import { Tooltip } from 'antd'

const SidebarListItems = () => {
    return (
        <React.Fragment>
            <ul className="space-y-2 ">            {
                SidebarMenuItems.map((item: typeof SidebarMenuItems[0] & { child?: typeof SidebarMenuItems }, i) => {
                    return (
                        <li key={i}>
                            {!item?.child ?
                                (
                                    <Link to={item.path}
                                        className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                    >
                                        <Tooltip placement="right" title={item.name}><span className="">{<item.icon />}</span></Tooltip>

                                        <span className="flex-1 ml-5 text-left whitespace-nowrap">{item.name}</span>
                                    </Link>
                                )
                                :
                                <button
                                    type="button"
                                    className="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    aria-controls={`dropdown-pages-${snakeCase(item.name)}`}
                                    data-collapse-toggle={`dropdown-pages-${snakeCase(item.name)}`}
                                >
                                    <Tooltip placement="right" title={item.name}><span className="">{<item.icon />}</span></Tooltip>

                                    <span className="flex-1 ml-5 text-left whitespace-nowrap">{item.name}</span>
                                    <Icons.MenuDropdown />
                                </button>

                            }
                            {item.child && (
                                <ul id={`dropdown-pages-${snakeCase(item.name)}`} className="hidden py-2 space-y-2">
                                    {
                                        item.child.map((child, _i) => {
                                            return (
                                                <li key={_i}>
                                                    <Link
                                                        to={child.path}
                                                        className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                                    >
                                                        {child?.icon && <Tooltip placement="right" title={child.name}><span className="">{<item.icon />}</span></Tooltip>}
                                                        {child.name}
                                                    </Link>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            )}
                        </li>
                    )
                })
            }

            </ul>
            <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
                {
                    MenuItemsGroup.map((item, i) => {
                        return (
                            <li key={i}>
                                <Link to={item.path}
                                    className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <Tooltip placement="right" title={item.name}><span className="">{<item.icon />}</span></Tooltip>

                                    <span className="flex-1 ml-5 text-left whitespace-nowrap">{item.name}</span>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </React.Fragment>
    )
}

export default SidebarListItems