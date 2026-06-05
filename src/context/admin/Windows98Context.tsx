import React, { createContext, useContext, useState, useCallback } from 'react';

export interface WindowData {
    id: string;
    title: string;
    icon?: string;
    isMinimized: boolean;
}

interface Windows98ContextProps {
    windows: WindowData[];
    openApps: string[];
    registerWindow: (window: Omit<WindowData, 'isMinimized'>) => void;
    unregisterWindow: (id: string) => void;
    toggleMinimize: (id: string) => void;
    isMinimized: (id: string) => boolean;
    openApp: (appId: string) => void;
    closeApp: (appId: string) => void;
    bringToFront: (appId: string) => void;
}

const Windows98Context = createContext<Windows98ContextProps | undefined>(undefined);

export const Windows98Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [windows, setWindows] = useState<WindowData[]>([]);
    const [openApps, setOpenApps] = useState<string[]>([]);

    const openApp = useCallback((appId: string) => {
        setOpenApps(prev => {
            const filtered = prev.filter(id => id !== appId);
            return [...filtered, appId];
        });
    }, []);

    const bringToFront = useCallback((appId: string) => {
        setOpenApps(prev => {
            if (!prev.includes(appId)) return prev;
            const filtered = prev.filter(id => id !== appId);
            return [...filtered, appId];
        });
    }, []);

    const closeApp = useCallback((appId: string) => {
        setOpenApps(prev => prev.filter(id => id !== appId));
    }, []);

    const registerWindow = useCallback((window: Omit<WindowData, 'isMinimized'>) => {
        setWindows(prev => {
            if (prev.find(w => w.id === window.id)) return prev;
            return [...prev, { ...window, isMinimized: false }];
        });
    }, []);

    const unregisterWindow = useCallback((id: string) => {
        setWindows(prev => prev.filter(w => w.id !== id));
    }, []);

    const toggleMinimize = useCallback((id: string) => {
        setWindows(prev => prev.map(w => {
            if (w.id === id) {
                if (w.isMinimized) {
                    bringToFront(id);
                }
                return { ...w, isMinimized: !w.isMinimized };
            }
            return w;
        }));
    }, [bringToFront]);

    const isMinimized = useCallback((id: string) => {
        const win = windows.find(w => w.id === id);
        return win ? win.isMinimized : false;
    }, [windows]);

    return (
        <Windows98Context.Provider value={{
            windows, openApps, registerWindow, unregisterWindow, toggleMinimize, isMinimized, openApp, closeApp, bringToFront
        }}>    {children}
        </Windows98Context.Provider>
    );
};

export const useWindows98 = () => {
    const context = useContext(Windows98Context);
    if (!context) {
        throw new Error('useWindows98 must be used within a Windows98Provider');
    }
    return context;
};
