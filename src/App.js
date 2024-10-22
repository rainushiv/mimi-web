import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useCallback, useEffect } from 'react';
import Home from './Home/Pages/Home';
import Lost from './Lost/Pages/Lost';
import Found from './User/Pages/Profile';
import Auth from './Auth/Pages/Auth';
import LostCatPage from './Lost/Pages/LostCatPage';
import NewLostCat from './Lost/Pages/NewLostCat';
import UpdateLostCat from './Lost/Pages/UpdateLostCat';
import { AuthContext } from './Shared/context/authContext';
import Profile from './User/Pages/Profile';
import './App.css';
let logoutTimer;
function App() {
  console.log(process.env.VITE_API_URL)
  const [userId, setUserId] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState()
  const [token, setToken] = useState(false);
  const login = useCallback((uid, token, expirationDate) => {
    setToken(token)
    setUserId(uid)
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
    setTokenExpirationDate(tokenExpirationDate)
    localStorage.setItem('userData', JSON.stringify({ userId: uid, token: token, expiration: tokenExpirationDate.toISOString() }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setTokenExpirationDate(null)
    setUserId(null)
    localStorage.removeItem('userData')
  })

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer)
    }
  }, [token, logout, tokenExpirationDate])


  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      login(storedData.userId, storedData.token)
    }
  }, [login])

  let route;

  if (token) {
    route = (
      <>
        <Route index element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/lost' element={<Lost />} />
        <Route path='/:pid/updatelostcat' element={<UpdateLostCat />} />
        <Route path='/:pid/lostCat' element={<LostCatPage />} />
        <Route path='/newlostcat' element={<NewLostCat />} />
        <Route path='/:uid/profile' element={<Profile />} />
        <Route path='/auth' element={<Navigate to='/home' />} />
      </>
    )
  } else {
    route = (
      <>

        <Route index element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/lost' element={<Lost />} />
        <Route path='/:pid/lostCat' element={<LostCatPage />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/newlostcat' element={<Navigate to='/auth' />} />
        <Route path='/:uid/profile' element={<Navigate to='/home' />} />
      </>

    )
  }
  return (
    <div>
      <AuthContext.Provider value={{ isLoggedIn: !!token, token: token, userId: userId, login: login, logout: logout }}>
        <BrowserRouter>
          <Routes>
            {route}
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>

    </div>
  )
}

export default App;
