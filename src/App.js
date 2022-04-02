import React, { useState, useEffect } from "react";
import {
  Route,
  Switch,
  BrowserRouter,
  Redirect
} from "react-router-dom";

import { } from 'firebase/auth'

import { ThemeProvider } from '@mui/material/styles';
import Scrollbar from "react-perfect-scrollbar";
import { Theme } from "./theme";

import "react-perfect-scrollbar/dist/css/styles.css";
import GlobalCss from "./styles/jss/GlobalCss";

import MarketplacePage from "./pages/Marketplace";
import AssetPage from "./pages/Asset";
import NotFoundPage from "./pages/NotFound";
import AccountPage from "./pages/Account";

import { onAuthStateChanged } from 'firebase/auth';
import { AuthProvider } from "./components/AuthContext";
import { auth } from './firebase'



function App() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <ThemeProvider theme={Theme}>
      <GlobalCss>
        <Scrollbar
          className="h-full-screen scrollable-content"
          option={{ suppressScrollX: true }}
        >
          <AuthProvider value={{ auth, user: currentUser }}>
            <BrowserRouter basename="/">
              <Switch>
                <Route path="/marketplace" component={MarketplacePage} />
                <Route path="/asset/:assetId" component={AssetPage} />
                <Route path="/account" component={AccountPage} />
                <Route path="*" component={NotFoundPage} />
                <Redirect path="/" exact to="marketplace" />
              </Switch>
            </BrowserRouter>
          </AuthProvider>
        </Scrollbar>
      </GlobalCss>
    </ThemeProvider>
  );
}

export default App;
