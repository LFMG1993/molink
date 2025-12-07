import React from 'react';
import {Outlet} from 'react-router-dom';
import {useHashScroll} from "../../hooks/useHashScroll.ts";
import Header from './Header.tsx';
import Footer from './Footer.tsx';
import ScrollToTopButton from "./ScrollToTopButton.tsx";
import { CookieBanner } from './CookieBanner.tsx';

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