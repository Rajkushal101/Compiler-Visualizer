import React from 'react';
import { formatIRInstruction } from '../../utils/formatters';

const IRPanel = ({ ir, optimized_ir }) => {
    const renderIRTable = (instructions, title, icon) => (
        <div className="ir-section">
            <h4 className="ir-section-title">{icon} {title}</h4>
            {instructions && instructions.length > 0 ? (
                <table className="styled-table ir-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Operator</th>
                            <th>Arg 1</th>
                            <th>Arg 2</th>
                            <th>Result</th>
                            <th>Readable</th>
                        </tr>
                    </thead>
                    <tbody>
                        {instructions.map((q, i) => (
                            <tr key={i} className={`ir-row ir-op-${q.op?.toLowerCase()}`}>
                                <td className="ir-index">{i + 1}</td>
                                <td><code className="ir-op-badge">{q.op}</code></td>
                                <td><code>{q.arg1 !== "" ? JSON.stringify(q.arg1) : "—"}</code></td>
                                <td><code>{q.arg2 !== "" ? JSON.stringify(q.arg2) : "—"}</code></td>
                                <td><code className="ir-result">{q.result || "—"}</code></td>
                                <td className="ir-readable">{formatIRInstruction(q, i)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="empty-state">No instructions generated.</p>
            )}
        </div>
    );

    const savings = ir && optimized_ir ? ir.length - optimized_ir.length : 0;

    return (
        <div className="panel ir-panel">
            <h3 className="panel-title">⚙️ Intermediate Representation (Three-Address Code)</h3>
            <p className="panel-description">Quadruple format: (Operator, Arg1, Arg2, Result)</p>
            
            {savings > 0 && (
                <div className="optimization-banner">
                    🚀 Optimization saved <strong>{savings}</strong> instruction{savings !== 1 ? 's' : ''} 
                    ({ir ? Math.round((savings / ir.length) * 100) : 0}% reduction)
                </div>
            )}
            
            <div className="ir-comparison">
                {renderIRTable(ir, "Base IR (Unoptimized)", "📄")}
                {renderIRTable(optimized_ir, "Optimized IR", "⚡")}
            </div>
        </div>
    );
};

export default IRPanel;
