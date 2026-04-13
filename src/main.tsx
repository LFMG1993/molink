import {createRoot} from 'react-dom/client'
import './style/index.css'
import {HelmetProvider} from 'react-helmet-async';
import App from './App.tsx'
import './hooks/shared/i18n.ts';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            retry: 1,
        },
    },
});

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <HelmetProvider>
            <App/>
        </HelmetProvider>
    </QueryClientProvider>,
)
