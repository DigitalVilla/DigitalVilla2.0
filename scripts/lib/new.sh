#! /bin/bash

(if [ -z "$1" ]; then
    exit 1
else
# Script starts
    ( nx g @nrwl/react:lib $1 --js) || (  exit 0 )
# Script ends
fi
) || (
  echo "ERROR: Please provide the Library's name"
)
echo ""
