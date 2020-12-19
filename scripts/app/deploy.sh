#! /bin/bash

(if [ -z "$1" ]; then
    exit 1
elif [ -e "apps/$1/serverless.yml" ]; then
  str=$1
  len=${#str}
  if [ "${str:$len-4:4}" != "-api" ]; then
  # Script starts
    echo "Preparing [$1] for deployment..."

    for i; do
      if [ "$i" != $1 ]; then
        ARGS+=" $i"
      fi
    done
    node scripts/app/build $1 --skip-cache

    cd dist/$1;
    echo ""
    echo "Openning conetcion to AWS..."
    LIVE=$(sls domainInfo $ARGS)
    LIVE=${LIVE:20:6}
    if [ "$LIVE" == "Domain" ]; then
      echo "Syncing $1 to AWS S3"
      sls syncToS3 $ARGS;
      sls invalidateCache $ARGS;
    else
      echo "Deploying $1 to AWS"
      sls deploy $ARGS;
      sls syncToS3 $ARGS;
    fi
  # Script ends
  else
    echo "ERROR: Found suffix '-api', use [api:deploy] for APIs"
  fi
else
  echo "ERROR: File serverless.yml not found at [apps/$1]"
fi
) || (
  echo "ERROR: Please provide the App's name"
)
echo ""
