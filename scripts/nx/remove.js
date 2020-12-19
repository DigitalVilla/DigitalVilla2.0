const { execAsync, fs } = require('../utils/utils')

async function main() {
  try {
    const APP = arguments[0][2]
    const ARGS = arguments[0].slice(3)
    let type = ''

    switch (ARGS[0]) {
      case '--lib':
        type = 'Library'
        break
      case '--api':
        type = 'API'
        break
      case '--app':
        type = 'Application'
        await execAsync(`nx g @nrwl/workspace:remove ${APP}-e2e`, true)
        break
      default:
        throw new Error('Missing project --type')
    }
    console.log(`Removing ${type} [${APP}] from workspace...\n`)
    let deleted = await execAsync(`nx g @nrwl/workspace:remove ${APP}`, true)
    if (!deleted) throw new Error(`Error: ${type} [${APP}] Not found`)
    console.log(deleted.stdout)

    let file = fs.readFileSync(`jest.config.js`, { encoding: 'utf8' })
    file = file.split('\n').filter((el) => el && el.indexOf(`${APP}`) === -1)
    await execAsync(`rm jest.config.js`)
    await execAsync(`echo "${file.join('\n')}" >> jest.config.js`)
    console.log(`UPDATE jest.config.js`)
    fs.closeSync(0)

    // Remove dist/directory
    if (type !== '--lib') {
      console.log(`DELETE dist/${APP}`)
      await execAsync(`rm -rf dist/${APP}`, true)
    }
  } catch (error) {
    console.log(error.message)
  }
  process.exit(0)
}

main(process.argv)
