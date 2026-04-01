import math

class ProbabilisticLiteral:
    def __init__(self, distribution, params):
        self.distribution = distribution  # 'normal', 'uniform', etc.
        self.params = params
        if distribution == 'normal' and len(params) >= 2:
            self.mean = params[0]
            self.var = params[1]

class ProbabilisticPropagator:
    def propagate(self, op, left, right):
        if hasattr(left, 'distribution') and hasattr(right, 'distribution'):
            if left.distribution == 'normal' and right.distribution == 'normal':
                if op == '+':
                    mean = left.mean + right.mean
                    var = left.var + right.var
                    return ProbabilisticLiteral('normal', [mean, var])
                elif op == '-':
                    mean = left.mean - right.mean
                    var = left.var + right.var
                    return ProbabilisticLiteral('normal', [mean, var])
        return None