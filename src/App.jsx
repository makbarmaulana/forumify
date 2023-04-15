import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Route, Routes } from 'react-router-dom';
import { asyncPreloadProcess } from './states/isPreload/action';
import PrivateOutlet from './utils/PrivateOutlet';
import Homepage from './pages/Homepage';
import ThreadDetailpage from './pages/ThreadDetailpage';
import Loginpage from './pages/Loginpage';
import Registerpage from './pages/Registerpage';
import AddThreadpage from './pages/AddThreadpage';
import Leaderboardspage from './pages/Leaderboardspage';
import Maintenancepage from './pages/Maintenancepage';
import Errorpage from './pages/Errorpage';

function App() {
  const { isPreload = false } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) return null;

  return (
    <AppContainer>
      <Routes>
        <Route element={<Outlet />}>
          <Route index path="/" element={<Homepage />} />
          <Route path="/threads/:id" element={<ThreadDetailpage />} />
          <Route path="/leaderboards" element={<Leaderboardspage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/maintenance" element={<Maintenancepage />} />
          <Route path="*" element={<Errorpage />} />

          <Route element={<PrivateOutlet />}>
            <Route path="/new" element={<AddThreadpage />} />
          </Route>
        </Route>
      </Routes>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  position: relative;
  min-height: 100vh;
  // delete this
  width: 425px;
  margin: auto;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
  outline: 1px solid #f5f5f5;
`;
