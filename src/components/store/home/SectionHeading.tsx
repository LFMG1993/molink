import {ChevronRight} from 'react-bootstrap-icons';
import {Link} from 'react-router-dom';

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    action?: string;
    to?: string;
}

export function SectionHeading({title, subtitle, action, to}: SectionHeadingProps) {
    return (
        <div className="flex items-end justify-between mb-6 px-1">
            <div>
                <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
                {subtitle && <p className="text-slate-500 text-sm mt-1">{subtitle}</p>}
            </div>
            {action && to && (
                <Link to={to}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
                    {action}{' '}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"/>
                </Link>
            )}
        </div>
    );
}
