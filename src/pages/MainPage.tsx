import React, {useEffect, useState} from "react";
import LogoutIcon from '@mui/icons-material/Logout';
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

export type RowsInfoType = {
    [key: string]: string;
}

const MainPage: React.FC = () => {
    const [rowsInfo, setRowsInfo] = useState<RowsInfoType[]>()

    const getInfo = async () => {
        const token = localStorage.getItem('JWT')
        try {
            if (token) {
                const {data}: any = await getData(token)
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
                            <RowOfTable key={row.id} {...row}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </main>
    )
}

export default MainPage
