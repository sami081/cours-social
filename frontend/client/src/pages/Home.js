import React, { useContext } from 'react';
import LeftNav from "../components/LeftNav"
import Thread from '../components/Thread';
import { UidContext } from '../components/AppContext';
import NewPostForm from '../components/Post/NewPostForm';
import Log from "../components/Log/Log"


const Home = () => {
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
        </div>
    );
};

export default Home;