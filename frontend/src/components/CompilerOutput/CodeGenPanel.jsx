import React from 'react';
import { highlightMIPS } from '../../utils/syntaxHighlight';

const CodeGenPanel = ({ code }) => (
    <div className="panel codegen-panel">
        <h3 className="panel-title">💻 Target Code Generation — MIPS Assembly</h3>
        <p className="panel-description">Generated MIPS assembly from the optimized intermediate representation.</p>
        
        {code ? (
            <div className="code-output-wrapper">
                <div className="code-output-header">
                    <span className="code-lang-badge">MIPS</span>
                    <span className="code-line-count">{code.split('\n').length} lines</span>
                </div>
                <pre className="code-output mips-output">
                    <code dangerouslySetInnerHTML={{ __html: highlightMIPS(code) }} />
                </pre>
            </div>
        ) : (
            <p className="empty-state">No target code generated.</p>
        )}
    </div>
);

export default CodeGenPanel;
