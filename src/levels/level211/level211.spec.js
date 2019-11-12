import level from './level211'

export default {
  level: level,
  deterministic: true,
  specs: [{
    type: ["length", "speed"],
    code: `
$a = nearest(cauldron)
drop($a)
		`,
  }, ]
}