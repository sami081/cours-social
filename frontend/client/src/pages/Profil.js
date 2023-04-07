import React, { useContext } from 'react';
import Log from "../components/Log/Log";
import {UidContext} from "../components/AppContext"
import UpdateProfil from '../components/Profil/UpdateProfil';
import FriendsHint from '../components/Profil/FriendsHint';
import Trends from '../components/Trends';
import CardUser from '../components/Post/CardUser';

const Profil = () => {
    const uid = useContext(UidContext);
    return (
     <div className='profil-page'>
        {uid ? (
            <>
            <UpdateProfil />
            <div className='test'>
            <Trends />
        <FriendsHint/>
        <CardUser/>
        </div>
            </>
        ) : (

            <div className='log/container'>
            <Log  signin = {false} signup ={true}/>
        
            <div className='img/container'></div>
            
        </div>
  
        
            )}
     </div>
    );
};

export default Profil;