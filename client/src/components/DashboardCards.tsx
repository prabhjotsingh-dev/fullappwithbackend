import { icons } from "../assets/Icons";
import { type CardConfig } from "../assets/Types";

const DashboardCard = ({ title, iconPath, rows }: CardConfig) => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
        <span className="w-5 h-5 text-blue-600 dark:text-blue-400">{icons[iconPath]}</span>
      </div>
      <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{title}</h2>
    </div>
    <div className="space-y-3">
      {rows.map((row, i) => (
        <div key={i} className="flex justify-between items-start border-b border-slate-100 dark:border-slate-700 pb-2 last:border-0">
          <span className="text-sm text-slate-500 dark:text-slate-400">{row.label}</span>
          <span
            className={`text-sm font-medium text-slate-900 dark:text-slate-100 text-right ${row.mono ? "font-mono text-xs break-all max-w-48" : ""} ${row.capitalize && row.value ? "capitalize" : ""}`}>
            {row.value || "-"}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default DashboardCard;
