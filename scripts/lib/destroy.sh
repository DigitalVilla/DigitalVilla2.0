#! /bin/bash

(if [ -z "$1" ]; then
    exit 1
elif [ -e "libs/$1/.eslintrc.json" ]; then
# Script starts
    node scripts/nx/remove $1 --lib
# Script ends
else
  echo "ERROR: Library not found at [libs/$1]"
fi
) || (
  echo "ERROR: Please provide the Library's name"
)
echo ""
