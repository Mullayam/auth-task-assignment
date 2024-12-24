import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AllUserDataType } from "@/types";
import moment from "moment";
import Badge from "./badges";
import PopConfirm from "./popConfirm";
import { apiHandlers } from "@/lib/api/handler";
import { __config } from "@/lib/config";
import { TableParams } from "../../pages/dashboard/AllUser";
import toast from "react-hot-toast";
import { useUpdatedSearchParams } from "@/hooks/useQueryParams";
import MyImage from "./myImage";

interface MyResponsiveTableProps {
    setTableParams: React.Dispatch<React.SetStateAction<TableParams>>;
    tableParams: TableParams;
    totalRecords: number;
    items: AllUserDataType[];
    items_per_page?: number;
    loading: boolean
}
export default function MyResponsiveTable({
    items,
    setTableParams,
    totalRecords,
    loading,
    tableParams,
}: MyResponsiveTableProps) {
    const navigate = useNavigate();
    const [_, setSearchParams] = useUpdatedSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const items_per_page = tableParams.pagination?.pageSize || 10;


    const totalPages = Math.ceil(totalRecords / items_per_page);
    const startIndex = (currentPage - 1) * items_per_page;
    const endIndex = startIndex + items_per_page;
    const currentItems = items.slice(startIndex, endIndex);

    const jumpToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            navigate(`?page=${page}`);
        }
        setCurrentPage(page);
        setSearchParams({ page: String(page) });
    };
    const handlePageNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (value < 1 || value > totalPages) {
            return toast.error("Maximum page number exceeded");
        }
        jumpToPage(isNaN(value) ? 1 : value);
    };
    const handlePageLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value);
        setTableParams({
            ...tableParams,
            pagination: {
                ...tableParams.pagination,
                pageSize: isNaN(value) ? 10 : value,
            },
        });
        setSearchParams({ limit: String(isNaN(value) ? 10 : value) });
    };
    return (
        <div>
            <div className="overflow-x-auto overflow-y-auto h-[500px]">
                <table className="min-w-full bg-white border-collapse">
                    <thead className="bg-gray-100 sticky top-0">
                        <tr className="bg-gray-100">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email Verified
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Created At
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 overflow-y-auto">
                        {
                            loading ?
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-6 py-4 text-center"
                                    >
                                        <div className="flex justify-center items-center">
                                            <div className="w-10 h-10 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
                                        </div>
                                    </td>
                                </tr>

                                : currentItems.length > 0 ? (
                                    currentItems.map((record) => (
                                        <tr key={record.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-4">
                                                    <MyImage avatar={record?.avatar || null} name={record?.name} />

                                                    <span className="font-mediumtext-black">
                                                        {record.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {record.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {record.role.toLocaleUpperCase() === "admin" ? (
                                                    <span className="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded  ">
                                                        {record.role.toLocaleUpperCase()}
                                                    </span>
                                                ) : (
                                                    <span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                                                        {record.role.toLocaleUpperCase()}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {record.is_email_verified ? (
                                                    <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded">
                                                        Verified
                                                    </span>
                                                ) : (
                                                    <span className="bg-red-100 text-red-600 text-sm font-medium me-2 px-2.5 py-0.5 rounded ">
                                                        Not Verified
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {" "}
                                                    {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Badge status={record.status} />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="w-16">
                                                    <PopConfirm
                                                        text="Delete"
                                                        title="Are you sure you want to delete this user?"
                                                        description="This action cannot be undone"
                                                        handleSubmit={() => apiHandlers.deleteUser(record.id)}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-6 py-4 whitespace-nowrap text-center"
                                        >
                                            No Data found
                                        </td>
                                    </tr>
                                )}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center space-x-4 p-4">
                    <div className="flex items-center space-x-2">
                        <label
                            htmlFor="pageNumber"
                            className="text-sm font-medium text-gray-700"
                        >
                            Page:
                        </label>
                        <input
                            type="number"
                            id="pageNumber"
                            value={currentPage}
                            onChange={handlePageNumberChange}
                            className="w-16 rounded-none border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            min={1}
                            max={totalPages}
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <label
                            htmlFor="pageLimit"
                            className="text-sm font-medium text-gray-700"
                        >
                            Per page:
                        </label>
                        <select
                            id="pageLimit"
                            value={items_per_page}
                            onChange={handlePageLimitChange}
                            className="rounded-none border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                    <div className="text-sm text-gray-700">
                        Showing {startIndex + 1} to {Math.min(endIndex, items.length)} of{" "}
                        {totalRecords} results
                    </div>
                </div>

                <div className="flex justify-center space-x-2">
                    <button
                        onClick={() => jumpToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => jumpToPage(page)}
                            className={`px-3 py-1 border ${currentPage === page
                                ? "bg-indigo-600 text-white"
                                : "border-gray-300 text-gray-700 hover:bg-gray-50"
                                } text-sm font-medium`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={() => jumpToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
