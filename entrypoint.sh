#!/bin/sh

BLUE='\033[0;34m'
NC='\033[0m' # No Color

if [ "$RUN_MODE" = "dev" ]; then
  echo -e "${BLUE}Running in development mode${NC}"
  exec npm run dev:tests
elif [ "$RUN_MODE" = "production" ]; then
  echo "Running in production mode"
  # for live reload in case of need testing the interface
  exec npm run dev
else
  echo "Running in default mode"
  exec tail -f /dev/null
fi