module.exports = {
  helpers: {
    dataTypes: (arr) => {
      let output = ''
      arr.forEach((type, key, array) => {
        output = output.concat(type)
        if (!Object.is(array.length - 1, key)) {
          output = output.concat(' | ')
        }
      })
      return output
    },
    vuexAttribute: (field) => {
      const arr = field.type
      if (arr.includes('boolean')) {
        return `this.boolean(${field.default})`
      }
      if (arr.includes('number')) {
        return `this.number(${field.default})`
      }
      if (arr.includes('string')) {
        return `this.string(${field.default})`
      } else {
        return `this.attr(${field.default})`
      }
    },
    vuexRelationAttribute: ([fieldName, value], parent) => {
      let output = fieldName.concat(': this.')
      output = output.concat(
        value.relation,
        '(',
        value.model,
        ", '",
        parent,
        "Id')"
      )
      return output
    },
    vuexRelationImports: (relationships) => {
      let modelOutput = ''
      for (const [fieldname, value] of Object.entries(relationships)) {
        modelOutput = modelOutput.concat(
          'import ',
          value.model,
          " from 'src/models/",
          value.model,
          "'\n"
        )
      }

      return modelOutput
    },
    vuexRelationProperty: ([fieldName, value]) => {
      let output = ''
      output = output.concat(fieldName, '!: ')
      if (['hasMany'].includes(value.relation)) {
        output = output.concat(value.model, '[]')
      } else {
        output = output.concat(value.model)
      }
      return output
    },
    orionRelationProperty: ([fieldName, value]) => {
      let output = ''
      output = output.concat(fieldName, ': ')
      if (['hasMany'].includes(value.relation)) {
        output = output.concat('Array<', value.model, '>')
      } else {
        output = output.concat(value.model)
      }
      return output
    },
    orionRelationImports: (relationships) => {
      let functionSet = new Set()
      let modelOutput = ''
      let functionOutput = ''
      let functionOutputArray = []
      for (const [fieldname, value] of Object.entries(relationships)) {
        modelOutput = modelOutput.concat(
          'import ',
          value.model,
          " from 'src/resources/",
          value.model,
          'Resource',
          "'\n"
        )
        functionSet.add(value.relation)
      }

      for (const f of functionSet) {
        functionOutput = 'import { '
        functionOutput = functionOutput.concat(
          f.replace(/^\w/, (c) => c.toUpperCase())
        )
        if (!getLastItem(functionSet) === f) {
          functionOutput = functionOutput.concat(', ')
        }
        functionOutput = functionOutput.concat(
          " } from '@tailflow/laravel-orion/lib/drivers/default/relations/",
          f,
          "'",
          '\n'
        )
        functionOutputArray.push(functionOutput)
      }

      return modelOutput.concat('\n', ...functionOutputArray)
    },
    orionRelationFunction: (relationship) => {
      return relationship.type
    },
  },
}

function getLastItem(_set) {
  return [..._set].pop()
}
