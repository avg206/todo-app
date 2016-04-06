#!/bin/bash
set -e # exit with nonzero exit code if anything fails

npm build

# inside this git repo we'll pretend to be a new user
git config user.name "Travis CI"
git config user.email "travis@domain.com"

rm -rf .gitignore

# The first and only commit to this new Git repo contains all the
# files present with the commit message "Deploy to GitHub Pages".
git add -A
git commit -m "Deploy to Heroku"