FROM node:12-stretch

USER node

# this actually creates the "src" directory and gives the "node" user permissions
# it's "RUN" as the node-user
RUN mkdir /home/node/src

# remember, this is setting the "WORKDIR" variable...where all the files will be copied to
WORKDIR /home/node/src

# TAKE ADVANTAGE OF CACHED LAYERS
# if you change any file then the build will have to restart from the main COPY
# instead you can start with the node modules since they often don't change
COPY --chown=node:node package-lock.json package.json ./

# this installs the node modules
# "npm ci" is better for CI environments
RUN npm ci

# THEN copy over everything else since this is often where changes happen.  everything else before this command will be cached from the previous build.
# The first COPY pulls just the package.json and the package-lock.json which is just enough to do the npm ci. After that we nab the rest of the files. Now if you make changes you avoid doing a full npm install. This is useful and recommended for any dependency installation: apt-get, pip, cargo, gems, etc. as well as any long-running command like building some from source.
COPY --chown=node:node . .

# The command can simply be "index.js" and not "/home/node/src/index.js" since it expects it to be in the "src" directory
CMD ["node", "index.js"]

# BUILD
# docker build -t node-app .

# RUN
# docker run --init --rm -p 3000:3000 node-app
