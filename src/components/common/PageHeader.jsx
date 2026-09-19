import React from 'react';
import { Breadcrumb } from './Breadcrumb';

export const PageHeader = ({ title, subtitle, breadcrumbItems, action }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/90 font-sans">
      <div className="flex flex-col gap-1.5">
        {breadcrumbItems && <Breadcrumb items={breadcrumbItems} />}
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-heading">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {action && <div className="shrink-0 flex items-center gap-3">{action}</div>}
    </div>
  );
};
