FROM node:12-stretch

USER node

# this actually creates the "src" directory and gives the "node" user permissions
# it's "run" as the node-user
RUN mkdir /home/node/src

# remember, this is setting the "WORKDIR" variable...where the files will be copied to
WORKDIR /home/node/src

COPY --chown=node:node . .

# npm ci is better for CI environments
# this installs the node modules
RUN npm ci

CMD ["node", "index.js"]

# BUILD
# docker build -t node-app .

# RUN
# docker run --init --rm -p 3000:3000 node-app
