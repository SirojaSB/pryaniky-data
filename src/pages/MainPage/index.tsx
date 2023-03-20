import React from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import CancelIcon from "@mui/icons-material/Cancel";
import {IconButton, Snackbar} from "@mui/material";
import {useNavigate} from "react-router-dom";

import RowEditPopup from "../../components/RowEditPopup";
import RowCreatePopup from "../../components/RowCreatePopup";
import {RowsInfoType} from "../../utils/types";
import {getData} from "../../utils/api/TableApi";
import {ERROR_GET_INFO_MESSAGE} from "../../utils/constants";
import DataTable from "../../components/DataTable";
import Preloader from "../../components/Preloader";

type MainPageProps = {
    setIsLoggedIn: (arg: boolean) => void
}

const MainPage: React.FC<MainPageProps> = ({setIsLoggedIn}) => {
    const [isEditPopupOpen, setIsEditPopupOpen] = React.useState(false)
    const [isAddPopupOpen, setIsAddPopupOpen] = React.useState(false)
    const [selectedRow, setSelectedRow] = React.useState<RowsInfoType>()
    const [rowsInfo, setRowsInfo] = React.useState<RowsInfoType[]>()
    const [openErrorBar, setOpenErrorBar] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)

    const handleCloseErrorBar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenErrorBar(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseErrorBar}
            >
                <CancelIcon fontSize="small"/>
            </IconButton>
        </React.Fragment>
    );

    const navigate = useNavigate();

    const getInfo = async () => {
        const token = localStorage.getItem('JWT')
        setErrorMessage('')
        setIsLoading(true)
        try {
            if (token) {
                const data = await getData<RowsInfoType[]>(token)
                setRowsInfo(data)
            } else {
                setIsLoggedIn(false)
            }
        } catch (err) {
            setErrorMessage(ERROR_GET_INFO_MESSAGE)
            setOpenErrorBar(true)
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        getInfo()
    }, [])

    const handleLogout = () => {
        setRowsInfo([])
        setIsLoggedIn(false)

        localStorage.removeItem('JWT')

        navigate('/signin')
    }

    return (
        <main>
            <IconButton sx={{fontSize: '18px', mb: '20px'}} aria-label="logout" onClick={handleLogout}>
                выйти
                <LogoutIcon fontSize="small" sx={{ml: '5px'}}/>
            </IconButton>
            {rowsInfo &&
                <DataTable
                    setIsAddPopupOpen={setIsAddPopupOpen}
                    rowsInfo={rowsInfo}
                    setSelectedRow={setSelectedRow}
                    setOpenErrorBar={setOpenErrorBar}
                    setErrorMessage={setErrorMessage}
                    setIsEditPopupOpen={setIsEditPopupOpen}
                    setRowsInfo={setRowsInfo}
                    setIsLoading={setIsLoading}/>}
            {isEditPopupOpen && rowsInfo && selectedRow &&
                <RowEditPopup
                    onClickClose={setIsEditPopupOpen}
                    selectedRow={selectedRow}
                    setRowsInfo={setRowsInfo}
                    rowsInfo={rowsInfo}
                    setIsLoading={setIsLoading}/>}
            {isAddPopupOpen && rowsInfo &&
                <RowCreatePopup
                    onClickClose={setIsAddPopupOpen}
                    setRowsInfo={setRowsInfo}
                    rowsInfo={rowsInfo}
                    setIsLoading={setIsLoading}/>}
            <Snackbar
                open={openErrorBar}
                autoHideDuration={6000}
                onClose={handleCloseErrorBar}
                message={errorMessage}
                action={action}
            />
            {isLoading && <Preloader/>}
        </main>
    )
}

export default MainPage
