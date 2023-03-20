import React, {useEffect, useState} from 'react';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {CssBaseline} from "@mui/material";

import MainPage from "./pages/MainPage";
import Login from "./pages/Login";

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const navigate = useNavigate();

    const checkToken = () => {
        const token = localStorage.getItem('JWT')
        try {
            if (token) {
                setIsLoggedIn(true)
                navigate('/')
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        checkToken()
    }, [isLoggedIn])

    return (
        <div>
            <CssBaseline/>
            <Routes>
                <Route path='/' element={ isLoggedIn ?
                    <MainPage setIsLoggedIn={(arg) => setIsLoggedIn(arg)}/> :
                    <Navigate to="/signin" /> }/>
                <Route path='/signin' element={<Login setIsLoggedIn={(arg) => setIsLoggedIn(arg)} />}/>
            </Routes>
        </div>
    );
}

export default App;
