"use client"
import { useGetUsersQuery } from '@/state/api'
import React from 'react'
import { useAppSelector } from '../redux';
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import Image from 'next/image';
import Header from '@/components/Header';
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils';

const CustomToolbar = () => (
    <GridToolbarContainer className='toolbar flex gap-2'>
        <GridToolbarFilterButton />
        <GridToolbarExport/>
    </GridToolbarContainer>
);

const columns: GridColDef[] = [       
    {
        field: "userId",
        headerName: "ID",
        width: 100,
    },
    {
        field: "username",
        headerName: "Username",
        width: 100,
    },
    {
        field: "profilePictureUrl",
        headerName: "Profile Picture",
        width: 100,
        renderCell: (params) => (
            <div className='flex h-full w-full items-center justify-center'>
                <div className='size-9'>
                    <Image
                        src={`https:pm-s3-images-ym.s3.us-east-1.amazonaws.com/${params.value}`}
                        alt={params.row.username}
                        width={100}
                        height={50}
                        className='h-full rounded-full object-cover'
                    />
                </div>
            </div>
        )
    },
]
const Users = () => {
    const {data: users, isLoading, isError} = useGetUsersQuery();
    const setIsDarkMode = useAppSelector((state) => state.global.isDarkMode);

if(isLoading) return <div>Loading...</div>
if(isError) return <div>Error fetching users</div>

  return (
    <div className=' flex w-full flex-col p-8'>
        <Header name="Users" />
        <div style={{height:650, width: "100%"}}>
            <DataGrid
                rows={users || []}
                columns={columns}
                getRowId={(row)=> row.userId}
                pagination
                slots={{
                    toolbar: CustomToolbar,
                }}
                className={dataGridClassNames}
                sx={dataGridSxStyles(setIsDarkMode)}
            />

        </div>
    </div>
  )
}

export default Users
