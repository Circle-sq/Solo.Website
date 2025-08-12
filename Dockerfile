FROM node:20.17.0-alpine3.20

ENV HTTP_PORT=80 HTTP_INTERFACE=0.0.0.0
EXPOSE 80

WORKDIR /srv

# Build arguments
ARG lastCommit="noCommit"
ARG buildTime="noTime"
ARG gitBranch="develop"
ARG name="solo-website"
ARG version="1.0.1"
ARG GIT_COMMIT

# Labels
LABEL name=$name
LABEL version=$version
LABEL lastCommit=$lastCommit
LABEL buildTime=$buildTime
LABEL gitBranch=$gitBranch

# Copy built application and dependencies
COPY ./package.json /srv/package.json
COPY ./build /srv/build
COPY ./node_modules /srv/node_modules

# Uncomment next line if you are trying to run the Docker image locally
#COPY ./.env /srv/.env

CMD ["npm", "start"]
