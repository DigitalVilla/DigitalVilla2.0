const {
  main,
  execAsync,
  finderAsync,
  replaceAsync,
  getAppDependencies,
} = require('../utils/utils')
const project = process.env.npm_package_name

main(process.argv)(async (API, args) => {
  if (API.indexOf('-api') === -1)
    throw new Error('Cannot build apps, try app:build')
  const minify = args.includes('--minify') ? '--presets minify' : ''

  console.log(`Setting up dist/${API} directory...`)
  await execAsync(`mkdir dist`, true)
  await execAsync(`mkdir dist/${API}`, true)
  const deps = await getAppDependencies(project, API)

  if (!args.includes('--skip-func')) {
    console.log(`\nBuilding functions to dist/${API}...`)
    await execAsync(`rm -rf dist/${API}/functions`, true)
    await execAsync(`cp apps/${API}/serverless.yml dist/${API}/`)
    const scripts = await finderAsync('"*.js"', `apps/${API}/functions`)
    // console.log(scripts)

    for (let i = 0; i < scripts.length; i++) {
      let dest = scripts[i].replace('apps/', 'dist/').split('/')
      console.log(`Compiling ${dest.join('/')}...`)
      dest.splice(dest.length - 1, 1).join('/')
      await execAsync(`yarn babel ${scripts[i]} -d ${dest.join('/')} ${minify}`)
    }

    console.log('Updating imports...')
    for (let i = 0; i < deps.root.length; i++) {
      const rootFile = deps.root[i]
      await replaceAsync(
        `dist/${API}/${rootFile}`,
        replaceParams(rootFile, deps.libraries)
      )
    }
  } else {
    console.log(`** Functions skipped **`)
  }

  if (!args.includes('--skip-libs') && !args.includes('--only-func')) {
    console.log('\nLooking for libs/ imports...')
    if (deps && deps.dependencies) {
      await execAsync(`rm -rf dist/${API}/libs`, true)
      await execAsync(`mkdir dist/${API}/libs`)
      let exp = 'module.exports={'
      let imp = ''

      for (const key in deps.dependencies) {
        exp += `${key},`
        imp += `const{${key}}=require("./${key}");`
        const filePath = deps.dependencies[key].file
        console.log(`Compiling ${filePath}...`)
        await execAsync(`yarn babel ${filePath} -d dist/${API}/libs ${minify}`)
      }

      console.log('Writing libs/index.js...')
      await execAsync(`echo '${imp + exp}}' >> dist/${API}/libs/index.js`)
    } else {
      console.log('No libs/ dependencies found')
    }
  } else {
    console.log(`** Libraries skipped **`)
  }

  if (!args.includes('--skip-node') && !args.includes('--only-func')) {
    console.log('\nLooking for node dependencies...')
    let package = await execAsync(`test -f apps/${API}/package.json`, true)

    if (package) {
      await execAsync(`cp apps/${API}/package.json dist/${API}/`)
      await execAsync(`cp apps/${API}/yarn.lock dist/${API}/`, true)
      console.log('\nInstalling Node dependencies')
      let yarn = await execAsync(`cd dist/${API}/ && yarn install`)
      console.log(yarn.stdout)
    } else {
      console.log('No Node dependencies found')
    }
  } else {
    console.log(`** Node modules skipped **`)
  }
})

function replaceParams(root, libs, params = {}) {
  libs.forEach((lib) => (params[`@${project}/${lib}`] = upDir()))
  function upDir(path = '') {
    for (let i = 1; i < root.split('/').length; i++) {
      path += '../'
    }
    return `${path}libs`
  }
  return params
}
