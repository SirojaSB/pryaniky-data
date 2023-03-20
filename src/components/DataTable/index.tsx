import {IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import React from "react";

import RowOfTable from "../RowOfTable";
import {RowsInfoType} from "../../utils/types";

type DataTableProps = {
    setIsAddPopupOpen: (arg: boolean) => void;
    rowsInfo: RowsInfoType[];
    setSelectedRow: ({...args}: RowsInfoType) => void;
    setOpenErrorBar: (arg: boolean) => void;
    setErrorMessage: (arg: string) => void;
    setIsEditPopupOpen: (arg: boolean) => void;
    setRowsInfo: ({...args}: RowsInfoType[]) => void;
    setIsLoading: (arg: boolean) => void;
}

const DataTable: React.FC<DataTableProps> = (
    {
        setIsAddPopupOpen,
        rowsInfo,
        setSelectedRow,
        setOpenErrorBar,
        setErrorMessage,
        setIsEditPopupOpen,
        setRowsInfo,
        setIsLoading
    }) => {

    return (
        <TableContainer component={Paper}>
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
                        <TableCell align="right"></TableCell>
                        <TableCell align="right">
                            <IconButton aria-label="add-row" onClick={() => setIsAddPopupOpen(true)}>
                                <NoteAddIcon/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowsInfo && rowsInfo.map((row) => (
                        <RowOfTable
                            key={row.id}
                            {...row}
                            onEditRow={setIsEditPopupOpen}
                            setSelectedRow={setSelectedRow}
                            setRowsInfo={setRowsInfo}
                            rowsInfo={rowsInfo}
                            setOpenErrorBar={setOpenErrorBar}
                            setErrorMessage={setErrorMessage}
                            setIsLoading={setIsLoading}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default DataTable
