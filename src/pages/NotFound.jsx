import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Button } from "@mui/material";
import Link from '@mui/material/Link';

const NotFound = () => {
  return (
    <div className="landing">
      <Header />
      <div className="section section-404" id="404">
        <div className="container" style={{ height: "600px" }}>
          <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="text-center">
              <h1>404 Not Found</h1>
              <p>That page wasn't found! Try going back to the marketplace.</p>
              <Button color="primary">
                <Link href="/marketplace">Go to Marketplace</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
