import React, {useContext} from "react";
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

import Demo from "./home/Demo";
import Landing1 from "./home/Landing1";
import Landing2 from "./home/Landing2";
import Landing3 from "./home/Landing3";
import Landing4 from "./home/Landing4";
import Landing5 from "./home/Landing5";
import Landing6 from "./home/Landing6";
import Landing7 from "./home/Landing7";
import Landing8 from "./home/Landing8";
import Landing9 from "./home/Landing9";
import Landing10 from "./home/Landing10";
import Landing11 from "./home/Landing11";
import Landing12 from "./home/Landing12";

import MarketplacePage from "./pages/Marketplace";
import AssetPage from "./pages/Asset";
import NotFoundPage from "./pages/NotFound";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalCss>
        <Scrollbar
          className="h-full-screen scrollable-content"
          option={{ suppressScrollX: true }}
        >
           <BrowserRouter basename="/">
            <Switch>
              {/* TODO: Remove all of the template paths */}
              <Route path="/demos" component={Demo} exact />
              <Route path="/landing1" component={Landing1} />
              <Route path="/landing2" component={Landing2} />
              <Route path="/landing3" component={Landing3} />
              <Route path="/landing4" component={Landing4} />
              <Route path="/landing5" component={Landing5} />
              <Route path="/landing6" component={Landing6} />
              <Route path="/landing7" component={Landing7} />
              <Route path="/landing8" component={Landing8} />
              <Route path="/landing9" component={Landing9} />
              <Route path="/landing10" component={Landing10} />
              <Route path="/landing11" component={Landing11} />
              <Route path="/landing12" component={Landing12} />

              

              <Route path="/marketplace" component={MarketplacePage} />
              <Route path="/asset/:assetId" component={AssetPage} />
              <Route path="*" component={NotFoundPage} />
              <Redirect path="/" exact to="marketplace" />
            </Switch>
          </BrowserRouter>
        </Scrollbar>
      </GlobalCss>
    </ThemeProvider>
  );
}

export default App;
