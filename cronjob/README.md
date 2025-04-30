# Update Semester Cronjob

This directory contains a Docker-based cronjob that automatically calls the `/api/updatesemester` endpoint weekly to update semester information in the system.

## Configuration

Edit the `docker-compose.yml` file to configure:

- `WEBHOOK_URL`: The complete URL to your API endpoint
- `API_KEY`: The API key that matches your application's CRONJOB_API_KEY
- `TZ`: Time zone for scheduling (defaults to Europe/Berlin)

## Schedule

By default, the cronjob runs once a week on Sunday at midnight. 
To modify the schedule, edit the crontab line in the `Dockerfile`:

```
# Format: minute hour day month day_of_week
0 0 * * 0
```
