import {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {useAuthStore} from "./store/authStore.ts";
import {Analytics} from "./components/shared/Analytics.tsx";
import {NotificationProvider} from "./providers/NotificationProvider.tsx";
import {CartProvider} from "./context/CardContext.tsx";
import {UserAuthProvider} from "./context/UserAuthContext.tsx";
import {AdminGuard} from "./auth/AdminGuard.tsx";
import {SuperAdminGuard} from "./auth/SuperAdminGuard.tsx";
import {SmoothView} from "./components/landing/SmoothView.tsx";
import {ThemeProvider} from "./context/ThemeContext.tsx";
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

// Tienda
import StorePage from "./pages/store/StorePage.tsx";
import AllProductsPage from "./pages/store/AllProductsPage.tsx";
import ProductDetailPage from "./pages/store/ProductDetailPage.tsx";
import CartPage from "./pages/store/CartPage.tsx";
import CheckoutPage from "./pages/store/CheckoutPage.tsx";
import OrderConfirmationPage from "./pages/store/OrderConfirmationPage.tsx";
import CustomerPage from "./pages/store/CustomerPage.tsx";

// Administración
import AdminLayout from "./components/admin/AdminLayout.tsx";
import LoginPage from './pages/admin/LoginPage.tsx';
import DashboardPage from './pages/admin/DashboardPage.tsx';
import UsersPage from "./pages/admin/UsersPage.tsx";
import ProductsPage from "./pages/admin/ProductsPage.tsx";
import ProvidersPage from "./pages/admin/ProvidersPage.tsx";
import InventoryPage from "./pages/admin/InventoryPage.tsx";
import EmprendePage from "./pages/admin/EmprendePage.tsx";
import CategoriesPage from "./pages/admin/CategoriesPage.tsx";
import AttributesPage from "./pages/admin/AttributesPage.tsx";
import PaymentMethodsPage from "./pages/admin/PaymentMethodsPage.tsx";
import OrdersPage from "./pages/admin/OrdersPage.tsx";
import ShipmentsPage from "./pages/admin/ShipmentPage.tsx";

function AdminApp() {
    const {verifyAuth} = useAuthStore();

    useEffect(() => {
        verifyAuth();
    }, [verifyAuth]);

    return (
        <ThemeProvider storageKey="theme-admin" defaultTheme="dark">
            <UserAuthProvider>
                <BrowserRouter>
                    <Analytics/>
                    <Routes>
                        <Route path="/" element={<Navigate to="/admin/login" replace/>}/>
                        <Route path="/admin/login" element={<LoginPage/>}/>
                        <Route path="/admin" element={<AdminGuard><AdminLayout/></AdminGuard>}>
                            <Route index element={<DashboardPage/>}/>
                            <Route path="products" element={<ProductsPage/>}/>
                            <Route path="categories" element={<CategoriesPage/>}/>
                            <Route path="attributes" element={<AttributesPage/>}/>
                            <Route path="inventory" element={<InventoryPage/>}/>
                            <Route path="providers" element={<ProvidersPage/>}/>
                            <Route path="orders" element={<OrdersPage/>}/>
                            <Route path="shipments" element={<ShipmentsPage/>}/>
                            <Route path="payment-methods" element={<PaymentMethodsPage/>}/>
                            <Route path="emprende" element={<EmprendePage/>}/>
                            <Route path="users" element={<SuperAdminGuard><UsersPage/></SuperAdminGuard>}/>
                        </Route>
                        <Route path="*" element={<Navigate to="/admin/login" replace/>}/>
                    </Routes>
                </BrowserRouter>
            </UserAuthProvider>
        </ThemeProvider>
    );
}

function App() {
    const [domainType, setDomainType] = useState('');

    useEffect(() => {
        const hostname = window.location.hostname;
        if (hostname.startsWith('admin')) {
            setDomainType('admin');
        } else if (hostname.startsWith('tienda') || hostname.startsWith('shop')) {
            setDomainType('shop');
        } else {
            setDomainType('landing');
        }
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
                                <Route path="/" element={<StorePage/>}/>
                                <Route path="/products" element={<AllProductsPage/>}/>
                                <Route path="/products/:id" element={<ProductDetailPage/>}/>
                                <Route path="/cart" element={<CartPage/>}/>
                                <Route path="/checkout" element={<CheckoutPage/>}/>
                                <Route path="/order-confirmation" element={<OrderConfirmationPage/>}/>
                                <Route path="/account" element={<CustomerPage/>}/>
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
                    <Route path="/admin/*" element={<p>Acceso denegado.</p>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
