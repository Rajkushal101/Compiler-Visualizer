import React from 'react';

const ErrorAlert = ({ message, onDismiss }) => {
    if (!message) return null;
    
    return (
        <div className="error-alert glass-panel" role="alert">
            <div className="error-alert-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
            </div>
            <div className="error-alert-content">
                <strong>Compilation Error</strong>
                <p>{message}</p>
            </div>
            {onDismiss && (
                <button className="error-alert-dismiss" onClick={onDismiss} aria-label="Dismiss">
                    ✕
                </button>
            )}
        </div>
    );
};

export default ErrorAlert;
