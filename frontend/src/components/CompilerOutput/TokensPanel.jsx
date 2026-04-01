import React from 'react';
import { formatTokenType } from '../../utils/formatters';

const TokensPanel = ({ tokens }) => (
    <div className="panel tokens-panel">
        <h3 className="panel-title">🔤 Lexical Analysis — Token Stream</h3>
        <p className="panel-description">Each lexeme identified by the scanner with its type, value, and source position.</p>
        <div className="tokens-grid">
            <div className="token-table-wrapper">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Icon</th>
                            <th>Type</th>
                            <th>Value</th>
                            <th>Line</th>
                            <th>Col</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tokens && tokens.map((t, i) => (
                            <tr key={i} className={`token-row token-${t.type?.toLowerCase()}`}>
                                <td className="token-index">{i + 1}</td>
                                <td className="token-icon">{formatTokenType(t.type)}</td>
                                <td><code className="token-type-badge">{t.type}</code></td>
                                <td><code className="token-value">{JSON.stringify(t.value)}</code></td>
                                <td className="token-pos">{t.line}</td>
                                <td className="token-pos">{t.col}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        {tokens && (
            <div className="token-summary">
                <span className="summary-badge">Total: {tokens.length} tokens</span>
                <span className="summary-badge">Types: {new Set(tokens.map(t => t.type)).size} unique</span>
            </div>
        )}
    </div>
);

export default TokensPanel;
