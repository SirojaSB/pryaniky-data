import React, {useEffect, useState} from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";

import {getData} from "../utils/TableApi";
import RowOfTable from "../components/RowOfTable";
import RowEditPopup from "../components/RowEditPopup";
import RowCreatePopup from "../components/RowCreatePopup";

export type RowsInfoType = {
    id: string,
    documentName: string,
    documentType: string,
    documentStatus: string,
    employeeNumber: string,
    employeeSignatureName: string,
    employeeSigDate: string,
    companySignatureName: string,
    companySigDate: string,
}

const MainPage: React.FC = () => {
    const [rowsInfo, setRowsInfo] = useState<RowsInfoType[]>()
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false)
    const [isAddPopupOpen, setIsAddPopupOpen] = useState(false)
    const [selectedRow, setSelectedRow] = useState<RowsInfoType>()

    const getInfo = async () => {
        const token = localStorage.getItem('JWT')
        try {
            if (token) {
                const data = await getData<RowsInfoType[]>(token)
                setRowsInfo(data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getInfo()
    }, [])

    return (
        <main>
            <IconButton aria-label="logout" onClick={() => setIsAddPopupOpen(true)}>
                <NoteAddIcon/>
            </IconButton>
            <IconButton aria-label="logout">
                <LogoutIcon/>
            </IconButton>
            <TableContainer sx={{minWidth: 850}} component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Имя документа</TableCell>
                            <TableCell align="right">Тип документа</TableCell>
                            <TableCell align="right">Статус</TableCell>
                            <TableCell align="right">Число сотрудников</TableCell>
                            <TableCell align="right">Подписи сотрудников</TableCell>
                            <TableCell align="right">Дата подписания</TableCell>
                            <TableCell align="right">Подпись компании</TableCell>
                            <TableCell align="right">Дата подписания</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsInfo && rowsInfo.map((row) => (
                            <RowOfTable key={row.id} {...row} onEditRow={(arg) => setIsEditPopupOpen(arg)} setSelectedRow={setSelectedRow} setRowsInfo={setRowsInfo} rowsInfo={rowsInfo}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {isEditPopupOpen && rowsInfo && selectedRow && <RowEditPopup onClickClose={(arg) => setIsEditPopupOpen(arg)} selectedRow={selectedRow} setRowsInfo={setRowsInfo} rowsInfo={rowsInfo}/>}
            {isAddPopupOpen && rowsInfo && <RowCreatePopup onClickClose={(arg) => setIsAddPopupOpen(arg)} setRowsInfo={setRowsInfo} rowsInfo={rowsInfo}/>}
        </main>
    )
}

export default MainPage
