import React from "react";

interface SwitchProps {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
    id?: string;
}

export function Switch({
    checked,
    onCheckedChange,
    disabled = false,
    className = "",
    id
}: SwitchProps) {
    const handleToggle = () => {
        if (!disabled) {
            onCheckedChange(!checked);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            handleToggle();
        }
    };

    return (
        <button type="button" role="switch" aria-checked={checked} id={id}
            disabled={disabled}
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-50 ${checked ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-blue-400/30 shadow-lg shadow-blue-500/25' : 'bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15'} ${className}`}
        >
            {/* Glass effect overlay */}
            < div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>

            {/* Switch thumb */}
            < span className={`inline-block h-4 w-4 transform rounded-full transition-all duration-300 ease-in-out shadow-lg backdrop-blur-xl border border-white/30 ${checked ? 'translate-x-5 bg-white shadow-white/20' : 'translate-x-0.5 bg-gradient-to-b from-white/90 to-white/70'}`}
            >
                {/* Inner glow effect */}
                < div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/40 to-transparent"></div>
            </span>

            {/* Active state glow */}
            {
                checked && (
                    <div className="absolute inset-0 rounded-full animate-pulse bg-gradient-to-r from-blue-500/20 to-purple-600/20" />
                )
            }
        </button>
    );
}
