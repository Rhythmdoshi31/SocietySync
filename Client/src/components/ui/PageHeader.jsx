import React from 'react';

const PageHeader = ({ title, subtitle, children, className = '', ...props }) => {
  return (
    <div 
      className={`flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2 ${className}`}
      {...props}
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-mistral-black/80 font-medium">
            {subtitle}
          </p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-3">
          {children}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
