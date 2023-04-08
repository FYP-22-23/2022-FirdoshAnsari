import React, {useCallback, useContext, useEffect, useState} from 'react';
import storage from '@react-native-async-storage/async-storage'
import {light} from '../constants';

export const DataContext = React.createContext({});

export const DataProvider = ({children}) => {
  const [theme, setTheme] = useState(light);
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [fcmToken, setFcmToken] = useState()

  async function loadUser() {
    const user = await storage.getItem('user')
    if(user!=null) {
      setUser(JSON.parse(user))
    }
    setLoading(false)
  }

  useEffect(()=>{
    loadUser()
  },[])
  
  removeUser = ()=>{
    setUser(null)
    storage.removeItem('user')
  }

  useEffect(()=>{
    if(!loading) {
      storage.setItem('fcm_token', JSON.stringify(fcmToken))
    }
  }, [fcmToken])

  useEffect(()=>{
    if(!loading){
      storage.setItem('user', JSON.stringify(user))
    }
  }, [user])

  const contextValue = {
    theme,
    setTheme,
    user,
    setUser,
    removeUser,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
