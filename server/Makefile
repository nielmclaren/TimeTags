BUILD_IMAGE=time-tags:latest
OUTPUT_FILE=output.txt

package:
	rm -rf dist/
	docker build -f .docker/Dockerfile -t $(BUILD_IMAGE) .
	mkdir -p `pwd`/dist
	docker run -v `pwd`/dist:/dist $(BUILD_IMAGE) ./scripts/package.sh

publish:
	aws lambda update-function-code --function-name timeTags --zip-file fileb://dist/dist.zip

invoke_get_entries:
	aws lambda invoke --function-name timeTags --payload '{ "context": { "http-method": "GET", "resource-path": "/entries" } }' $(OUTPUT_FILE)
	@echo "Response saved to $(OUTPUT_FILE)"

invoke_get_reports:
	aws lambda invoke --function-name timeTags --payload '{ "context": { "http-method": "GET", "resource-path": "/reports" } }' $(OUTPUT_FILE)
	@echo "Response saved to $(OUTPUT_FILE)"
