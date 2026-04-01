import React from 'react';

const OptimizedIRPanel = ({ ir, optimized_ir }) => {
    if (!optimized_ir || optimized_ir.length === 0) {
        return (
            <div className="panel optimized-ir-panel">
                <h3 className="panel-title">⚡ Optimized IR Diff</h3>
                <p className="empty-state">No optimized IR available.</p>
            </div>
        );
    }

    const original = ir || [];
    const optimized = optimized_ir || [];
    const removed = original.length - optimized.length;

    return (
        <div className="panel optimized-ir-panel">
            <h3 className="panel-title">⚡ Optimization Diff</h3>
            <p className="panel-description">
                Comparison of original ({original.length} instructions) vs optimized ({optimized.length} instructions).
                {removed > 0 && <strong> {removed} instruction(s) eliminated.</strong>}
            </p>

            <div className="diff-view">
                <div className="diff-column">
                    <div className="diff-header original">Original IR ({original.length})</div>
                    {original.map((q, i) => {
                        const isRemoved = !optimized.some(o => 
                            o.op === q.op && o.arg1 === q.arg1 && o.arg2 === q.arg2 && o.result === q.result
                        );
                        return (
                            <div key={i} className={`diff-line ${isRemoved ? 'removed' : ''}`}>
                                <span className="diff-num">{i + 1}</span>
                                <code>{q.op} {q.arg1 !== '' ? q.arg1 : '_'}, {q.arg2 !== '' ? q.arg2 : '_'} → {q.result || '_'}</code>
                            </div>
                        );
                    })}
                </div>
                <div className="diff-column">
                    <div className="diff-header optimized">Optimized IR ({optimized.length})</div>
                    {optimized.map((q, i) => (
                        <div key={i} className="diff-line added">
                            <span className="diff-num">{i + 1}</span>
                            <code>{q.op} {q.arg1 !== '' ? q.arg1 : '_'}, {q.arg2 !== '' ? q.arg2 : '_'} → {q.result || '_'}</code>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OptimizedIRPanel;
