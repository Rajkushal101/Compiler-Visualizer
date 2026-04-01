import React from 'react';

const LoadingSpinner = ({ message = "Compiling..." }) => {
    return (
        <div className="loading-overlay">
            <div className="loading-spinner-container glass-card">
                <div className="loading-spinner">
                    <div className="spinner-ring"></div>
                    <div className="spinner-ring"></div>
                    <div className="spinner-ring"></div>
                </div>
                <div className="loading-phases">
                    <p className="loading-message">{message}</p>
                    <div className="loading-steps">
                        <span className="step active">Lexing</span>
                        <span className="step-arrow">→</span>
                        <span className="step">Parsing</span>
                        <span className="step-arrow">→</span>
                        <span className="step">Semantic</span>
                        <span className="step-arrow">→</span>
                        <span className="step">IR Gen</span>
                        <span className="step-arrow">→</span>
                        <span className="step">Optimize</span>
                        <span className="step-arrow">→</span>
                        <span className="step">CodeGen</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
