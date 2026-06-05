import * as React from 'react';
import type {DashboardSummary} from "../../types";
import {useQuery} from '@tanstack/react-query';
import {Users, TrendingUp, MousePointerClick, Hourglass, Terminal} from 'lucide-react';
import {Spinner} from '../../components/shared/Spinner.tsx';
import {analyticsService} from "../../services/shared/analyticsService.ts";
import {DraggableWindow} from "../../components/admin/DraggableWindow.tsx";

const DashboardPage = () => {
    const {data, isLoading} = useQuery<DashboardSummary>({
        queryKey: ['dashboardSummary'],
        queryFn: analyticsService.getDashboardSummary,
        staleTime: 1000 * 60 * 5,
    });

    const [openWindows, setOpenWindows] = React.useState<{ [key: string]: boolean }>({
        stats: false,
        welcome: false,
    });

    const toggleWindow = (key: string) => {
        setOpenWindows(prev => ({...prev, [key]: true}));
    };

    const closeWindow = (key: string) => {
        setOpenWindows(prev => ({...prev, [key]: false}));
    };

    return (
        <div className="w-full h-full p-4 flex flex-col gap-4 items-start">
            {/* Icono de Escritorio: Bienvenida */}
            <div 
                onDoubleClick={() => toggleWindow('welcome')}
                className="w-24 flex flex-col items-center gap-2 cursor-pointer group p-2 hover:bg-[var(--os-window-title-bg)] rounded-sm transition-colors border border-transparent hover:border-[var(--os-window-border)]"
            >
                <div className="w-12 h-12 flex items-center justify-center text-[var(--os-accent)] group-hover:scale-110 transition-transform">
                    <Terminal className="w-10 h-10" strokeWidth={1.5} />
                </div>
                <span className="text-[var(--os-text)] text-xs text-center px-1 font-medium tracking-wide bg-[var(--os-bg)] group-hover:bg-transparent">README.txt</span>
            </div>

            {/* Icono de Escritorio: Estadísticas */}
            <div 
                onDoubleClick={() => toggleWindow('stats')}
                className="w-24 flex flex-col items-center gap-2 cursor-pointer group p-2 hover:bg-[var(--os-window-title-bg)] rounded-sm transition-colors border border-transparent hover:border-[var(--os-window-border)]"
            >
                <div className="w-12 h-12 flex items-center justify-center text-[var(--os-accent)] group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-10 h-10" strokeWidth={1.5} />
                </div>
                <span className="text-[var(--os-text)] text-xs text-center px-1 font-medium tracking-wide bg-[var(--os-bg)] group-hover:bg-transparent">SYS_METRICS</span>
            </div>
            {/* Ventana de Bienvenida */}
            {openWindows.welcome && (
                <DraggableWindow 
                    id="welcome"
                    title="README.txt" 
                    onClose={() => closeWindow('welcome')}
                    initialPos={{x: 100, y: 50}}
                    defaultSize={{width: 450, height: 250}}
                >
                    <div className="flex flex-col gap-4 h-full p-4 bg-transparent text-[var(--os-text)]">
                        <div className="flex items-start gap-4 border-b border-[var(--os-window-border)] pb-4 opacity-80">
                            <Terminal className="w-10 h-10 text-[var(--os-accent)] mt-1" />
                            <div>
                                <h2 className="text-xl font-bold mb-1 tracking-widest uppercase">System Initialization</h2>
                                <p className="text-sm opacity-80 leading-relaxed font-mono">
                                    [SYS_MSG] Bienvenido a la terminal administrativa.<br/>
                                    [STATUS] Todos los sistemas en línea.<br/>
                                    [HINT] Explora los módulos desde el menú de inicio inferior.
                                </p>
                            </div>
                        </div>
                    </div>
                </DraggableWindow>
            )}

            {/* Ventana de Estadísticas */}
            {openWindows.stats && (
                <DraggableWindow 
                    id="stats"
                    title="SYS_METRICS_DASHBOARD" 
                    onClose={() => closeWindow('stats')}
                    initialPos={{x: 150, y: 120}}
                    defaultSize={{width: 600, height: 400}}
                >
                    <div className="h-full bg-transparent p-4 overflow-auto text-[var(--os-text)]">
                        <div className="flex items-center gap-3 mb-6 pb-2 border-b border-[var(--os-window-border)] opacity-80">
                            <TrendingUp className="w-5 h-5 text-[var(--os-accent)]" />
                            <h3 className="font-bold tracking-widest text-sm uppercase">Resumen de Rendimiento [LIVE]</h3>
                        </div>

                        {isLoading ? (
                            <div className="flex justify-center items-center h-40">
                                <Spinner/>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-4 bg-[var(--os-window-title-bg)] border border-[var(--os-window-border)] hover:shadow-[0_0_15px_var(--os-window-border)] transition-shadow">
                                    <div className="flex items-center gap-2 mb-2 opacity-80">
                                        <Users className="w-4 h-4 text-[var(--os-accent)]" />
                                        <span className="text-xs font-medium tracking-wide uppercase">Users_Active</span>
                                    </div>
                                    <div className="text-3xl font-mono text-[var(--os-accent)] font-bold">
                                        {data?.activeUsers ?? 0}
                                    </div>
                                </div>
                                <div className="p-4 bg-[var(--os-window-title-bg)] border border-[var(--os-window-border)] hover:shadow-[0_0_15px_var(--os-window-border)] transition-shadow">
                                    <div className="flex items-center gap-2 mb-2 opacity-80">
                                        <TrendingUp className="w-4 h-4 text-[var(--os-accent)]" />
                                        <span className="text-xs font-medium tracking-wide uppercase">New_Users(7D)</span>
                                    </div>
                                    <div className="text-3xl font-mono text-[var(--os-accent)] font-bold">
                                        +{data?.newUsers ?? 0}
                                    </div>
                                </div>
                                <div className="p-4 bg-[var(--os-window-title-bg)] border border-[var(--os-window-border)] hover:shadow-[0_0_15px_var(--os-window-border)] transition-shadow">
                                    <div className="flex items-center gap-2 mb-2 opacity-80">
                                        <MousePointerClick className="w-4 h-4 text-[var(--os-accent)]" />
                                        <span className="text-xs font-medium tracking-wide uppercase">Conv_Rate</span>
                                    </div>
                                    <div className="text-3xl font-mono text-[var(--os-accent)] font-bold">
                                        {data?.conversionRate ?? 0}%
                                    </div>
                                </div>
                                <div className="p-4 bg-[var(--os-window-title-bg)] border border-[var(--os-window-border)] hover:shadow-[0_0_15px_var(--os-window-border)] transition-shadow">
                                    <div className="flex items-center gap-2 mb-2 opacity-80">
                                        <Hourglass className="w-4 h-4 text-[var(--os-accent)]" />
                                        <span className="text-xs font-medium tracking-wide uppercase">Avg_Session</span>
                                    </div>
                                    <div className="text-3xl font-mono text-[var(--os-accent)] font-bold">
                                        {data?.avgSessionDuration ?? '0m 0s'}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </DraggableWindow>
            )}
        </div>
    );
}

export default DashboardPage;