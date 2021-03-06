import AI from '../AI'
import ExpressionValue from './statements/ExpressionValue'
import AnchorStatement from './statements/AnchorStatement'
import EmptyStatement from './statements/EmptyStatement'
import EndIfStatement from './statements/EndIfStatement'
import StepPriority from '../StepPriority'

export default class CustomAI extends AI {
  constructor(statements, compilerConfig, world, character) {
    super(world, character)

    this.statements = statements
    this.compilerConfig = compilerConfig

    this.cursor = 0
    this.lastActionCursor = 0
    this.lastActionStatement = null
    this.variables = {}
    this.initVariables()
    this.context = {
      world: this.world,
      character: this.character,
      variables: this.variables,
      observations: [],
      calculation: null,
      lastGoto: null,
      rng: Math.random
    }
  }

  initVariables() {
    this.compilerConfig.getAllowedVariableIdentifiers().forEach(name => {
      this.variables[name] = ExpressionValue.integer(0)
    })
  }

  getStepPriority() {
    if (this.cursor >= this.statements.length) {
      return StepPriority.NORMAL
    }

    let statement = this.statements[this.cursor]
    return statement.getStepPriority()
  }

  step(rng) {
    let res = null

    this.prepareContext(rng)

    if (this.character.dead) {
      return null
    }

    if (this.cursor >= this.statements.length) {
      this.lastActionCursor = this.cursor
    } else {
      while (this.cursor < this.statements.length) {
        let statement = this.statements[this.cursor]
        let {
          step,
          complete,
          goto,
          action
        } = statement.execute(this.context)

        if (step) {
          this.lastActionCursor = this.cursor
          this.lastActionStatement = statement
        }

        if (goto) {
          this.context.lastGoto = goto
          this.cursor = this.statements.indexOf(goto)
          if (goto instanceof EndIfStatement) {
            this.cursor++
          }
        } else if (complete) {
          this.cursor++
        }

        if (step) {
          res = action
          break
        }
      }
    }

    return res
  }

  hasStepAvailable() {
    return this.cursor < this.statements.length
  }

  prepareContext(rng) {
    this.context.rng = rng
    this.context.observations = []
    this.context.calculation = null
  }

  cloneToAnchor(anchorStatement, character) {
    let clonedAI = new this.constructor(this.statements, this.compilerConfig, this.world, character)
    clonedAI.cursor = this.statements.indexOf(anchorStatement)
    clonedAI.lastActionCursor = this.lastActionCursor
    Object.assign(clonedAI.variables, this.variables)
    return clonedAI
  }

  hasEnded() {
    return this.lastActionCursor >= this.statements.length
  }

  getDebugContext() {
    return {
      variables: this.variables,
      observations: this.context.observations,
      lastGoto: this.context.lastGoto,
      rng: this.context.rng,
      character: this.character.shallowCopy(),
      statements: this.statements,
      step: this.world.steps,
      cursor: this.cursor,
      lastActionCursor: this.lastActionCursor,
      lastActionStatement: this.lastActionStatement,
      ended: this.hasEnded(),
    }
  }
}