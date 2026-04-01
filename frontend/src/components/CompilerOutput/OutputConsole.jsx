import React, { useState, useRef, useCallback, useEffect } from 'react';

const OutputConsole = ({ errors, result }) => {
    const [height, setHeight] = useState(120);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);
    const startY = useRef(0);
    const startHeight = useRef(0);

    const getOutputLines = () => {
        const lines = [];
        if (errors && errors.length > 0) {
            errors.forEach(e => lines.push({ type: 'error', text: e }));
        }
        if (result) {
            if (result.tokens) lines.push({ type: 'info', text: `✅ Lexical: ${result.tokens.length} tokens generated` });
            if (result.ast) lines.push({ type: 'info', text: `✅ Syntax: AST constructed successfully` });
            if (result.symbol_table) lines.push({ type: 'info', text: `✅ Semantic: Symbol table built` });
            if (result.ir) lines.push({ type: 'info', text: `✅ IR: ${result.ir.length} TAC instructions` });
            if (result.optimized_ir) {
                const saved = (result.ir?.length || 0) - result.optimized_ir.length;
                lines.push({ type: 'info', text: `✅ Optimizer: ${result.optimized_ir.length} instructions (${saved} eliminated)` });
            }
            if (result.target_code) lines.push({ type: 'success', text: `✅ CodeGen: MIPS assembly generated (${result.target_code.split('\n').length} lines)` });
            if (result.verification_results?.length > 0) lines.push({ type: 'info', text: `✅ Verification: ${result.verification_results.length} checks completed` });
            if (result.documentation) lines.push({ type: 'info', text: `✅ Documentation: Report generated` });
        }
        return lines;
    };

    const handleMouseDown = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
        startY.current = e.clientY;
        startHeight.current = height;
    }, [height]);

    const handleMouseMove = useCallback((e) => {
        if (!isDragging) return;
        const delta = startY.current - e.clientY;
        const newHeight = Math.min(Math.max(startHeight.current + delta, 40), 400);
        setHeight(newHeight);
        setIsCollapsed(false);
    }, [isDragging]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'ns-resize';
            document.body.style.userSelect = 'none';
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const lines = getOutputLines();
    const displayHeight = isCollapsed ? 28 : height;

    return (
        <div
            className={`output-console ${isDragging ? 'dragging' : ''}`}
            ref={containerRef}
            style={{ height: `${displayHeight}px` }}
        >
            {/* Drag Handle */}
            <div
                className="console-drag-handle"
                onMouseDown={handleMouseDown}
            >
                <div className="drag-handle-bar" />
            </div>

            {/* Header */}
            <div className="console-header" onClick={toggleCollapse}>
                <div className="console-header-left">
                    <span className={`console-collapse-icon ${isCollapsed ? 'collapsed' : ''}`}>▾</span>
                    <span className="console-title">Output Console</span>
                </div>
                <span className="console-badge">{lines.length} messages</span>
            </div>

            {/* Body */}
            {!isCollapsed && (
                <div className="console-body">
                    {lines.length === 0 ? (
                        <div className="console-empty">Compile code to see output...</div>
                    ) : (
                        lines.map((line, i) => (
                            <div key={i} className={`console-line console-${line.type}`}>
                                <span className="console-prefix">{line.type === 'error' ? '✗' : '›'}</span>
                                <span className="console-text">{line.text}</span>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default OutputConsole;
