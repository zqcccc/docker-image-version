import * as core from '@actions/core'
// import github from '@actions/github'
import axios from 'axios'
import { SortArrayByDescVersion } from './utils'

try {
  const repository = core.getInput('repository')
  console.log('repository: ', repository)
  const [namespace, repositoryName] = repository.split('/')
  const requestUrl = `https://hub.docker.com/v2/namespaces/${namespace}/repositories/${repositoryName}/tags`
  console.log('requestUrl: ', requestUrl)
  axios
    .get(requestUrl)
    .then((response) => response.data)
    .then((data) => {
      const versions = data.results.map((res: { name: string }) => res.name)
      SortArrayByDescVersion(versions)
      const latestVersion = versions.find((tag: string) => tag.includes('.')) // 0.0.1
      const versionNumbers = latestVersion
        .split('.')
        .map((num: string) => parseInt(num))
      const newVersion = `${versionNumbers[0]}.${versionNumbers[1]}.${
        versionNumbers[2] + 1
      }`
      core.setOutput('next_version', newVersion)
    })
} catch (error: any) {
  core.setFailed(error.message)
}
