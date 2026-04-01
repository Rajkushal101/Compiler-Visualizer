import random

class ProbabilisticExecutor:
    """Simulates probabilistic execution by running the program 
    multiple times with slight value perturbations to show value ranges."""
    
    def execute(self, ast, symbol_table, num_runs=100):
        results = {
            "num_runs": num_runs,
            "variables": {},
            "summary": ""
        }
        
        # Collect all declared variables with their values
        var_data = {}
        self._collect_variables(symbol_table, var_data)
        
        for var_name, var_info in var_data.items():
            base_val = var_info.get("value", 0)
            if base_val is None:
                base_val = 0
            try:
                base_val = int(base_val)
            except (ValueError, TypeError):
                continue
                
            # Run probabilistic simulations with ±10% noise
            simulated = []
            for _ in range(num_runs):
                noise = random.uniform(-0.1, 0.1) * max(abs(base_val), 1)
                simulated.append(round(base_val + noise, 2))
            
            results["variables"][var_name] = {
                "base_value": base_val,
                "min": min(simulated),
                "max": max(simulated),
                "mean": round(sum(simulated) / len(simulated), 2),
                "std_dev": round((sum((x - base_val)**2 for x in simulated) / len(simulated))**0.5, 2),
                "samples": simulated[:10]
            }
        
        total_vars = len(results["variables"])
        results["summary"] = f"Probabilistic analysis completed: {total_vars} variable(s) analyzed over {num_runs} simulated runs."
        
        return results

    def _collect_variables(self, scope, var_data, prefix=""):
        scope_name = prefix + scope.name if prefix else scope.name
        for name, sym in scope.symbols.items():
            key = f"{scope_name}.{name}"
            var_data[key] = {
                "type": sym.type,
                "value": sym.value,
                "scope": scope_name
            }
        for child in scope.children:
            self._collect_variables(child, var_data, scope_name + "/")
