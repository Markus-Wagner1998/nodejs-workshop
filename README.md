# Task 0

Task-0 is designed to evaluate that your local setup is working, all containers are running as intended and we can all start with a working local setup.

Therefore perform the following steps:

- Start the docker containers
  - Navigate into `workshop-localsetup`
  - Run `docker-compose -f docker-compose.yml up -d`
  - Check that following containers are running:
    - mongodb
    - postgres
    - keycloak
    - localstack
- Test Postgres Connection
  - Open DB Client
  - Connect to Postgres
    - Host: localhost
    - Port: 5432
    - Database: workshop
    - User: admin
    - Password: admin
- Test MongoDB Connection
  - Open MongoDB Compass
  - Connect to MongoDB
    - Hostname: localhost
    - Port: 27017
    - Authentication: Username / Password
    - Username: root
    - Password: example
    - Connection-String: mongodb://root:example@localhost:27017/?authSource=admin
- Test Keycloak
  - Open Browser and navigate to `http://localhost:8999`
  - Login with `admin` / `admin`
  - Check that the realm `workshop` is available
  - Check that the client `workshop-client` is available
  - Check that the client `frontend-client` is available
- Test Localstack
  - Check if there is a mount error (happen sometimes on windows)
    - If so, open a shell on the container `docker exec -it workshop-localstack-1 sh` dn run the content of `script.sh` on the container.
  - If no aws profile is configured, run `aws configure`. (No need to enter real credentials)
  - List queues and check that the there is one queue available: `aws --endpoint-url=http://localhost:4566 sqs list-queues`
  - Send a Test message into the queue: `aws --endpoint-url=http://localhost:4566 sqs send-message --queue-url "http://sqs.eu-central-1.localhost.localstack.cloud:4566/000000000000/workshop-test-queue" --message-body "This is my demo test message"`
  - Read the just sent message from the queue: `aws --endpoint-url=http://localhost:4566 sqs receive-message --queue-url "http://sqs.eu-central-1.localhost.localstack.cloud:4566/000000000000/workshop-test-queue"`
  - Read again and expect an empty result, because the queue should be empty now

