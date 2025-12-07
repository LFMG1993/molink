import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/general/MainLayout.tsx';
import HomePage from './pages/HomePage.tsx';
import DetailsPage from './pages/DetailsPage.tsx';
import PortfolioPage from './pages/PortfolioPage.tsx';
import PortfolioDetailsPage from "./pages/PortfolioDetailsPage.tsx";
import PrivacyPolicy from './pages/PrivacyPolicyPage.tsx';
import CookiePolicyPage from "./pages/CookiesPolicyPage.tsx";
import TermsOfService from './pages/TermsOfServicePage.tsx';
import {Analytics} from "./components/general/Analytics.tsx";

function App() {
    return (
        <BrowserRouter>
            <Analytics />
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="portfolio" element={<PortfolioPage />} />
                    <Route path="portfolio/:slug" element={<PortfolioDetailsPage />} />
                    <Route path="details" element={<DetailsPage />} />
                    <Route path="privacity" element={<PrivacyPolicy />} />
                    <Route path="cookie-policy" element={<CookiePolicyPage />} />
                    <Route path="termService" element={<TermsOfService />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}


export default App
