BUILD_IMAGE=time-tags:latest

package:
	rm -rf dist/
	docker build -f .docker/Dockerfile -t $(BUILD_IMAGE) .
	mkdir -p `pwd`/dist
	docker run -v `pwd`/dist:/dist $(BUILD_IMAGE) ./scripts/package.sh
