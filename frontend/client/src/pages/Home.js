import React, { useContext } from 'react';
import LeftNav from "../components/LeftNav"
import Thread from '../components/Thread';
import { UidContext } from '../components/AppContext';
import NewPostForm from '../components/Post/NewPostForm';
import Log from "../components/Log/Log"
import Trends from '../components/Trends';
import FriendsHint from '../components/Profil/FriendsHint';


const Home = (posts) => {
  const uid = useContext(UidContext)
  localStorage.setItem("uid", uid);
    return (
        <div className='home'>
            
          <LeftNav />
          <div className='main'>
            <div className='home-header'>
{uid ? <NewPostForm /> : <Log signin={true} signup={false}/>}
            </div>
            <Thread/>
            
          </div>
          <div className='right-side'>
            <div className='right-side-container'>
              <div className='wrapper'>
                <Trends />
                {uid && <FriendsHint/>}
              </div>
            </div>
          </div>
        </div>
    );
};

export default Home;