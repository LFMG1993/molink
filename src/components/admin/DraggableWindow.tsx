import * as React from 'react';
import { X, Maximize2, Minus } from 'lucide-react';
import { useWindows98 } from '../../context/admin/Windows98Context';

interface DraggableWindowProps {
    id: string;
    title: string;
    icon?: string;
    children: React.ReactNode;
    onClose: () => void;
    initialPos?: { x: number, y: number };
    defaultSize?: { width: number, height: number };
    defaultMaximized?: boolean;
}

export const DraggableWindow: React.FC<DraggableWindowProps> = ({
    id,
    title,
    icon,
    children,
    onClose,
    initialPos = { x: 50, y: 50 },
    defaultSize = { width: 400, height: 300 },
    defaultMaximized = false
}) => {
    const { registerWindow, unregisterWindow, toggleMinimize, isMinimized, bringToFront, openApps } = useWindows98();

    const [pos, setPos] = React.useState(initialPos);
    const [isDragging, setIsDragging] = React.useState(false);
    const [rel, setRel] = React.useState({ x: 0, y: 0 });
    const [size, setSize] = React.useState(defaultSize);
    const [isResizing, setIsResizing] = React.useState(false);
    const [isMaximized, setIsMaximized] = React.useState(defaultMaximized);

    // Registrar y desregistrar la ventana en el contexto global
    React.useEffect(() => {
        registerWindow({ id, title, icon });
        return () => {
            unregisterWindow(id);
        };
    }, [id, title, icon, registerWindow, unregisterWindow]);

    const minimized = isMinimized(id);

    const handleFocus = () => {
        bringToFront(id);
    };

    const onTitleMouseDown = (e: React.MouseEvent) => {
        if (e.button !== 0 || isMaximized) return;
        setIsDragging(true);
        setRel({
            x: e.clientX - pos.x,
            y: e.clientY - pos.y
        });
    };

    const onMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
    };

    const onMouseMove = React.useCallback((e: MouseEvent) => {
        if (isDragging) {
            setPos({
                x: e.clientX - rel.x,
                y: e.clientY - rel.y
            });
        }
        if (isResizing) {
            setSize({
                width: Math.max(250, e.clientX - pos.x),
                height: Math.max(150, e.clientY - pos.y)
            });
        }
    }, [isDragging, isResizing, rel.x, rel.y, pos.x, pos.y]);

    React.useEffect(() => {
        if (isDragging || isResizing) {
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        } else {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    }, [isDragging, isResizing, onMouseMove]);

    return (
        <div
            className={`absolute admin-os-window bg-[var(--os-window-bg)] border border-[var(--os-window-border)] shadow-[var(--os-window-shadow)] overflow-hidden flex flex-col ${isMaximized ? 'w-full h-full left-0 top-0' : 'rounded-sm'} ${minimized ? 'hidden' : ''}`}
            style={
                !isMaximized
                    ? {
                        left: pos.x,
                        top: pos.y,
                        width: size.width,
                        height: size.height,
                        zIndex: openApps.indexOf(id) + 10,
                    }
                    : { zIndex: openApps.indexOf(id) + 10, bottom: '40px' }
            }
            onMouseDownCapture={handleFocus}
        >
            {/* Barra de título */}
            <div
                onMouseDown={onTitleMouseDown}
                className="bg-[var(--os-window-title-bg)] border-b border-[var(--os-window-border)] flex justify-between items-center px-3 py-1 select-none"
                style={{ cursor: isMaximized ? 'default' : 'move' }}
            >
                <div className="font-bold text-sm tracking-widest flex items-center gap-2 text-[var(--os-text)] uppercase">
                    {icon && <img src={icon} alt="" className="w-4 h-4 opacity-80" />}
                    {title}
                </div>
                <div className="flex gap-2">
                    <button onClick={(e) => { e.stopPropagation(); toggleMinimize(id); }} className="text-[var(--os-text)] opacity-70 hover:opacity-100 hover:text-[var(--os-accent)] transition-colors">
                        <Minus size={14} />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }} className="text-[var(--os-text)] opacity-70 hover:opacity-100 hover:text-[var(--os-accent)] transition-colors">
                        <Maximize2 size={14} />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="text-red-400 opacity-70 hover:opacity-100 hover:text-red-500 transition-colors">
                        <X size={14} />
                    </button>
                </div>
            </div>

            {/* Contenido */}
            <div className="flex-1 overflow-auto p-2">
                {children}
            </div>

            {/* Resize handle */}
            {!isMaximized && (
                <div
                    className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize flex items-end justify-end p-1 opacity-50 hover:opacity-100 transition-opacity"
                    onMouseDown={(e) => { e.stopPropagation(); setIsResizing(true); }}
                >
                    <div className="w-2 h-2 border-r-2 border-b-2 border-[var(--os-window-border)]"></div>
                </div>
            )}
        </div>
    );
};
