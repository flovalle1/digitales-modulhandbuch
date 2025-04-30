#!/bin/sh

# Start the cron daemon
echo "Starting cron daemon..."
crond -f -l 8 &

