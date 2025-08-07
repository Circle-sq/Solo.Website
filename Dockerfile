FROM node:20.17.0-alpine3.20
ENV HTTP_PORT=80 HTTP_INTERFACE=0.0.0.0
EXPOSE 80

WORKDIR /srv

CMD ["npm", "start"]

ARG lastCommit="noCommit"
ARG buildTime="noTime"
ARG gitBranch="develop"
ARG name="gpp-backoffice"
ARG version="1.0.1"

LABEL name=$name
LABEL version=$version
LABEL lastCommit=$lastCommit
LABEL buildTime=$buildTime
LABEL gitBranch=$gitBranch

COPY ./package.json /srv/package.json
COPY ./build /srv/build
# Uncomment next line if you are trying to run the Docker image locally
# COPY ./.env /srv/.env
COPY ./node_modules /srv/node_modules