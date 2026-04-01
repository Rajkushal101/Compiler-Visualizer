import config from '../config';

const API_BASE_URL = config.API_BASE_URL;

export const compileCode = async (code, flags = {}) => {
    const response = await fetch(`${API_BASE_URL}/compile`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ code, flags })
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const detail = errorData?.detail || `HTTP error! status: ${response.status}`;
        throw new Error(detail);
    }
    return await response.json();
};

export const checkHealth = async () => {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) throw new Error("Backend is not reachable");
    return await response.json();
};
