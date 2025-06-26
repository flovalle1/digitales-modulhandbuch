#!/bin/bash

# Output HTTP headers
echo "Content-Type: application/json"
echo ""

# Change to the script directory
cd "$(dirname "$0")" || {
    echo '{"success": false, "error": "Could not change to script directory"}'
    exit 1
}

# Execute the deploy script and capture output
if output=$(./deploy.sh 2>&1); then
    echo "{\"success\": true, \"output\": \"$(echo "$output" | sed 's/"/\\"/g' | tr '\n' ' ')\"}"
else
    echo "{\"success\": false, \"error\": \"$(echo "$output" | sed 's/"/\\"/g' | tr '\n' ' ')\"}"
fi
