#! /bin/bash

(if [ -z "$1" ]; then
    exit 1
elif [ -e "apps/$1/serverless.yml" ]; then
  str=$1
  len=${#str}
  if [ "${str:$len-4:4}" == "-api" ]; then
  # Script starts
    ARGS="${npm_config_argv}"
    if [[ $ARGS == *"api:destroy"* ]]; then
      ANSWER='yes'
    else
      echo "WARNING: this comand will remove [$1] from AWS"
      read -p "Would you like to continue? Y/N " ANSWER
      echo ""
    fi

    case "$ANSWER" in
      [yY] | [yY][eE][sS])
        cd apps/$1
        echo "Removing $1 from AWS"
        sls remove $2 $3 $4 $5 $6 $7 $8 $9
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
    echo "ERROR: Missing suffix '-api', use [app:remove] for applications"
  fi
else
  echo "ERROR: Serverless.yml not found at [apps/$1]"
fi
) || (
  echo "ERROR: Please provide the API's name"
)
echo ""

