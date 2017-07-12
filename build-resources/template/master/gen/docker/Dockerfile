<%= constant.warning %>

FROM node:alpine

LABEL name=fju-health-api
LABEL version=0.0.1
WORKDIR /usr/src/app
RUN npm install -g nodemon
EXPOSE 3001
CMD <%= dockerfileCmd %>