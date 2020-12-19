#! /bin/bash

(if [ -z "$1" ]; then
    exit 1
elif [ -e "apps/$1/serverless.yml" ]; then
  str=$1
  len=${#str}
  if [ "${str:$len-4:4}" == "-api" ]; then
  # Script starts
    echo "WARNING: this comand will completely remove [$1] from AWS and from this project"
    read -p "Would you like to continue? Y/N " ANSWER
    echo ""

    case "$ANSWER" in
      [yY] | [yY][eE][sS])
        yarn api:remove $1 $2 $3 $5 $4 $5 $6 $7 $8 $9
        node scripts/nx/remove $1 --api
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
    echo "ERROR: Missing suffix '-api', use [app:destroy] for applications"
  fi
else
  echo "ERROR: Serverless.yml not found at [apps/$1]"
fi
) || (
  echo "ERROR: Please provide the API's name"
)
echo ""
