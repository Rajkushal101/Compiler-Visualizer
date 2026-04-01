import React from 'react';
import ASTGraph from '../Visualization/ASTGraph';

const ASTPanel = ({ ast }) => (
    <div className="panel ast-panel">
        <ASTGraph ast={ast} />
        <details className="raw-json-details">
            <summary>📋 View Raw AST JSON</summary>
            <pre className="raw-json">{JSON.stringify(ast, null, 2)}</pre>
        </details>
    </div>
);

export default ASTPanel;
