import React, {useState} from "react";
import {IconButton, TableCell, TableRow} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {RowsInfoType} from "../../pages/MainPage";
import {deleteRow} from "../../utils/TableApi";

type RowOfTableProps = {
    id: string;
    documentName: string;
    documentType: string;
    documentStatus: string;
    employeeNumber: string;
    employeeSignatureName: string;
    employeeSigDate: string;
    companySignatureName: string;
    companySigDate: string;
    onEditRow: (arg: boolean) => void;
    setSelectedRow: ({...args}: RowsInfoType) => void;
    setRowsInfo: ({...args}: RowsInfoType[]) => void;
    rowsInfo: RowsInfoType[];
}

const RowOfTable: React.FC<RowOfTableProps> = (
    {
        id,
        documentName,
        documentType,
        documentStatus,
        employeeNumber,
        employeeSignatureName,
        employeeSigDate,
        companySignatureName,
        companySigDate,
        onEditRow,
        setSelectedRow,
        setRowsInfo,
        rowsInfo
    }) => {

    const handleEditRow = () => {
        onEditRow(true)
        setSelectedRow({
            id,
            documentName,
            documentType,
            documentStatus,
            employeeNumber,
            employeeSignatureName,
            employeeSigDate,
            companySignatureName,
            companySigDate,
        })
    }

    const handleDeleteRow = async () => {
        const token = localStorage.getItem('JWT')
        try {
            if(token) {
                await deleteRow(token, id)

                const otherRow = rowsInfo.filter((item) => item.id !== id)
                setRowsInfo(otherRow)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <TableRow>
            <TableCell align="right">
                {documentName}
            </TableCell>
            <TableCell align="right">
                {documentType}
            </TableCell>
            <TableCell align="right">
                {documentStatus}
            </TableCell>
            <TableCell align="right">
                {employeeNumber}
            </TableCell>
            <TableCell align="right">
                {employeeSignatureName}
            </TableCell>
            <TableCell align="right">
                {employeeSigDate.substring(0, 10)}
            </TableCell>
            <TableCell align="right">
                {companySignatureName}
            </TableCell>
            <TableCell align="right">
                {companySigDate.substring(0, 10)}
            </TableCell>
            <TableCell align="right">
                <IconButton type='button' onClick={handleEditRow} aria-label="edit">
                    <EditIcon/>
                </IconButton>
            </TableCell>
            <TableCell align="right">
                <IconButton type='button' aria-label="edit" onClick={handleDeleteRow}>
                    <DeleteIcon/>
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

export default RowOfTable
