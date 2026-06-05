import { Outlet } from "react-router-dom";
import { StoreHeader } from "./StoreHeader.tsx";
import { StoreFooter } from "./StoreFooter.tsx";

export function StoreLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <StoreHeader />
            <main className="flex-grow">
                <Outlet />
            </main>
            <StoreFooter />
        </div>
    );
}
