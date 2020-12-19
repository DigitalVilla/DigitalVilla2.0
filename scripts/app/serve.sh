#! /bin/bash

(if [ -z "$1" ]; then
    exit 1
elif [ -e "apps/$1/serverless.yml" ]; then
  str=$1
  len=${#str}
  if [ "${str:$len-4:4}" != "-api" ]; then
  # Script starts
    nx serve $@
  # Script ends
  else
    echo "ERROR: Found suffix '-api', use [api:serve] for APIs"
  fi
else
  echo "ERROR: File serverless.yml not found at [apps/$1]"
fi
) || (
  echo "ERROR: Please provide the App's name"
)
echo ""
