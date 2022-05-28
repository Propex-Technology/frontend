import React, { useState, useEffect } from "react";
import {
  Route,
  Switch,
  BrowserRouter,
  Redirect
} from "react-router-dom";

import { ThemeProvider } from '@mui/material/styles';
import Scrollbar from "react-perfect-scrollbar";
import { Theme } from "./theme";

import "react-perfect-scrollbar/dist/css/styles.css";
import GlobalCss from "./styles/jss/GlobalCss";

import MarketplacePage from "./pages/Marketplace";
import AssetPage from "./pages/Asset";
import NotFoundPage from "./pages/NotFound";
import AccountPage from "./pages/Account";
import AdminPage from "./pages/Admin";

import { onAuthStateChanged } from 'firebase/auth';
import { AuthProvider } from "./components/AuthContext";
import { auth } from './firebase'
import { backendURL } from './contracts';

import { DAppProvider, Mainnet, getDefaultProvider } from '@usedapp/core';

const dappConfig = {
  readOnlyChainId: 137
}

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user != null) {
        user.getIdToken()
          .then(token => fetch(`${backendURL}/users/get/`,
            {
              method: 'GET',
              headers: {
                'Authorization': token
              },
            }))
          .then(res => res.json())
          .then(x => {
            if (x.success) setUserData(x);
            else setUserData(null);
          })
          .catch(x => {
            console.error(x);
            setUserData(null);
          });
      }
    });
  }, []);

  return (
    <ThemeProvider theme={Theme}>
      <DAppProvider config={dappConfig}>
        <GlobalCss>
          <Scrollbar
            className="h-full-screen scrollable-content"
            options={{ suppressScrollX: true }}
          >
            <AuthProvider value={{ auth, user: currentUser, data: userData, setData: setUserData }}>
              <BrowserRouter basename="/">
                <Switch>
                  <Route path="/marketplace" component={MarketplacePage} />
                  <Route path="/asset/:assetId" component={AssetPage} />
                  <Route path="/account" component={AccountPage} />
                  <Route path="/admin" component={AdminPage} />
                  <Route path="*" component={NotFoundPage} />
                  <Redirect path="/" exact to="marketplace" />
                </Switch>
              </BrowserRouter>
            </AuthProvider>
          </Scrollbar>
        </GlobalCss>
      </DAppProvider>
    </ThemeProvider>
  );
}

export default App;
