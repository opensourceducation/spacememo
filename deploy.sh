#!/bin/bash

# echo "Path:  $PWD"

# echo "param:   $1"

cd javascript/

if [ -n "$2" ] && [ $2 == "minor" ]
then 
  # 1.2.3 -> 1.3.0
  npm version minor
elif [ -n "$2" ] && [ $2 == "major" ]
then 
  # 1.2.3 -> 2.0.0
  npm version major
else  
  # 1.2.3 -> 1.2.4 
  npm version patch
  echo "parche"
fi

cd ..

echo $(node -p "require('./javascript/package.json').version")

git add .

if [ -n "$1" ]
then 
  git commit -m "Release v$(node -p "require('./javascript/package.json').version")  $1"
else 
  git commit -m "Release v$(node -p "require('./javascript/package.json').version")"
fi

git push origin main