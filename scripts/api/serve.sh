#! /bin/bash

(if [ -z "$1" ]; then
    exit 1
elif [ -e "apps/$1/serverless.yml" ]; then
  str=$1
  len=${#str}
  if [ "${str:$len-4:4}" == "-api" ]; then
  # Script starts
    ARGS=''

    for i; do
      if [ "$i" != $1 ]; then
        case "$i" in
        "--skip-func" | "--skip-libs" | "--skip-node" | "--only-func")
          # Skip these args
          ;;
        "--port")
          # Map args
          ARGS+=" --httpPort"
          ;;
        *)
          ARGS+=" $i"
          ;;
        esac
      fi
    done

    node scripts/api/build $@
    cd dist/$1;
    sls offline $ARGS;
  # Script ends
  else
    echo "ERROR: Missing suffix '-api', use [app:serve] for applications"
  fi
else
  echo "ERROR: File serverless.yml not found at [apps/$1]"
fi
) || (
  echo "ERROR: Please provide the API's name"
)
echo ""
