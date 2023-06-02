import * as core from '@actions/core'
// import github from '@actions/github'
import axios from 'axios'

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
      core.setOutput('data', data)
    })
} catch (error: any) {
  core.setFailed(error.message)
}
