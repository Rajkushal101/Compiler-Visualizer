import React, { useState } from 'react';
import CodeEditor from './components/Editor/CodeEditor';
import EditorToolbar from './components/Editor/EditorToolbar';
import PhaseTabs from './components/CompilerOutput/PhaseTabs';
import OutputConsole from './components/CompilerOutput/OutputConsole';
import CompileButton from './components/Controls/CompileButton';
import PhaseStepper from './components/Controls/PhaseStepper';
import ErrorAlert from './components/Common/ErrorAlert';
import LoadingSpinner from './components/Common/LoadingSpinner';
import { useCompiler } from './hooks/useCompiler';
import config from './config';
import './styles/global.css';

const App = () => {
    const { compile, result, loading, error } = useCompiler();
    const [code, setCode] = useState(config.DEFAULT_CODE);

    const handleCompile = () => {
        compile(code, config.COMPILE_FLAGS);
    };

    const handleClear = () => setCode('');
    const handleSample = () => setCode(config.DEFAULT_CODE);

    const lineCount = code ? code.split('\n').length : 0;
    const charCount = code ? code.length : 0;

    return (
        <div className="app-container">
            {loading && <LoadingSpinner />}
            
            {/* Header */}
            <header className="app-header">
                <div className="header-left">
                    <div className="logo-section">
                        <img src="/logo.jpg" alt="Amrita Logo" className="header-logo" />
                    </div>
                </div>
                <div className="header-center">
                    <h1 className="header-title">Compiler Visualizer</h1>
                    <p className="header-subtitle">Multi-Stage Compilation Pipeline with Interactive Visualization</p>
                </div>
                <div className="header-right">
                    <CompileButton onClick={handleCompile} loading={loading} />
                </div>
            </header>

            {/* Pipeline Stepper */}
            {result && (
                <div className="stepper-bar">
                    <PhaseStepper completedPhases={6} />
                </div>
            )}

            {/* Error Display */}
            {error && <ErrorAlert message={error} onDismiss={() => {}} />}

            {/* Main Content */}
            <main className="app-main">
                <div className="editor-pane">
                    <EditorToolbar 
                        onClear={handleClear} 
                        onSample={handleSample}
                        lineCount={lineCount}
                        charCount={charCount}
                    />
                    <CodeEditor value={code} onChange={setCode} />
                    <OutputConsole errors={result?.errors} result={result} />
                </div>
                <div className="output-pane">
                    {result ? (
                        <PhaseTabs result={result} />
                    ) : (
                        <div className="welcome-pane">
                            <div className="welcome-content glass-card">
                                <div className="welcome-icon">🚀</div>
                                <h2>Ready to Compile</h2>
                                <p>Write code in the editor and click <strong>Compile</strong> to visualize every stage of the compilation pipeline.</p>
                                <div className="welcome-features">
                                    <div className="welcome-feature">
                                        <span>🔤</span> Lexical Analysis
                                    </div>
                                    <div className="welcome-feature">
                                        <span>🌳</span> AST Visualization
                                    </div>
                                    <div className="welcome-feature">
                                        <span>📊</span> Symbol Table
                                    </div>
                                    <div className="welcome-feature">
                                        <span>⚙️</span> IR Generation
                                    </div>
                                    <div className="welcome-feature">
                                        <span>🚀</span> Optimization
                                    </div>
                                    <div className="welcome-feature">
                                        <span>💻</span> MIPS Assembly
                                    </div>
                                    <div className="welcome-feature">
                                        <span>🛡️</span> Verification
                                    </div>
                                    <div className="welcome-feature">
                                        <span>🎲</span> Probabilistic
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default App;
