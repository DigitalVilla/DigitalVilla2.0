#! /bin/bash

(if [ -z "$1" ]; then
    exit 1
elif [ -e "apps/$1/serverless.yml" ]; then
  str=$1
  len=${#str}
  if [ "${str:$len-4:4}" == "-api" ]; then
  # Script starts
    echo ""
    echo "Preparing [$1] for deployment..."

    for i; do
      if [ "$i" != $1 ]; then
        ARGS+=" $i"
      fi
    done

    echo "Deploying $1 to AWS..."
    node scripts/api/build $1 --minify

    cd dist/$1;
    sls deploy $ARGS;
  # Script ends
  else
    echo "ERROR: Missing suffix '-api', use [app:deploy] for applications"
  fi
else
  echo "ERROR: Serverless.yml not found at [apps/$1]"
fi
) || (
  echo "ERROR: Please provide the API's name"
)
echo ""
