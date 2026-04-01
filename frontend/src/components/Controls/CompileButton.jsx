import React from 'react';

const CompileButton = ({ onClick, loading, disabled }) => {
    return (
        <button 
            className={`compile-btn ${loading ? 'compiling' : ''}`}
            onClick={onClick} 
            disabled={disabled || loading}
        >
            <span className="compile-btn-icon">
                {loading ? (
                    <svg className="spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                )}
            </span>
            <span className="compile-btn-text">
                {loading ? "Compiling..." : "Compile"}
            </span>
        </button>
    );
};

export default CompileButton;
