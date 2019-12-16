import map from './map409.json'

const winCondition = {
  beforeStart() {
    let originMarkersIDs = [248, 249, 250, 251]
    let markers = this.world.configObjects.filter(o => o.type === 'marker').sort((a, b) => a.x - b.x)

    this.codes = []
    for (let marker of markers) {
      let code = {
        x: marker.x,
        expectedValues: new Array(6),
        eggs: this.world.eggs.filter(egg => egg.x === marker.x).sort((a, b) => a.y - b.y)
      }
      this.codes.push(code)
    }

    for (let i = 0; i < this.codes.length; i++) {
      let code = this.codes[i]
      if (i === 0) {
        code.expectedValues.fill(0)
      } else {
        let leftCode = this.codes[i - 1]
        for (let j = 0; j < leftCode.eggs.length; j++) {
          code.expectedValues[j] = leftCode.eggs[j].value
        }
      }
    }
  },

  check() {
    return this.codes.every(code => code.eggs.every((egg, index) => egg.value === code.expectedValues[index] && egg.x === code.x && !egg.owner))
  }
}

const level = {
  mapConfig: map,
  name: {
    en: "Memory shift",
    fr: "Décalage mémoriel",
  },
  objective: {
    en: "Copy the %%icon icon-egg$%% eggs from the 1st column to the 2nd, those from the 2nd to the 3rd etc. Write 0 on all %%icon icon-egg$%% eggs in the 1st column.\n\n%%icon mdi mdi mdi-information-outline$%% At the end the %%icon icon-egg$%% eggs must be in the same place as at the beginning.",
    fr: "Recopie les %%icon icon-egg$%% œufs de la 1ère colonne sur la 2ème, ceux de la 2ème sur la 3ème etc. Écris 0 sur tous les %%icon icon-egg$%% œufs de la 1ère colonne.\n\n%%icon mdi mdi-information-outline$%% À la fin les %%icon icon-egg$%% œufs doivent etre à la même place qu'au début.",
  },

  maxStep: 600,
  speedTarget: 208,
  lengthTarget: 27,

  compilerConfig: {
    excludePrimary: [],
    cloneIsDeadly: false,
    terrainTypes: ['floor', 'wall'],
    objectTypes: ['hero', 'egg', 'spikes', 'switch', 'nothing'],
    actionFunctions: ['step_once', 'take', 'drop', 'write'],
    valueFunctions: ['set', 'calc'],
    variables: 2,
    minInteger: 0,
    maxInteger: 2,
    leftComparisonExpressions: ['direction', 'myitem', 'variable'],
    rightComparisonExpressions: ['object_type', 'terrain_type', 'integer']
  },

  ruleset: {
    win: [winCondition],
    lose: ['default_loss']
  },

  worldGenerator: [{
    type: 'eggs_matrix',
    config: {
      originMarkerID: 248,
      width: 1,
      height: 6,

      strategy: {
        type: 'simple',
        eggConfig: {
          value: 'rng(0,1)',
          showLottery: true,
        }
      }
    }
  }, {
    type: 'eggs_matrix',
    config: {
      originMarkerID: 249,
      width: 1,
      height: 6,

      strategy: {
        type: 'simple',
        eggConfig: {
          value: 'rng(0,1)',
          showLottery: true,
        }
      }
    }
  }, {
    type: 'eggs_matrix',
    config: {
      originMarkerID: 250,
      width: 1,
      height: 6,

      strategy: {
        type: 'simple',
        eggConfig: {
          value: 'rng(0,1)',
          showLottery: true,
        }
      }
    }
  }, {
    type: 'eggs_matrix',
    config: {
      originMarkerID: 251,
      width: 1,
      height: 6,

      strategy: {
        type: 'simple',
        eggConfig: {
          value: 0,
        }
      }
    }
  }, ]
}

export default level