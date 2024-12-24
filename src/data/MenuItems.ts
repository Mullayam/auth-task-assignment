import { Icons } from "@/components/icons";
import { GithubOutlined } from "@ant-design/icons";

export interface SidebarMenuItemsType {
    name: string;
    path: string;
    icon: () => JSX.Element;
    role: string[];
    child?: SidebarMenuItemsType[]
}
export const SidebarMenuItems: SidebarMenuItemsType[] = [
    {
        name: "Dashboard",
        path: "/",
        icon: Icons.PieChart,
        role: ['ADMIN', 'USER']

    },
    {
        name: "Users list",
        path: "/users",
        icon: Icons.HiUsers,
        role: ['ADMIN'],
        
    },



]
export const MenuItemsGroup = [
    {
        name: "Github",
        path: "https://github.com/Mullayam/auth-task-assignment",
        icon: GithubOutlined,
    },

]