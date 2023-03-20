import React from "react";
import {IconButton, TableCell, TableRow} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {deleteRow} from "../../utils/api/TableApi";
import {RowsInfoType} from "../../utils/types";

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
    setOpenErrorBar: (arg: boolean) => void;
    setErrorMessage: (arg: string) => void;
    setIsLoading: (arg: boolean) => void;
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
        rowsInfo,
        setOpenErrorBar,
        setErrorMessage,
        setIsLoading
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
        setErrorMessage('')
        setIsLoading(true)
        try {
            if (token) {
                await deleteRow(token, id)

                const otherRow = rowsInfo.filter((item) => item.id !== id)
                setRowsInfo(otherRow)
            }
        } catch (err) {
            setErrorMessage('Не удалось удалить строку')
            setOpenErrorBar(true)
            console.log(err)
        } finally {
            setIsLoading(false)
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
