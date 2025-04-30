FROM node:18-alpine

WORKDIR /app

# Install cron and dependencies
RUN apk add --no-cache dcron tzdata

# Copy the job script
COPY update-semester-job.js /app/
COPY start-cron.sh /app/

# Install Node.js dependencies
RUN npm init -y && npm install node-fetch@2

# Add execute permissions to the startup script
RUN chmod +x /app/start-cron.sh

# Set up crontab to run the script once a week (every Sunday at 00:00)
RUN echo "0 0 * * 0 cd /app && node update-semester-job.js >> /var/log/cron.log 2>&1" > /etc/crontabs/root

# Run cron on container startup
CMD ["/app/start-cron.sh"]
