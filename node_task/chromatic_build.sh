#!/bin/bash

# Set the base branch
BASE_BRANCH=${BASE_BRANCH:-develop}

# Run the affected command for build-storybook
echo "npx nx affected -t build-storybook --exclude=sportsbook --base=${BASE_BRANCH} --parallel --maxParallel=2"
npx nx affected -t build-storybook --exclude=sportsbook --base=${BASE_BRANCH} --parallel --maxParallel=2

# Get the list of affected libraries
affected_libs=$(npx nx show projects --affected --base=${BASE_BRANCH})

# Function to build and deploy Storybook using Chromatic
build_storybook() {
  lib_name=$1
  chromatic_token=$2
  output_dir=$1
  storybook_target="build-storybook"

  npx chromatic --project-token=$chromatic_token --storybookBuildDir=./dist/storybook/$output_dir --zip --exit-zero-on-changes --ci
}

# Check if specific libraries are affected and build their Storybook
if [[ $affected_libs == *"ui-asian-view"* ]]; then
  build_storybook "ui-asian-view" $CHROMATIC_PROJECT_TOKEN
fi

if [[ $affected_libs == *"ui-solo"* ]]; then
  build_storybook "ui-solo" $CHROMATIC_SOLO_TOKEN
fi
