const fs = require('fs')

module.exports = {
  params: ({ args }) => {
    let jsonData = {}

    let rawdata = fs.readFileSync(args.json)
    jsonData = JSON.parse(rawdata)
    return {
      ...args,
      ...jsonData,
    }
  },
}
