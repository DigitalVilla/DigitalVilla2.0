const { replaceAsync, execAsync } = require('../utils/utils')

async function main(name) {
  try {
    if (!name) throw new Error('API name is missing')
    const valid = new RegExp(/^[a-z_-]+$/, 'g').test(name)
    if (!valid) throw new Error('Name must only contain [a-z][-][_]')
    if (name.indexOf('-api') > -1) throw new Error('Omit word [-api]')

    const APP = `${name}-api`
    const project = process.env.npm_package_name

    console.log(`Creating new API at apps/${APP}...`)
    await execAsync(`nx g @nrwl/node:app ${APP} --js `)
    await execAsync(`rm -rf apps/${APP}/**`)
    await execAsync(`rm -rf apps/${APP}/.es*`)
    await execAsync(`cp -rf tools/schematics/lambda/** apps/${APP}/`)
    await execAsync(`cp -rf tools/schematics/lambda/.es* apps/${APP}/`)

    console.log('\nUpdating serverless.yml template...')
    await replaceAsync(`apps/${APP}/serverless.yml`, { API_NAME: name })

    /**
    console.log(`Creating Github workflow...`)
    const { stderr: gitErr } = await execAsync(
      `cp -a tools/workflows/lambda.yml .github/workflows/${name}-lambdas.yml`
    )
    if (gitErr) throw new Error(err)

    console.log('Updating template')
    await replaceAsync(`.github/workflows/${name}-lambdas.yml`, {
      LambdaName: `${name}`,
    })
    **/
  } catch (error) {
    console.log('Error:', error.message)
  }
  process.exit(0)
}

main(process.argv[2])
