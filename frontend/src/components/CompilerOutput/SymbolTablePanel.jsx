import React from 'react';
import ScopeTree from '../Visualization/ScopeTree';

const SymbolTablePanel = ({ symbolTable }) => (
    <div className="panel symbol-table-panel">
        <h3 className="panel-title">📊 Symbol Table & Scope Hierarchy</h3>
        <p className="panel-description">Interactive D3.js visualization of variable scopes and nested blocks. Drag to pan, scroll to zoom.</p>
        
        <ScopeTree symbolTable={symbolTable} />
        
        <details className="raw-json-details">
            <summary>📋 View Raw Scope/Symbol JSON</summary>
            <pre className="raw-json">{JSON.stringify(symbolTable, null, 2)}</pre>
        </details>
    </div>
);

export default SymbolTablePanel;
