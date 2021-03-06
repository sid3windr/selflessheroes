import PrimaryStatement from './PrimaryStatement'
import {
  MismatchStatementException,
  InvalidVariableIdentifierException,
  InvalidExpressionException
} from '../CompilerException'
import {
  NotDecompilableStatementException
} from '../DecompilerException'
import {
  indexOfStringInLines,
  createUnitExpression
} from '../utils'

import VariableIdentifier from './VariableIdentifier'
import ValueFunctions from './functions/ValueFunctions'
import IntegerLiteral from './literals/IntegerLiteral'
import DirectionLiteral from './literals/DirectionLiteral'
import InvalidExpression from './InvalidExpression'

const assignOperator = '='

export default class AssignStatement extends PrimaryStatement {
  constructor(line, column) {
    super('AssignStatement', line, column)

    this.variable = null
    this.value = null
  }

  isCodeComplete() {
    return AssignStatement.codeRegExp.test(this.code.join(' '))
  }

  compile(config, context) {
    this.checkIsAllowed(config, 'type_assign')

    let joinedCode = this.code.join(' ')
    let res = joinedCode.match(AssignStatement.codeRegExp)
    if (!res) {
      throw new MismatchStatementException('you try to compile as an assign statement a statement which is not one', this, {
        template: 'exception_mismatch_statement_template',
        values: {
          statementType: {
            template: 'type_assign'
          }
        }
      })
    }

    let operatorPosition = indexOfStringInLines(assignOperator, this.code)
    operatorPosition = operatorPosition[0]
    this.composite = false

    let variableCode = this.code.slice(0, operatorPosition.start.line + 1)
    let valueCode = this.code.slice(operatorPosition.start.line)

    variableCode[variableCode.length - 1] = variableCode[variableCode.length - 1].substring(0, operatorPosition.start.column)
    valueCode[0] = valueCode[0].substring(operatorPosition.end.column)

    this.variable = createUnitExpression(variableCode, [VariableIdentifier], this, this.line, this.column)

    if (this.variable.type === 'InvalidExpression') {
      let template = config.variables > 0 ? 'exception_invalid_variable_identifier_template' : 'exception_all_forbidden_variable_identifier_template'
      throw new InvalidVariableIdentifierException('this identifier is not a valid variable identifier', this.variable, {
        template: template,
        values: {
          variable: this.variable.code.join(' ').trim(),
          allowedIdentifiers: config.getAllowedVariableIdentifiers()
        }
      })
    }

    this.variable.compile(config, context)

    this.value = createUnitExpression(valueCode, [...Object.values(ValueFunctions)],
      this, this.line + operatorPosition.end.line, operatorPosition.end.column)

    if (this.value.type === 'InvalidExpression') {
      throw new InvalidExpressionException('this identifier is not a value function', this.value, {
        template: 'exception_invalid_value_function_template',
        values: {
          code: this.value.code.join(' ').trim(),
          allowedFunctions: config.valueFunctions.map(f => `${f.keyword}()`)
        }
      })
    }
    this.value.compile(config, context)
  }

  decompile(indent, line, column) {
    super.decompile(indent, line, column)

    let executable = true
    let code = ''

    if (!this.value) {
      throw new NotDecompilableStatementException('this assign statement has no value', this)
    }

    let variable = this.undefinedCode
    if (this.variable) {
      executable &= this.variable.decompile(indent, line, this.column + indent + code.length)
      variable = this.variable.code[0]
    } else {
      executable = false
    }

    code += `${variable} = `

    let value = this.undefinedCode
    if (this.value) {
      executable &= this.value.decompile(indent, line, this.column + indent + code.length)
      value = this.value.code[0]
    } else {
      executable = false
    }

    code += value
    this.code = [code]
    this.indentCode(indent)

    return executable
  }

  getStepPriority() {
    return this.value.getStepPriority()
  }

  execute(context) {
    context.calculation = {
      type: 'unknown',
      variable: this.variable.name,
      result: null,
      operands: [],
    }
    let computedValue = this.value.computeValue(context)
    context.calculation.result = computedValue
    context.variables[this.variable.name] = computedValue
    return {
      step: true,
      complete: true,
      goto: null,
      action: null
    }
  }
}

AssignStatement.startLineRegExp = /^\s*(\$[a-z])\s*=\s*(.+)\s*$/
AssignStatement.codeRegExp = /^\s*(\$[a-z])\s*=\s*(.+)\s*$/