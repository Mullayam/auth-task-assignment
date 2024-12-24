import React, { useEffect, useState } from 'react';
import type { GetProp, TableProps } from 'antd';
import { Space, Table } from 'antd';
import type { SorterResult } from 'antd/es/table/interface';
import qs from 'qs';
import { apiHandlers } from '@/lib/api/handler';
import PopConfirm from '@/components/common/popConfirm';
import moment from 'moment'
import Badge from '@/components/common/badges';
import SearchFilter from '@/components/common/searchFilter';
import MyResponsiveTable from '@/components/common/responsiveTable';
import { AllUserDataType } from '@/types';
import { __config } from '@/lib/config';
import MyImage from '@/components/common/myImage';

type ColumnsType<T extends object = object> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;


export interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: SorterResult<any>['field'];
    sortOrder?: SorterResult<any>['order'];
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const columns: ColumnsType<AllUserDataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: true,
        width: '20%',
        render: (_, record) => (
            <div className="flex items-center gap-4">
                <MyImage avatar={record?.avatar || null} name={record?.name} />

                <span className="font-mediumtext-black">
                    {record.name}
                </span>
            </div>

        ),
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Role',
        dataIndex: 'role',
        render: (_, record) => record.role.toLocaleUpperCase() === 'admin' ? <span className="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded  ">
            {record.role.toLocaleUpperCase()}
        </span> : <span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
            {record.role.toLocaleUpperCase()}
        </span>

    },
    {
        title: 'Email Verified',
        dataIndex: 'is_email_verified',
        render: (_, record) => record.is_email_verified ? <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded">
            Verified
        </span> : <span className="bg-red-100 text-red-600 text-sm font-medium me-2 px-2.5 py-0.5 rounded ">
            Not Verified
        </span>
    },
    {
        title: 'Status',
        dataIndex: 'status',
        render: (_, record) => <Badge status={record.status} />,
    },
    {
        title: 'Registered At',
        dataIndex: 'createdAt',
        sorter: true,
        render: (_, record) => (
            <>
                {moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <PopConfirm
                    text='Delete'
                    title='Are you sure you want to delete this user?'
                    description='This action cannot be undone'
                    handleSubmit={() => apiHandlers.deleteUser(record.id)} />
            </Space>
        ),
    },
];

const getRandomuserParams = (params: TableParams) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
});

export const AllUsers: React.FC = () => {
    const [data, setData] = useState<AllUserDataType[]>();
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('')
    const [totalRecords, settotalRecords] = useState(0)
    const [filteredUsers, setFilteredUsers] = useState<AllUserDataType[]>()
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const handleFilterData = (searchTerm: string) => {
        if (searchTerm === '') {
            setFilteredUsers(data)
            return
        }
        const results = data?.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredUsers(results)
    }
    const fetchData = () => {
        setLoading(true);
        const { pagination } = getRandomuserParams(tableParams)
        apiHandlers.fetchAllUsers(qs.stringify({
            page: pagination?.current,
            limit: pagination?.pageSize
        }))
            .then(({ data }) => {
                if (!data.success) {
                    throw new Error(data.message);
                }
                setData(data.result.data);
                setFilteredUsers(data.result.data);
                settotalRecords(data.result.total);
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: data.result.total,
                    },
                });
            }).catch((error) => {
                setLoading(false);
                console.log(error);
            });
    };

    useEffect(fetchData, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
        tableParams?.sortOrder,
        tableParams?.sortField,
        JSON.stringify(tableParams.filters),
    ]);
    useEffect(() => {
        handleFilterData(searchTerm)
        document.title = `All Users`
    }, [searchTerm])

    const handleTableChange: TableProps<AllUserDataType>['onChange'] = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
            sortField: Array.isArray(sorter) ? undefined : sorter.field,
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    return (
        <>
            <SearchFilter
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <hr className='my-4' />
            <MyResponsiveTable
                items={filteredUsers || []}
                tableParams={tableParams}
                totalRecords={totalRecords}
                loading={loading}
                setTableParams={setTableParams}
            />

            {/* <Table<AllUserDataType>
                className='rounded-none'
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={filteredUsers}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
            /> */}

        </>
    );
};

