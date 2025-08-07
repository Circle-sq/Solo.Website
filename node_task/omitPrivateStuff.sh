#!/bin/bash
npx --yes json -I -f package-lock.json -e "delete this.packages['']['dependencies']['@gp-ninja/gpp-frontend-api']"
npx --yes json -I -f package-lock.json -e "delete this.packages['node_modules/@gp-ninja/gpp-frontend-api']"
#npx --yes json -I -f package-lock.json -e "delete this.dependencies['@gp-ninja/gpp-frontend-api']"
npx --yes json -I -f package.json -e "delete this.dependencies['@gp-ninja/gpp-frontend-api']"
npx --yes json -I -f package.json -e "delete this.scripts['prepare:playwright']"
