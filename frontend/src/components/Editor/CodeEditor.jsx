import React, { useRef, useEffect, useCallback } from 'react';
import { highlightCode } from '../../utils/syntaxHighlight';

const CodeEditor = ({ value, onChange }) => {
    const textareaRef = useRef(null);
    const highlightRef = useRef(null);
    const lineNumbersRef = useRef(null);

    const lines = value ? value.split('\n') : [''];

    const syncScroll = useCallback(() => {
        if (textareaRef.current && highlightRef.current && lineNumbersRef.current) {
            highlightRef.current.scrollTop = textareaRef.current.scrollTop;
            highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
            lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
        }
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;
            const newValue = value.substring(0, start) + '    ' + value.substring(end);
            onChange(newValue);
            requestAnimationFrame(() => {
                e.target.selectionStart = e.target.selectionEnd = start + 4;
            });
        }
    };

    return (
        <div className="code-editor">
            <div className="line-numbers" ref={lineNumbersRef}>
                {lines.map((_, i) => (
                    <div key={i} className="line-number">{i + 1}</div>
                ))}
            </div>
            <div className="editor-content">
                <pre
                    className="syntax-highlight-layer"
                    ref={highlightRef}
                    aria-hidden="true"
                    dangerouslySetInnerHTML={{ __html: highlightCode(value) + '\n' }}
                />
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onScroll={syncScroll}
                    onKeyDown={handleKeyDown}
                    spellCheck="false"
                    autoCapitalize="off"
                    autoCorrect="off"
                    placeholder="Write your code here..."
                />
            </div>
        </div>
    );
};

export default CodeEditor;
