# change this to "alpine" from "stretch"
FROM node:12-alpine

USER node

RUN mkdir /home/node/src

WORKDIR /home/node/src

COPY --chown=node:node package-lock.json package.json ./

RUN npm ci

COPY --chown=node:node . .

CMD ["node", "index.js"]

# BUILD
# docker build -t node-app .

# RUN
# docker run --init --rm -p 3000:3000 node-app

# changing to "alpine" is good for production deploys.  however, b/c it's very stripped-down it's missing a lot of functionality you may want if using the container in development...such as missing a full version of bash.  you can also create a "dev" Dockerfile and container