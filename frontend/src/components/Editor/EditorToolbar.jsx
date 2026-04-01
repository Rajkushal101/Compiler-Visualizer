import React from 'react';

const EditorToolbar = ({ onClear, onSample, lineCount, charCount }) => {
    return (
        <div className="editor-toolbar">
            <div className="editor-toolbar-left">
                <span className="toolbar-label">Source Code</span>
                <span className="toolbar-badge">{lineCount || 0} lines</span>
                <span className="toolbar-badge">{charCount || 0} chars</span>
            </div>
            <div className="editor-toolbar-right">
                <button className="toolbar-btn" onClick={onSample} title="Load sample code">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10 9 9 9 8 9"/>
                    </svg>
                    Sample
                </button>
                <button className="toolbar-btn" onClick={onClear} title="Clear editor">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                    Clear
                </button>
            </div>
        </div>
    );
};

export default EditorToolbar;
