import { useState } from 'react';
import { compileCode } from '../services/api';

export const useCompiler = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const compile = async (code, flags) => {
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const data = await compileCode(code, flags);
            if (data.errors && data.errors.length > 0) {
                setError(data.errors.join('\n'));
            }
            setResult(data);
        } catch (err) {
            setError(err.message || 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { compile, result, loading, error };
};
