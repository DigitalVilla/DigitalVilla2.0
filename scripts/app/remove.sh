#! /bin/bash

(if [ -z "$1" ]; then
    exit 1
elif [ -e "apps/$1/serverless.yml" ]; then
  str=$1
  len=${#str}
  if [ "${str:$len-4:4}" != "-api" ]; then
  # Script starts
    ARGS="${npm_config_argv}"
    if [[ $ARGS == *"app:destroy"* ]]; then
      ANSWER='yes'
    else
      echo "WARNING: The app [$1] will be completely removed from AWS"
      read -p "Would you like to continue? Y/N " ANSWER
      echo ""
    fi

    ARGS=''
    for i; do
      if [ "$i" != $1 ]; then
          ARGS+=" $i"
      fi
    done

    case "$ANSWER" in
      [yY] | [yY][eE][sS])
        cd apps/$1
        echo "Connecting to AWS..."
        STACK=$(sls echo --stack)
        LIVE=$(sls domainInfo $ARGS)
        LIVE=${LIVE:20:6}
        if [ "$LIVE" == "Domain" ]; then
          echo "Removing $1 from AWS"
          sls emptyS3 $ARGS
          sls domainInfo $ARGS
          sls remove $ARGS
        else
          echo "Stack [$STACK] does not exist"
        fi
        ;;
      [nN] | [nN][oO])
        echo "Nothing was changed"
        ;;
      *)
        echo "Please enter y/yes or n/no"
        ;;
    esac
  # Script ends
  else
    echo "ERROR: Found suffix '-api', use [api:remove] for APIs"
  fi
else
  echo "ERROR: File serverless.yml not found at [apps/$1]"
fi
) || (
  echo "ERROR: Please provide the App's name"
)
echo ""
