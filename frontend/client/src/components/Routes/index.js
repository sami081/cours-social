import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ForgotPassword from '../../pages/ForgotPassword';
import Home from '../../pages/Home';
import ModifyPassword from '../../pages/ModifyPassword';
import OtherProfil from '../../pages/OtherProfil';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';
import ValidEmail from '../../pages/ValidEmail';
import NavBar from '../NavBar';

const index = () => {
    return (
     <BrowserRouter>
     <NavBar/>
     <Routes>
        <Route path ="/" element={<Home/>} />
        <Route path ="/trending" element={<Trending/>} />
        <Route path ="/profil" element={<Profil/>} />
        <Route path ="*" element={<Home/>} />
        <Route path ="/activation-account/:token2" element={<ValidEmail/>}/>
        <Route path ="/forgot-password" element={<ForgotPassword/>}/>
        <Route path = "/modify-password/:_id/:token" element={<ModifyPassword/>}/>
        <Route path = "/otherProfil/" element = {<OtherProfil/>}/>

     </Routes>
     </BrowserRouter>
)};

export default index;