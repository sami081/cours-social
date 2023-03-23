import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';
import ValidEmail from '../../pages/ValidEmail';

const index = () => {
    return (
     <BrowserRouter>
     <Routes>
        <Route path ="/" element={<Home/>} />
        <Route path ="/trending" element={<Trending/>} />
        <Route path ="/profil" element={<Profil/>} />
        <Route path ="*" element={<Home/>} />
        <Route path ="/activation-account" element={<ValidEmail/>}/>
     </Routes>
     </BrowserRouter>
)};

export default index;