import React, { useRef, useState, useEffect } from 'react';
import Tree from 'react-d3-tree';

const transformASTtoD3 = (node) => {
    if (!node) return {};
    
    const type = node.type || 'Unknown';
    let name = type;
    const attributes = {};
    
    switch (type) {
        case 'Program':
            name = '📦 Program';
            attributes['statements'] = node.statements ? node.statements.length : 0;
            break;
        case 'Decl':
            name = '📝 Declaration';
            attributes['var'] = node.name;
            break;
        case 'Assignment':
            name = '➡️ Assignment';
            attributes['target'] = node.name;
            break;
        case 'Print':
            name = '🖨️ Print';
            if (node.string_val) attributes['text'] = `"${node.string_val}"`;
            break;
        case 'Block':
            name = '📂 Block';
            attributes['stmts'] = node.statements ? node.statements.length : 0;
            break;
        case 'BinaryOp':
            const opSymbols = { PLUS: '+', MINUS: '-', MULTIPLY: '×', DIVIDE: '÷' };
            name = `🔧 ${opSymbols[node.op] || node.op}`;
            attributes['op'] = node.op;
            break;
        case 'IntLiteral':
            name = `🔢 ${node.value}`;
            attributes['value'] = node.value;
            break;
        case 'VarRef':
            name = `📌 ${node.name}`;
            attributes['ref'] = node.name;
            break;
        default:
            name = type;
    }

    const children = [];
    if (node.statements) {
        node.statements.forEach(s => children.push(transformASTtoD3(s)));
    }
    if (node.value) {
        if (typeof node.value === 'object' && node.value.type) {
            children.push(transformASTtoD3(node.value));
        }
    }
    if (node.var_expr) {
        children.push(transformASTtoD3(node.var_expr));
    }
    if (node.left) children.push(transformASTtoD3(node.left));
    if (node.right) children.push(transformASTtoD3(node.right));
    
    return {
        name,
        attributes,
        children: children.length > 0 ? children : undefined
    };
};

const ASTGraph = ({ ast }) => {
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const containerRef = useRef();

    useEffect(() => {
        if (containerRef.current) {
            const dim = containerRef.current.getBoundingClientRect();
            setTranslate({ x: dim.width / 2, y: 60 });
        }
    }, [ast]);

    if (!ast) return <p className="empty-state">No AST data available.</p>;

    const treeData = transformASTtoD3(ast);

    const nodeColors = {
        '📦': '#71C9CE',
        '📝': '#A6E3E9',
        '➡️': '#CBF1F5',
        '🖨️': '#E3FDFD',
        '📂': '#71C9CE',
        '🔧': '#A6E3E9',
        '🔢': '#2B7A78',
        '📌': '#17252A',
    };

    return (
        <div className="ast-graph-container">
            <h3 className="panel-title">🌳 Abstract Syntax Tree</h3>
            <p className="panel-description">Interactive AST visualization. Drag to pan, scroll to zoom, click nodes to collapse/expand.</p>
            <div ref={containerRef} className="tree-viewport">
                <Tree
                    data={treeData}
                    orientation="vertical"
                    pathFunc="step"
                    translate={translate}
                    nodeSize={{ x: 200, y: 120 }}
                    depthFactor={140}
                    zoomable={true}
                    collapsible={true}
                    renderCustomNodeElement={(rd3tProps) => {
                        const emoji = rd3tProps.nodeDatum.name.substring(0, 2);
                        const bgColor = nodeColors[emoji] || '#71C9CE';
                        return (
                            <g>
                                <circle r="18" fill={bgColor} stroke="#17252A" strokeWidth="2" opacity="0.9" />
                                <text fill="#17252A" strokeWidth="0" x="25" y="-8"
                                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: "600" }}>
                                    {rd3tProps.nodeDatum.name}
                                </text>
                                {Object.entries(rd3tProps.nodeDatum.attributes || {}).map((attr, idx) => (
                                    <text key={idx} fill="#2B7A78" x="25" y={10 + idx * 14}
                                        style={{ fontFamily: "monospace", fontSize: "11px" }}>
                                        {attr[0]}: {attr[1]}
                                    </text>
                                ))}
                            </g>
                        );
                    }}
                />
            </div>
        </div>
    );
};

export default ASTGraph;
