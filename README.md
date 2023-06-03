# Get Docker Image Version

This action retrieves all tags of your image from Docker Hub and outputs the next patch version.

## Inputs

### `repository`

**Required** - The name of your repository.

## Outputs

### `next_version`

The next patch version of your image.

## Example Usage

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      # Retrieve the next version
      # if your latest version in docker hub is 0.0.1, it will output the version 0.0.2
      - uses: zqcccc/docker-image-version@0.1
        id: version
        with:
          repository: 172232502/misc

      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build the Docker image
        run: |
          docker buildx create --use --driver-opt network=host
          docker buildx build --platform=linux/amd64,linux/arm64 -t 172232502/misc -t 172232502/misc:${{ steps.version.outputs.next_version }} . --push

```
