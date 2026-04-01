import React from 'react';

const VerificationPanel = ({ verificationResults }) => {
    const getIcon = (res) => {
        if (res.includes('✅')) return '✅';
        if (res.includes('❌')) return '❌';
        if (res.includes('⚠️')) return '⚠️';
        if (res.toLowerCase().includes('failed') || res.toLowerCase().includes('error')) return '❌';
        return '✅';
    };

    const getClass = (res) => {
        if (res.includes('❌') || res.toLowerCase().includes('failed')) return 'verify-fail';
        if (res.includes('⚠️')) return 'verify-warn';
        return 'verify-pass';
    };

    const passCount = verificationResults ? verificationResults.filter(r => getClass(r) === 'verify-pass').length : 0;
    const failCount = verificationResults ? verificationResults.filter(r => getClass(r) === 'verify-fail').length : 0;
    const warnCount = verificationResults ? verificationResults.filter(r => getClass(r) === 'verify-warn').length : 0;

    return (
        <div className="panel verification-panel">
            <h3 className="panel-title">🛡️ Formal Verification Results</h3>
            <p className="panel-description">Static analysis checks for initialization, type safety, division-by-zero, and scope integrity.</p>
            
            {verificationResults && verificationResults.length > 0 ? (
                <>
                    <div className="verify-summary">
                        <span className="verify-badge pass">{passCount} Passed</span>
                        {warnCount > 0 && <span className="verify-badge warn">{warnCount} Warnings</span>}
                        {failCount > 0 && <span className="verify-badge fail">{failCount} Failed</span>}
                    </div>
                    <ul className="verify-list">
                        {verificationResults.map((res, index) => (
                            <li key={index} className={`verify-item ${getClass(res)}`}>
                                <span className="verify-icon">{getIcon(res)}</span>
                                <span className="verify-text">{res}</span>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p className="empty-state">No verification conditions to check or all assertions passed.</p>
            )}
        </div>
    );
};

export default VerificationPanel;