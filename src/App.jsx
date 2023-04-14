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
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />

          <Route element={<PrivateOutlet />}>
            {/* <Route path="/threads/new" element={<Addpage />} /> */}
          </Route>
          {/* <Route path="*" element={<Errorpage />} /> */}
        </Route>
      </Routes>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  position: relative;
  min-height: 100vh;
`;
