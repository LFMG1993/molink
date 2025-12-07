import React from 'react';
import {Outlet} from 'react-router-dom';
import {useHashScroll} from "../../hooks/useHashScroll";
import Header from './Header';
import Footer from './Footer';
import ScrollToTopButton from "./ScrollToTopButton";
import { CookieBanner } from './CookieBanner';

const MainLayout: React.FC = () => {
    useHashScroll();
    return (
        <div className="bg-black text-white font-default">
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
            <ScrollToTopButton/>
            <CookieBanner/>
        </div>
    );
};

export default MainLayout;