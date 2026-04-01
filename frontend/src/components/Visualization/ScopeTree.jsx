import React, { useRef, useState, useEffect } from 'react';
import Tree from 'react-d3-tree';

const transformScopeToD3Tree = (scope) => {
    if (!scope) return {};
    
    const attributes = {};
    if (scope.symbols) {
        Object.values(scope.symbols).forEach(sym => {
            let val = sym.value !== null && sym.value !== undefined ? sym.value : 'undefined';
            attributes[sym.name] = `${val} (${sym.type})`;
        });
    }
    if (Object.keys(attributes).length === 0) {
        attributes["(No variables)"] = "";
    }
    return {
        name: `${(scope.name || "UNNAMED").toUpperCase()} SCOPE`,
        attributes: attributes,
        children: (scope.children && scope.children.length > 0) ? scope.children.map(transformScopeToD3Tree) : undefined
    };
};

const ScopeTree = ({ symbolTable }) => {
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const containerRef = useRef();

    useEffect(() => {
        if (containerRef.current) {
            const dimensions = containerRef.current.getBoundingClientRect();
            setTranslate({ x: dimensions.width / 2, y: 50 });
        }
    }, [symbolTable]);

    if (!symbolTable) return <p className="empty-state">No symbol table available.</p>;

    const treeData = transformScopeToD3Tree(symbolTable);

    return (
        <div className="scope-tree-container">
            <div 
                ref={containerRef}
                className="tree-viewport"
            >
                <Tree 
                    data={treeData} 
                    orientation="vertical"
                    pathFunc="step"
                    translate={translate}
                    nodeSize={{ x: 250, y: 150 }}
                    depthFactor={200}
                    zoomable={true}
                    collapsible={true}
                    renderCustomNodeElement={(rd3tProps) => (
                        <g>
                            <circle r="18" 
                                fill={rd3tProps.nodeDatum.children ? "#71C9CE" : "#A6E3E9"} 
                                stroke="#17252A" strokeWidth="2" />
                            <text fill="#17252A" strokeWidth="0" x="25" y="-8" 
                                style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: "600" }}>
                                {rd3tProps.nodeDatum.name}
                            </text>
                            {Object.entries(rd3tProps.nodeDatum.attributes).map((attr, idx) => (
                                <text key={idx} fill="#2B7A78" x="25" y={12 + idx * 15} 
                                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px" }}>
                                    {attr[0]}{attr[1] ? ` = ${attr[1]}` : ''}
                                </text>
                            ))}
                        </g>
                    )}
                />
            </div>
        </div>
    );
};

export default ScopeTree;
