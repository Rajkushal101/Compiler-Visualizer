import React from 'react';

const phases = [
    { key: 'lexical', label: 'Lexical', icon: '🔤' },
    { key: 'syntax', label: 'Syntax', icon: '🌳' },
    { key: 'semantic', label: 'Semantic', icon: '🔍' },
    { key: 'ir', label: 'IR Gen', icon: '⚙️' },
    { key: 'optimize', label: 'Optimize', icon: '🚀' },
    { key: 'codegen', label: 'CodeGen', icon: '💻' },
];

const PhaseStepper = ({ completedPhases = 0 }) => {
    return (
        <div className="phase-stepper">
            {phases.map((phase, index) => (
                <React.Fragment key={phase.key}>
                    <div className={`phase-step ${index < completedPhases ? 'completed' : ''} ${index === completedPhases ? 'active' : ''}`}>
                        <div className="phase-step-icon">{phase.icon}</div>
                        <div className="phase-step-label">{phase.label}</div>
                    </div>
                    {index < phases.length - 1 && (
                        <div className={`phase-connector ${index < completedPhases ? 'completed' : ''}`} />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default PhaseStepper;
