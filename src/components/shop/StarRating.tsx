import {StarFill} from "react-bootstrap-icons";

export const StarRating = ({ rating, count }: { rating: number, count?: number }) => (
    <div className="flex items-center gap-1.5">
        <div className="flex text-amber-400">
            <StarFill className="w-3.5 h-3.5 fill-current" />
        </div>
        <span className="text-xs font-bold text-slate-700">{rating}</span>
        {count !== undefined && <span className="text-xs text-slate-400 border-l border-slate-200 pl-1.5 ml-0.5">{count} ventas</span>}
    </div>
);
