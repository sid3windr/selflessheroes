import Expression from './Expression'
import {
  MismatchStatementException,
  ForbiddenVariableIdentifierException
} from '../CompilerException'
import {
  NotDecompilableStatementException
} from '../DecompilerException'

export default class VariableIdentifier extends Expression {
  constructor(parent, line, column) {
    super('VariableIdentifier', parent, line, column)
    this.name = null
  }

  compile(config) {
    let joinedCode = this.code.join(' ')
    let res = joinedCode.match(VariableIdentifier.codeRegExp)
    if (!res) {
      throw new MismatchStatementException('you try to compile as a variable a statement which is not one', this)
    }

    this.name = joinedCode.trim()
    let allowedNames = config.getAllowedVariableIdentifiers()

    if (!allowedNames.some(allowedName => allowedName === this.name)) {
      throw new ForbiddenVariableIdentifierException(`the variable name ''${this.name}' is forbidden. You may choose between the following names: ${allowedNames}`, this)
    }
  }

  decompile(indent, line, column) {
    super.decompile(indent, line, column)

    if (!this.name) {
      throw new NotDecompilableStatementException('this variable identifier has no name', this)
    }
    this.code = [this.name]

    return true
  }

  computeValue(context) {
    return context.variables[this.name]
  }
}

VariableIdentifier.codeRegExp = /^\s*([a-z])\s*$/