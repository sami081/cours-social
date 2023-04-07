import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { UidContext } from './AppContext';
import Logout from './Log/Logout';

const NavBar = () => {
    const uid = useContext(UidContext);
    const userData = useSelector((state) => state.user)
console.log(userData);
    
    return (
        <div className='bar'>
           <nav>
            <div className='nav-container'>
                <div className='logo'>
                    <NavLink exact to ="/">
                       <img src='./img/logo.png'  alt='logo'/>
                       <h1>Eagle Visit</h1>
                    </NavLink>
                </div>
                {uid? (
                    <ul>
                     
                        <li className='welcom'>
                            <NavLink exact to="/profil">
                                <h3>Bienvenue {userData.pseudo}</h3>
                            </NavLink>
                        </li>
                     <Logout/>
                    </ul>
                ) : (
                    <ul>
                        
                            <li>
                            <NavLink exact to="/profil">
                              <img src ="./img/login.svg" alt='icon connexion' />
                            </NavLink>
                            
                        </li>
                    </ul>
                )}
            </div>
           </nav>
        </div>
    );
};

export default NavBar;