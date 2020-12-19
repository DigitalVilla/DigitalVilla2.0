const { execAsync, spawnSync, main } = require('../utils/utils')

main(
  process.argv,
  /-api$/
)(async (API, args) => {
  if (!args.length) throw new Error('Missing list of packages to add')
  console.log(`\nPreparing directory dist/${API}...\n`)
  await execAsync(`mkdir dist`, true)
  await execAsync(`mkdir dist/${API}`, true)
  await execAsync(`cp apps/${API}/package.json dist/${API}/`, true)
  await execAsync(`cp apps/${API}/yarn.lock dist/${API}/`, true)

  const exists = await execAsync(`test -f dist/${API}/package.json`, true)
  if (!exists) {
    console.log('Creating package.json...\n')
    spawnSync('yarn', ['init', '-y'], {
      cwd: `dist/${API}`,
    })
  }

  let yarn = spawnSync('yarn', ['add', ...args], {
    cwd: `dist/${API}`,
    encoding: 'utf8',
  })
  if (yarn.stderr) throw new Error(yarn.stderr)
  console.log(yarn.stdout)

  console.log(`Updating apps/${API}/package.json...`)
  await execAsync(`cp dist/${API}/package.json apps/${API}/`)
  await execAsync(`cp dist/${API}/yarn.lock apps/${API}/`)
})
