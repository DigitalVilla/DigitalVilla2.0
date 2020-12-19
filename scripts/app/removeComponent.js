const { execAsync, main, fs } = require('../utils/utils')

main(process.argv)(async (APP, args) => {
  if (args.length === 0) throw new Error('Missing component(s) name(s)')
  const hasDir = args.indexOf('--dirName')
  let path = `apps/${APP}/src/`
  path += hasDir === -1 ? 'components' : args[hasDir + 1]
  console.log(`\nPreparing directory ${path}...\n`)

  for (let i = 0; i < args.length; i++) {
    // Skip options
    if (hasDir >= 0 && (i === hasDir || i === hasDir + 1)) continue

    // Skip inexistent components
    let exists = await execAsync(`test -d ${path}/${args[i]}`, true)
    if (!exists) {
      console.log(`Skipping [${args[i]}]: component does not exist`)
      continue
    }

    // Remove component
    await execAsync(`rm -rf ${path}/${args[i]}`)

    // Update index.js
    exists = await execAsync(`test -f ${path}/index.js`, true)
    if (exists) {
      let file = fs.readFileSync(`${path}/index.js`, { encoding: 'utf8' })
      file = file
        .split('\n')
        .filter((el) => el && el.indexOf(`${args[i]}`) === -1)
      await execAsync(`rm -rf ${path}/index.js`)
      await execAsync(`echo "${file.join('\n')}" >> ${path}/index.js`)
      console.log(
        `*** SUCCESS [${args[i]}]: component removed and index updated ***`
      )
    } else {
      console.log(`*** SUCCESS [${args[i]}]: component removed ***`)
    }
  }
})
