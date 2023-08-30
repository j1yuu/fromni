import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import AddCamp from './pages/AddCamp/AddCamp';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';
import React from 'react';
import { CircularProgress, Container } from '@mui/material';


function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  let isLoading = !useSelector((state) => state.auth.status)

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [])
  return (
    <>
      <Header />
      <Container maxWidth='lg'>
        {isLoading ? (<div className='preloader'><CircularProgress color="inherit" /></div>) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/campaigns/:id" element={<AddCamp />} />
            <Route path="/new-campaign" element={<AddCamp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        )}
      </Container>
    </>
  );
}

export default App;
