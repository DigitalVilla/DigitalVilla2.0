const { execAsync, replaceAsync, main } = require('../utils/utils')

main(process.argv)(async (APP, args) => {
  if (args.length === 0) throw new Error('Missing component(s) name(s)')
  const hasDir = args.indexOf('--dir')
  let path = `apps/${APP}/src/`
  path += hasDir === -1 ? 'components' : args[hasDir + 1]
  const fileExt = ['js', 'spec.js', 'scss']
  const REPLACE = 'Component'
  await execAsync(`touch  ${path}/index.js`)
  console.log(`\nPreparing directory ${path}...\n`)

  for (let i = 0; i < args.length; i++) {
    // Skip options
    if (hasDir >= 0 && (i === hasDir || i === hasDir + 1)) continue

    // Skip invalid names
    let regex = new RegExp(/^([A-Z]{1}[[a-zA-Z\d]{1,16})$/, 'g')
    if (!regex.test(args[i])) {
      console.log(
        `Skipping [${args[i]}]: name must be camelCased and start with uppercase`
      )
      continue
    }

    // Skip existent components
    const exists = await execAsync(`test -d ${path}/${args[i]}`, true)
    if (exists) {
      console.log(`Skipping [${args[i]}]: component already exists`)
      continue
    }

    // Copy component schema
    await execAsync(`cp -rf tools/schematics/component ${path}/${args[i]}`)

    // Rename files && replace contents
    for (let j = 0; j < fileExt.length; j++) {
      await execAsync(
        `mv ${path}/${args[i]}/${REPLACE}.${fileExt[j]} ${path}/${args[i]}/${args[i]}.${fileExt[j]}`
      )
      await replaceAsync(`${path}/${args[i]}/${args[i]}.${fileExt[j]}`, {
        [REPLACE]: `${args[i]}`,
      })
    }

    // Update/create index.js
    await execAsync(
      `echo "export * from './${args[i]}/${args[i]}'" >> ${path}/index.js`
    )
    console.log(`*** SUCCESS [${args[i]}]: component created ***`)
  }
})
