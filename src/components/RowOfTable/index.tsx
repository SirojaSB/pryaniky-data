import React, {useState} from "react";
import {IconButton, TableCell, TableRow} from "@mui/material";
import {RowsInfoType} from "../../pages/MainPage";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import useFormWithValidation from "../../utils/useFormWithValidation";
import {editCell} from "../../utils/TableApi";

const RowOfTable: React.FC<RowsInfoType> = (
    {
        id,
        documentName,
        documentType,
        documentStatus,
        employeeNumber,
        employeeSignatureName,
        employeeSigDate,
        companySignatureName,
        companySigDate
    }) => {

    const [isEdit, setIsEdit] = useState(false)

    const initValues = {
        documentName,
        documentType,
        documentStatus,
        employeeNumber,
        employeeSignatureName,
        employeeSigDate: employeeSigDate.substring(0, 10),
        companySignatureName,
        companySigDate: companySigDate.substring(0, 10),
    }

    const {values, handleChange} = useFormWithValidation(initValues)

    const handleClickEdit = () => setIsEdit((isEdit) => !isEdit);

    const editRowInfo = async () => {
        const token = localStorage.getItem('JWT')
        try {
            if(token) {
                await editCell(token, id, {
                    documentName: values.documentName,
                    documentType: values.documentType,
                    documentStatus: values.documentStatus,
                    employeeNumber: values.employeeNumber,
                    employeeSignatureName: values.employeeSignatureName,
                    employeeSigDate: values.employeeSigDate + employeeSigDate.substring(10, 24),
                    companySignatureName: values.documentName,
                    companySigDate: values.companySigDate + companySigDate.substring(10, 24),
                })
                handleClickEdit()
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <TableRow>
            <TableCell align="right">
                <input
                    required
                    name='documentName'
                    type='text'
                    value={values.documentName}
                    onChange={handleChange}
                    disabled={!isEdit}/>
            </TableCell>
            <TableCell align="right">
                <input
                    required
                    name='documentType'
                    type='text'
                    value={values.documentType}
                    onChange={handleChange}
                    disabled={!isEdit}/>
            </TableCell>
            <TableCell align="right">
                <input
                    required
                    name='documentStatus'
                    type='text'
                    value={values.documentStatus}
                    onChange={handleChange}
                    disabled={!isEdit}/>
            </TableCell>
            <TableCell align="right">
                <input
                    required
                    name='employeeNumber'
                    type='text'
                    value={values.employeeNumber}
                    onChange={handleChange}
                    disabled={!isEdit}/>
            </TableCell>
            <TableCell align="right">
                <input
                    required
                    name='employeeSignatureName'
                    type='text'
                    value={values.employeeSignatureName}
                    onChange={handleChange}
                    disabled={!isEdit}/>
            </TableCell>
            <TableCell align="right">
                <input
                    required
                    name='employeeSigDate'
                    type='text'
                    maxLength={10}
                    value={values.employeeSigDate}
                    onChange={handleChange}
                    disabled={!isEdit}/>
            </TableCell>
            <TableCell align="right">
                <input
                    required
                    name='companySignatureName'
                    type='text'
                    value={values.companySignatureName}
                    onChange={handleChange}
                    disabled={!isEdit}/>
            </TableCell>
            <TableCell align="right">
                <input
                    required
                    name='companySigDate'
                    type='text'
                    maxLength={10}
                    value={values.companySigDate}
                    onChange={handleChange}
                    disabled={!isEdit}/>
            </TableCell>
            <TableCell align="right">
                {isEdit ?
                    <IconButton onClick={editRowInfo} aria-label="edit">
                        <CheckIcon/>
                    </IconButton> :
                    <IconButton onClick={handleClickEdit} aria-label="edit">
                        <EditIcon/>
                    </IconButton>}
            </TableCell>
            <TableCell align="right">
                <IconButton aria-label="edit">
                    <DeleteIcon/>
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

export default RowOfTable
