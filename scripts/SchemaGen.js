const fs = require('fs')
const path = require('path')
const execa = require('execa')

const schemaPath = path.join(__dirname, '../schema')

fs.readdirSync(schemaPath).forEach(function (file) {
  try {
    execa.sync('hygen', [
      'FromSchema',
      'generate',
      path.parse(file).name,
      `--json=${path.join(schemaPath, file)}`,
    ])
  } catch (e) {
    console.error(e)
  }
})
