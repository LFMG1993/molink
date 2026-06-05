import {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {useAuthStore} from "./store/authStore.ts";
import {Analytics} from "./components/shared/Analytics.tsx";
import {NotificationProvider} from "./providers/shared/NotificationProvider.tsx";
import {CartProvider} from "./context/store/CardContext.tsx";
import {UserAuthProvider} from "./context/store/UserAuthContext.tsx";
import {AdminGuard} from "./auth/AdminGuard.tsx";
import {SmoothView} from "./components/landing/SmoothView.tsx";
import {ThemeProvider} from "./context/shared/ThemeContext.tsx";
import {CookieBanner} from "./components/landing/CookieBanner.tsx";

// Paginas Principales
import MainLayout from './components/landing/MainLayout.tsx';
import HomePage from './pages/landing/HomePage.tsx';
import PortfolioPage from './pages/landing/PortfolioPage.tsx';
import PortfolioDetailsPage from "./pages/landing/PortfolioDetailsPage.tsx";
import DetailsPage from "./pages/landing/DetailsPage.tsx";
import PrivacyPolicyPage from './pages/landing/PrivacyPolicyPage.tsx';
import CookiePolicyPage from "./pages/landing/CookiesPolicyPage.tsx";
import TermsOfServicePage from './pages/landing/TermsOfServicePage.tsx';
import PricingPage from './pages/landing/PricingPage.tsx';
import FAQPage from './pages/landing/FAQPage.tsx';
import ContactPage from "./pages/landing/ContactPage.tsx";
import LandingCheckoutPage from "./pages/landing/CheckoutPage.tsx";
import LandingCheckoutCallbackPage from "./pages/landing/CheckoutCallbackPage.tsx";

// Tienda
import StorePage from "./pages/store/StorePage.tsx";
import AllProductsPage from "./pages/store/AllProductsPage.tsx";
import ProductDetailPage from "./pages/store/ProductDetailPage.tsx";
import CartPage from "./pages/store/CartPage.tsx";
import StoreCheckoutPage from "./pages/store/CheckoutPage.tsx";
import OrderConfirmationPage from "./pages/store/OrderConfirmationPage.tsx";
import CustomerPage from "./pages/shared/CustomerPage.tsx";
import {StoreLayout} from "./components/store/layout/StoreLayout.tsx";

// Administración
import AdminLayout from "./components/admin/AdminLayout.tsx";
import LoginPage from './pages/admin/LoginPage.tsx';

function AdminApp() {
    const {verifyAuth} = useAuthStore();

    useEffect(() => {
        verifyAuth();
    }, [verifyAuth]);

    return (
        <ThemeProvider storageKey="theme-admin" defaultTheme="dark">
            <NotificationProvider>
                <UserAuthProvider>
                    <BrowserRouter>
                        <Analytics/>
                        <Routes>
                            <Route path="/" element={<Navigate to="/admin/login" replace/>}/>
                            <Route path="/admin/login" element={<LoginPage/>}/>
                            <Route path="/admin" element={<AdminGuard><AdminLayout/></AdminGuard>} />
                            <Route path="/admin/*" element={<Navigate to="/admin" replace/>}/>
                        </Routes>
                    </BrowserRouter>
                </UserAuthProvider>
            </NotificationProvider>
        </ThemeProvider>
    );
}

function App() {
    const [domainType, setDomainType] = useState('');

    useEffect(() => {
        const hostname = window.location.hostname;
        let newType = 'landing';
        if (hostname.startsWith('admin')) {
            newType = 'admin';
        } else if (hostname.startsWith('tienda') || hostname.startsWith('shop')) {
            newType = 'shop';
        }
        setDomainType(newType);
    }, []);

    // ADMINISTRACIÓN
    if (domainType === 'admin') {
        return <AdminApp/>;
    }

    // TIENDA
    if (domainType === 'shop') {
        return (
            <ThemeProvider storageKey="theme-shop" defaultTheme="light">
                <NotificationProvider>
                    <CartProvider>
                        <BrowserRouter>
                            <Analytics/>
                            <Routes>
                                <Route path="/" element={<StoreLayout/>}>
                                    <Route index element={<StorePage/>}/>
                                    <Route path="products" element={<AllProductsPage/>}/>
                                    <Route path="products/:id" element={<ProductDetailPage/>}/>
                                    <Route path="cart" element={<CartPage/>}/>
                                    <Route path="checkout/:orderId" element={<StoreCheckoutPage/>}/>
                                    <Route path="checkout" element={<StoreCheckoutPage/>}/>
                                    <Route path="order-confirmation" element={<OrderConfirmationPage/>}/>
                                    <Route path="profile" element={<CustomerPage/>}/>
                                </Route>
                                <Route path="*" element={<Navigate to="/" replace/>}/>
                            </Routes>
                        </BrowserRouter>
                    </CartProvider>
                </NotificationProvider>
            </ThemeProvider>
        );
    }

    // PAGINA PRINCIPAL (landing)
    return (
        <ThemeProvider storageKey="theme-public" defaultTheme="dark">
            <NotificationProvider>
                <UserAuthProvider>
                    <CartProvider>
                        <BrowserRouter>
                            <Analytics/>
                            <CookieBanner/>
                            <Routes>
                        <Route path="/" element={<MainLayout/>}>
                            <Route index element={<SmoothView><HomePage/></SmoothView>}/>
                            <Route path="portfolio" element={<SmoothView><PortfolioPage/></SmoothView>}/>
                            <Route path="portfolio/:slug" element={<SmoothView><PortfolioDetailsPage/></SmoothView>}/>
                            <Route path="details" element={<SmoothView><DetailsPage/></SmoothView>}/>
                            <Route path="pricing" element={<SmoothView><PricingPage/></SmoothView>}/>
                            <Route path="faq" element={<SmoothView><FAQPage/></SmoothView>}/>
                            <Route path="contact" element={<SmoothView><ContactPage/></SmoothView>}/>
                            <Route path="privacity" element={<SmoothView><PrivacyPolicyPage/></SmoothView>}/>
                            <Route path="cookie-policy" element={<SmoothView><CookiePolicyPage/></SmoothView>}/>
                            <Route path="termService" element={<SmoothView><TermsOfServicePage/></SmoothView>}/>
                        </Route>
                        
                        {/* Rutas sin MainLayout (sin Header global) */}
                        <Route path="/checkout" element={<SmoothView><LandingCheckoutPage/></SmoothView>}/>
                        <Route path="/checkout/callback" element={<SmoothView><LandingCheckoutCallbackPage/></SmoothView>}/>
                        
                        <Route path="/admin/*" element={<p>Acceso denegado.</p>}/>
                    </Routes>
                </BrowserRouter>
                    </CartProvider>
                </UserAuthProvider>
            </NotificationProvider>
        </ThemeProvider>
    );
}

export default App;
