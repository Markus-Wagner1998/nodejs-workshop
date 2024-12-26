#!/bin/bash

# Start MongoDB in the background
mongod --replSet rs0 --bind_ip_all &

# Wait for MongoDB to start
until mongo --eval "print(\"waiting for connection...\")" >/dev/null 2>&1; do
  sleep 2
done

# Initialize the replica set if not already initialized
mongo <<EOF
  rs.initiate({
      _id: "rs0",
      members: [
          { _id: 0, host: "localhost:27017" }
      ]
  });
EOF

# Bring MongoDB to the foreground
fg
