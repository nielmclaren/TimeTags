BUILD_IMAGE=time-tags:latest
INVOKE_OUTPUT_FILE=invoke_output.txt

package:
	rm -rf dist/
	docker build -f .docker/Dockerfile -t $(BUILD_IMAGE) .
	mkdir -p `pwd`/dist
	docker run -v `pwd`/dist:/dist $(BUILD_IMAGE) ./scripts/package.sh

publish:
	aws lambda update-function-code --function-name timeTags --zip-file fileb://dist/dist.zip

invoke_get_entry:
	aws lambda invoke --function-name timeTags --payload '{ "httpMethod": "GET", "path": "/entries/2016-01-08" }' $(INVOKE_OUTPUT_FILE)
	@echo "Response saved to $(INVOKE_OUTPUT_FILE)"

invoke_get_reports:
	aws lambda invoke --function-name timeTags --payload '{ "httpMethod": "GET", "path": "/reports" }' $(INVOKE_OUTPUT_FILE)
	@echo "Response saved to $(INVOKE_OUTPUT_FILE)"

curl_get_entry:
	curl --request GET https://o8l6hs4v12.execute-api.us-west-2.amazonaws.com/dev/entries/2016-01-08

curl_post_entry:
	@echo "Can't post using curl because authenticating the request is a pain."

