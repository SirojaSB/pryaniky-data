import React from 'react';
import './App.css';
import {CssBaseline} from "@mui/material";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import {Route, Routes} from "react-router-dom";

const App: React.FC = () => {
    return (
        <div>
            <CssBaseline/>
            <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/signin' element={<Login />}/>
            </Routes>
        </div>
    );
}

export default App;
