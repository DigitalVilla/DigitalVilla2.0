const { replaceAsync, execAsync } = require('../utils/utils')

async function main(APP) {
  try {
    if (!APP) throw new Error('App name is missing')
    const valid = new RegExp(/^[a-z_-]+$/, 'g').test(APP)
    if (!valid) throw new Error('Name must only contain [a-z][-][_]')
    if (APP.indexOf('-api') > -1) throw new Error('Omit word [-api]')

    console.log(`Creating new API at apps/${APP}...`)
    await execAsync(`nx g @nrwl/react:app ${APP} --js`)
    await execAsync(`rm -rf apps/${APP}/src`)
    await execAsync(`cp -rf tools/schematics/app/** apps/${APP}/`)

    console.log(`\nUpdating apps/${APP} templates...`)
    await replaceAsync(`apps/${APP}/serverless.yml`, { APP_NAME: APP })
    await replaceAsync(`apps/${APP}/src/index.html`, { APP_NAME: APP })
    await replaceAsync(`apps/${APP}/src/pages/home/home.js`, {
      APP_NAME: APP,
    })

    console.log('\nUpdating workspace.json template...')
    await replaceAsync(`workspace.json`, {
      [`dist/apps/${APP}`]: `dist/${APP}/src`,
      'styles.scss': 'app.scss',
    })
  } catch (error) {
    console.log('Error:', error.message)
  }
  process.exit(0)
}

main(process.argv[2])
