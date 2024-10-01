BLUE='\033[0;34m'

if [ "$RUN_MODE" = "dev" ]; then
  echo -e "${BLUE}Running in development mode${NC}"
  exec npm run dev
else if [ "$RUN_MODE" = "production" ]; then
  echo "Running in default mode"
  exec tail -f /dev/null
fi