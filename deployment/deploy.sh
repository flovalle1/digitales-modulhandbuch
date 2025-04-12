#!/bin/bash

set -euo pipefail

LOCAL_REPO_PATH=${LOCAL_REPO_PATH:-".."}
LOG_FILE="./logs.log"

# Funktionen
log() {
  local message="[$(date +'%Y-%m-%d %H:%M:%S')] $1"
  echo "$message"
  echo "$message" >> "$LOG_FILE"
}

handle_error() {
  log "FEHLER: $1"
  exit 1
}

# Stelle sicher, dass Log-Verzeichnis existiert
mkdir -p "$(dirname "$LOG_FILE")" || handle_error "Konnte Log-Verzeichnis nicht erstellen"

# Start des Deployments
log "Starte Deployment-Prozess"
log "Lokaler Pfad: $LOCAL_REPO_PATH"

cd "$LOCAL_REPO_PATH" || handle_error "Konnte nicht ins Repo-Verzeichnis wechseln"
git pull || handle_error "Git pull fehlgeschlagen"

# Prüfe, ob Docker Compose existiert
if [ ! -f docker-compose.yml ]; then
  handle_error "Docker Compose Datei nicht gefunden"
fi

# Zu Docker GitHub Registry authentifizieren (falls erforderlich)
if [ -n "${GITHUB_TOKEN:-}" ]; then
  log "Authentifiziere bei GitHub Container Registry..."
  echo "$GITHUB_TOKEN" | docker login ghcr.io -u "$GITHUB_USERNAME" --password-stdin || handle_error "Docker-Login fehlgeschlagen"
fi

# Docker Compose ausführen
log "Starte Docker Compose Up..."
docker compose up -d || handle_error "Docker Compose up fehlgeschlagen"

# Alte Images und Container bereinigen (optional)
log "Bereinige ungenutzte Docker-Ressourcen..."
docker system prune -af --volumes || log "Warnung: Docker system prune fehlgeschlagen"

# Deployment abgeschlossen
log "Deployment erfolgreich abgeschlossen!"
exit 0