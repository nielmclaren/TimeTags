FROM node:10.17.0-alpine

RUN apk update && apk add \
    git \
    openssh \
    zip

# Create location to host application
ENV APP_HOME /app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

# Install dependencies
ADD package.json .
ADD package-lock.json .
RUN npm install --production

# Add application code
ADD index.js .
ADD scripts scripts
ADD src src
