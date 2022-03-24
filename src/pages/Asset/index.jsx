import React, { useEffect } from "react";
import { scrollTo } from "../../utils";
import AssetView from "./AssetView";
import Footer1 from "../../home/sections/Footer1";
import Header from "../../components/Header";

const Asset = () => {
    useEffect(() => {
        scrollTo("root");
    }, [scrollTo]);

    return (
        <div className="landing">
            <Header dark />
            <AssetView />
            <Footer1 />
        </div>
    );
};

export default Asset;
