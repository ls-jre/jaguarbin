#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# Set editors
export VISUAL=nano
export EDITOR=nano

# Add new cron job
echo "*/2 * * * * cd $SCRIPT_DIR && sh ./cleanup_requests.sh" > cleanup_requests_cron

# Install new cron file
crontab cleanup_requests_cron
rm cleanup_requests_cron

