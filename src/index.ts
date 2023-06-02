import * as core from '@actions/core'
import github from '@actions/github'

try {
  const repository = core.getInput('repository')
  console.log('repository: ', repository)
  const [namespace, repositoryName] = repository.split('/')
  const requestUrl = `https://hub.docker.com/v2/namespaces/${namespace}/repositories/${repositoryName}/tags`
  console.log('requestUrl: ', requestUrl)
  fetch(requestUrl)
    .then((response) => response.json())
    .then((data) => {
      core.setOutput('data', data)
    })
} catch (error: any) {
  core.setFailed(error.message)
}
