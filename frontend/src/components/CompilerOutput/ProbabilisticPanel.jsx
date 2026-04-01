import React from 'react';

const ProbabilisticPanel = ({ probabilisticData }) => {
    if (!probabilisticData || !probabilisticData.variables || Object.keys(probabilisticData.variables).length === 0) {
        return (
            <div className="panel probabilistic-panel">
                <h3 className="panel-title">🎲 Probabilistic Execution Analysis</h3>
                <p className="panel-description">Monte Carlo simulation of variable value ranges with ±10% noise perturbation.</p>
                <p className="empty-state">No probabilistic data. Enable the probabilistic flag to run simulations.</p>
            </div>
        );
    }

    const { variables, num_runs, summary } = probabilisticData;

    return (
        <div className="panel probabilistic-panel">
            <h3 className="panel-title">🎲 Probabilistic Execution Analysis</h3>
            <p className="panel-description">{summary}</p>

            <div className="prob-cards">
                {Object.entries(variables).map(([varName, data]) => (
                    <div key={varName} className="prob-card glass-card">
                        <div className="prob-card-header">
                            <code className="prob-var-name">{varName}</code>
                            <span className="prob-base">Base: {data.base_value}</span>
                        </div>
                        <div className="prob-stats">
                            <div className="prob-stat">
                                <span className="prob-stat-label">Min</span>
                                <span className="prob-stat-value">{data.min}</span>
                            </div>
                            <div className="prob-stat">
                                <span className="prob-stat-label">Mean</span>
                                <span className="prob-stat-value highlight">{data.mean}</span>
                            </div>
                            <div className="prob-stat">
                                <span className="prob-stat-label">Max</span>
                                <span className="prob-stat-value">{data.max}</span>
                            </div>
                            <div className="prob-stat">
                                <span className="prob-stat-label">Std Dev</span>
                                <span className="prob-stat-value">{data.std_dev}</span>
                            </div>
                        </div>
                        <div className="prob-range-bar">
                            <div className="prob-range-track">
                                <div className="prob-range-fill" style={{
                                    left: `${Math.max(0, ((data.min - data.min) / Math.max(data.max - data.min, 1)) * 100)}%`,
                                    width: `${Math.min(100, ((data.mean - data.min) / Math.max(data.max - data.min, 1)) * 100)}%`
                                }} />
                            </div>
                        </div>
                        <div className="prob-samples">
                            <span className="prob-samples-label">Samples: </span>
                            {data.samples && data.samples.slice(0, 6).map((s, i) => (
                                <span key={i} className="prob-sample">{s}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProbabilisticPanel;