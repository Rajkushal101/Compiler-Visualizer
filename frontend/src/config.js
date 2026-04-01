const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export default {
    API_BASE_URL,
    DEFAULT_CODE: `// Symbol Table with Scope Management
// Demonstrates: nested scopes, variable shadowing, type+value tracking

int x = 10;
print("global x:", x);

{
    // Inner scope - shadows global x
    int x = 20;
    print("inner x:", x);

    {
        // Deeper nested scope
        int y = x + 5;
        print("deep y:", y);
    }
}

// Back to global scope - x is still 10
print("global x after:", x);`,
    COMPILE_FLAGS: {
        documentation: true,
        verification: true,
        probabilistic: true,
        optimization_level: 1
    }
};
