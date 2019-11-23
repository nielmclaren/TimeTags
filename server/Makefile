BUILD_IMAGE=time-tags:latest
OUTPUT_FILE=output.txt

package:
	rm -rf dist/
	docker build -f .docker/Dockerfile -t $(BUILD_IMAGE) .
	mkdir -p `pwd`/dist
	docker run -v `pwd`/dist:/dist $(BUILD_IMAGE) ./scripts/package.sh

invoke_get_logs:
	aws lambda invoke --function-name timeTags --payload '{ "context": { "http-method": "GET", "resource-path": "/logs" } }' $(OUTPUT_FILE)
	@echo "Response saved to $(OUTPUT_FILE)"

invoke_get_reports:
	aws lambda invoke --function-name timeTags --payload '{ "context": { "http-method": "GET", "resource-path": "/reports" } }' $(OUTPUT_FILE)
	@echo "Response saved to $(OUTPUT_FILE)"
