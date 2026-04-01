import React, { useState } from 'react';
import TokensPanel from './TokensPanel';
import ASTPanel from './ASTPanel';
import SymbolTablePanel from './SymbolTablePanel';
import IRPanel from './IRPanel';
import CodeGenPanel from './CodeGenPanel';
import DocumentationPanel from './DocumentationPanel';
import VerificationPanel from './VerificationPanel';
import ProbabilisticPanel from './ProbabilisticPanel';

const tabConfig = [
    { key: "Tokens", icon: "🔤", label: "Tokens" },
    { key: "AST", icon: "🌳", label: "AST" },
    { key: "Symbol Table", icon: "📊", label: "Symbol Table" },
    { key: "IR", icon: "⚙️", label: "IR" },
    { key: "Target Code", icon: "💻", label: "Target Code" },
    { key: "Probabilistic", icon: "🎲", label: "Probabilistic" },
    { key: "Documentation", icon: "📚", label: "Docs" },
    { key: "Verification", icon: "🛡️", label: "Verification" },
];

const PhaseTabs = ({ result }) => {
    const [activeTab, setActiveTab] = useState("Tokens");

    const renderContent = () => {
        switch(activeTab) {
            case "Tokens": return <TokensPanel tokens={result.tokens} />;
            case "AST": return <ASTPanel ast={result.ast} />;
            case "Symbol Table": return <SymbolTablePanel symbolTable={result.symbol_table} />;
            case "IR": return <IRPanel ir={result.ir} optimized_ir={result.optimized_ir} />;
            case "Target Code": return <CodeGenPanel code={result.target_code} />;
            case "Probabilistic": return <ProbabilisticPanel probabilisticData={result.probabilistic_output} />;
            case "Documentation": return <DocumentationPanel markdownContent={result.documentation} />;
            case "Verification": return <VerificationPanel verificationResults={result.verification_results} />;
            default: return null;
        }
    };

    return (
        <div className="phase-tabs">
            <div className="tab-headers">
                {tabConfig.map((tab, index) => (
                    <button 
                        key={tab.key} 
                        className={`tab-btn ${activeTab === tab.key ? "active" : ""}`}
                        onClick={() => setActiveTab(tab.key)}
                        style={{ animationDelay: `${index * 0.05}s` }}
                    >
                        <span className="tab-icon">{tab.icon}</span>
                        <span className="tab-label">{tab.label}</span>
                    </button>
                ))}
            </div>
            <div className="tab-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default PhaseTabs;
