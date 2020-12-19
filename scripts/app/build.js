const { main, execAsync } = require('../utils/utils')

main(process.argv)(async (APP, args) => {
  if (APP.indexOf('-api') > -1)
    throw new Error('Cannot build APIs, try api:build')
  const noCache = args[0] === '--skip-cache' ? '--skip-nx-cache' : ''

  console.log(`\nCompiling app to dist/${APP}...`)
  let build = await execAsync(
    `nx build ${APP} --prod --vendorChunk ${noCache}`,
    true
  )
  if (!build)
    throw new Error(
      `Build could not complete
       For error details run this command:\n
       nx build ${APP} --prod\n`
    )
  console.log(
    build.stdout
      .split('\n')
      .filter((e, i) => e && i > 4)
      .join('\n')
  )
  await execAsync(`cp apps/${APP}/serverless.yml dist/${APP}/`)
})
