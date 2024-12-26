#!/bin/sh
echo "Initializing localstack sqs"

awslocal --endpoint-url=http://127.0.0.1:4566 sqs create-queue --region eu-central-1 --queue-name workshop-test-queue
