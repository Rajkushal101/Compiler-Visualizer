from ..targets.mips import MIPSGenerator
from ..targets.vm import VMGenerator

class CodeGenerator:
    def __init__(self, target="mips"):
        if target == "mips":
            self.generator = MIPSGenerator()
        else:
            self.generator = VMGenerator()

    def generate(self, ir):
        return self.generator.generate(ir)
