if [ -e ".github/updates/apis.txt" ]; then
  while IFS= read -r API
  do
    # echo "Building API: $API"
    # node scripts/api/build.js $API
    # yarn api:build $API
  done < .github/updates/apis.txt
else
  echo "No changes detected at .github/updates/apis.txt"
fi

# if [ -e ".github/updates/apps.txt" ]; then
#   while IFS= read -r APP
#   do
#     echo "Building App: $APP"
#     nx build $APP --prod
#   done < .github/updates/apps.txt
# else
#   echo "No changes detected at .github/updates/apis.txt"
# fi
