const { execAsync, spawnSync, main } = require('../utils/utils')

main(
  process.argv,
  /-api$/
)(async (API, args) => {
  console.log(`\nUpdating package.json...`)
  await execAsync(`mkdir dist`, true)
  await execAsync(`mkdir dist/${API}`, true)
  let package = await execAsync(
    `cp apps/${API}/package.json dist/${API}/`,
    true
  )
  if (!package) throw new Error('Missing package.json file')
  await execAsync(`cp apps/${API}/yarn.lock dist/${API}/`, true)

  console.log('\nRemoving Node dependencies...')
  let yarn = spawnSync('yarn', ['remove', ...args], {
    cwd: `dist/${API}`,
    encoding: 'utf8',
  })
  if (yarn.stderr) throw new Error(yarn.stderr)
  console.log(yarn.stdout)

  console.log(`\nUpdating apps/${API}/package.json...`)
  await execAsync(`cp dist/${API}/package.json apps/${API}/`)
  await execAsync(`cp dist/${API}/yarn.lock apps/${API}/`)
})
