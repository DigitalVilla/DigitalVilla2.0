const fs = require('fs')
const { exec, spawnSync } = require('child_process')
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function promptAsync(message) {
  return new Promise((resolve, reject) => {
    rl.question(message, (answer) => {
      resolve(answer)
    })
  })
}

function closePromptAsync() {
  return rl.close()
}

function execOpt(command, options = null) {
  return new Promise((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      if (error) return reject(error)
      return resolve({ stderr, stdout })
    })
  })
}

async function execAsync(command, quiet = false) {
  try {
    const exec = await execOpt(command)
    return exec
  } catch (error) {
    if (quiet) return null
    throw new Error(error)
  }
}

async function textFinder(text, path = './') {
  try {
    let finds = await execAsync(`grep -R '${text}' ${path}`)
    return finds.stderr ? null : finds.stdout.trim().split('\n')
  } catch (error) {
    console.log(error)
    return null
  }
}

async function finderAsync(pattern, path = './', type = 'f') {
  try {
    const { stderr, stdout } = await execAsync(
      `find ${path} -name ${pattern} -type ${type}`
    )
    return stderr || !stdout ? null : stdout.trim().split('\n')
  } catch (error) {
    console.log(error)
    return null
  }
}

function readAsync(path, encoding = 'utf8') {
  return new Promise((resolve, reject) => {
    fs.readFile(path, encoding, function (err, data) {
      if (err) return reject(err)
      return resolve(data)
    })
  })
}

function replaceAsync(filePath, params) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) return reject(err)
      for (const key in params) {
        data = data.replace(new RegExp(key, 'g'), params[key])
      }

      fs.writeFile(filePath, data, 'utf8', function (err) {
        if (err) return reject(err)
        return resolve(null)
      })
    })
  })
}

async function getAppDependencies(project, appName) {
  let imports = await textFinder(`@${project}`, `apps/${appName}`)
  if (!imports) return null
  const dependencies = {}
  let fileName = ''
  let rootFile = ''
  const root = []
  const libraries = []
  try {
    for (let i = 0; i < imports.length; i++) {
      let imp = imports[i]
      rootFile = imp.split(':')[0]
      rootFile = rootFile.substring(rootFile.indexOf('/', 6) + 1)
      root.push(rootFile)

      imp = imp.substring(imp.indexOf('{') + 1, imp.indexOf('}')).split(',')
      for (let i = 0; i < imp.length; i++) {
        fileName = imp[i].trim()

        if (!dependencies[fileName]) {
          const check = await finderAsync(`${fileName}.js`, `libs`)
          if (check.length) {
            dependencies[fileName] = {}
            dependencies[fileName].file = check[0]
            dependencies[fileName].root = []
            libraries.push(check[0].split('/')[1])
          }
        }
        dependencies[fileName].root.push(rootFile)
      }
    }
  } catch (error) {
    throw new Error(
      `Library import '${fileName}' at 'apps/${appName}/${rootFile}' was not found`
    )
  }

  return { root, dependencies, libraries: [...new Set(libraries)] }
}

function main() {
  try {
    const APP = arguments[0][2]
    const ARGS = arguments[0].slice(3)
    if (arguments[1]) {
      const regex = new RegExp(arguments[1])
      let isValid = regex.test(APP)
      if (!isValid) throw new Error(`[${APP}] does not match regex:${regex}`)
    }

    return async function name(callback) {
      try {
        if (!APP) throw new Error(`Please provide a name`)
        const exists = await execAsync(
          `test -f apps/${APP}/serverless.yml`,
          true
        )
        if (!exists) throw new Error(`apps/${APP} does not exist`)
        await callback(APP, ARGS)
      } catch (error) {
        console.log('ERROR:', error.message)
      }
      process.exit(0)
    }
  } catch (error) {
    console.log('ERROR:', error.message)
    process.exit(0)
  }
}

module.exports = {
  fs,
  main,
  promptAsync,
  execAsync,
  readAsync,
  replaceAsync,
  closePromptAsync,
  textFinder,
  finderAsync,
  spawnSync,
  execOpt,
  getAppDependencies,
}
