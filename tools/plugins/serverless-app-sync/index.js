'use strict'

const { exec } = require('child_process')

class ServerlessPlugin {
  constructor(serverless, options) {
    this.serverless = serverless
    this.options = options
    this.commands = {
      syncToS3: {
        usage: 'Deploys the `src/` directory to your S3 bucket',
        lifecycleEvents: ['sync'],
      },
      domainInfo: {
        usage: 'Fetches and prints out the deployed CloudFront domain names',
        lifecycleEvents: ['domainInfo'],
      },
      invalidateCache: {
        usage: 'Invalidates CloudFront cache',
        lifecycleEvents: ['invalidateCache'],
      },
      echo: {
        usage:
          'Prints the WebApp Serverless --service --provider --stack --domain',
        lifecycleEvents: ['logs'],
      },
      emptyS3: {
        usage: 'Empties the app AWS S3 bucket',
        lifecycleEvents: ['empty'],
      },
    }

    this.hooks = {
      'syncToS3:sync': this.syncDirectory.bind(this),
      'domainInfo:domainInfo': this.domainInfo.bind(this),
      'invalidateCache:invalidateCache': this.invalidateCache.bind(this),
      'echo:logs': this.echo.bind(this),
      'emptyS3:empty': this.emptyS3.bind(this),
    }
  }

  execAsync(command) {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) return reject(error)
        return resolve({ stderr, stdout })
      })
    })
  }

  async runAwsCommand(args) {
    let command = 'aws'
    if (this.serverless.variables.service.provider.region) {
      command = `${command} --region ${this.serverless.variables.service.provider.region}`
    }
    if (this.serverless.variables.service.provider.profile) {
      command = `${command} --profile ${this.serverless.variables.service.provider.profile}`
    }
    const { stdout, sterr } = await this.execAsync(`aws ${args.join(' ')}`)
    if (stdout) this.serverless.cli.log(stdout)
    if (sterr) this.serverless.cli.log(sterr)

    return { stdout, sterr }
  }

  async emptyS3() {
    const s3Bucket = this.serverless.variables.service.custom.s3bucketDomain
    const args = ['s3', 'rm', `s3://${s3Bucket}/`, '--recursive']
    const { sterr } = await this.runAwsCommand(args)
    if (!sterr) {
      this.serverless.cli.log('S3 bucket was succesfully emptied')
    } else {
      throw new Error('Failed to empty to the S3 bucket')
    }
  }

  // syncs the `app` directory to the provided bucket
  async syncDirectory() {
    const s3Bucket = this.serverless.variables.service.custom.s3bucketDomain
    const args = ['s3', 'sync', 'src/', `s3://${s3Bucket}/`, '--delete']
    const { sterr } = await this.runAwsCommand(args)
    if (!sterr) {
      this.serverless.cli.log('Successfully synced to the S3 bucket')
    } else {
      throw new Error('Failed syncing to the S3 bucket')
    }
  }

  // Prints the Serverless object
  echo() {
    let args = this.serverless.cliInputArgv
    const { service } = this.serverless.variables

    switch (args[1]) {
      case '--service':
        return console.log(service)
      case '--provider':
        return console.log(service.provider)
      case '--stack':
        return console.log(service.service + '-' + service.provider.stage)
      case '--domain':
        return console.log(
          this.serverless.variables.service.custom.s3bucketDomain
        )

      default:
        return console.log(this.serverless.variables)
    }
  }

  // fetches the domain name from the CloudFront outputs and prints it out
  async domainInfo() {
    const provider = this.serverless.getProvider('aws')
    const stackName = provider.naming.getStackName(this.options.stage)
    const result = await provider.request(
      'CloudFormation',
      'describeStacks',
      { StackName: stackName },
      this.options.stage,
      this.options.region
    )

    const outputs = result.Stacks[0].Outputs
    const output = outputs.find(
      (entry) => entry.OutputKey === 'AppCloudFrontDistributionOutput'
    )

    if (output && output.OutputValue) {
      this.serverless.cli.log(`Web App Domain: ${output.OutputValue}`)
      return output.OutputValue
    }

    this.serverless.cli.log('Web App Domain: Not Found')
    throw new Error('Could not extract Web App Domain')
  }

  async invalidateCache() {
    const provider = this.serverless.getProvider('aws')
    const domain = await this.domainInfo()

    this.serverless.cli.log(
      `Invalidating CloudFront distribution with id: ${distribution.Id}`
    )

    const result = await provider.request(
      'CloudFront',
      'listDistributions',
      {},
      this.options.stage,
      this.options.region
    )

    const distributions = result.DistributionList.Items
    const distribution = distributions.find(
      (entry) => entry.DomainName === domain
    )

    if (distribution) {
      const args = [
        'cloudfront',
        'create-invalidation',
        '--distribution-id',
        distribution.Id,
        '--paths',
        '/*',
      ]
      const { sterr } = await this.runAwsCommand(args)
      if (!sterr) {
        this.serverless.cli.log('Successfully invalidated CloudFront cache')
      } else {
        throw new Error('Failed invalidating CloudFront cache')
      }
    } else {
      const message = `Could not find distribution with domain ${domain}`
      this.serverless.cli.log(message)
      throw new Error(message)
    }
  }
}

module.exports = ServerlessPlugin
