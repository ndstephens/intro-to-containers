FROM node:12-stretch

# node images have a "node user".  it's home dir is at /home/node.  this is simply built into the node image...not all images have built-in users
USER node
# here is how a user group and user would be added if the official Node image didn't already do it for you:
# RUN addgroup -S node && adduser -S node -G node
# then after that you would include:
# USER node

# basically setting the variable "WORKDIR"...where the files will be copied to
# "src" is a directory that will be created
WORKDIR /home/node/src

# set user permissions to user-group "node" and user "node" before copying the file over, otherwise has root-user permissions
# the "." represents the WORKDIR variable, which is set to "/home/node/src"
COPY --chown=node:node index.js .

CMD ["node", "/home/node/code/index.js"]

# BUILD
# docker build -t node-app .

# RUN
# docker run --init --rm -p 3000:3000 node-app

# --init enables you to use Ctrl-C to exit/kill the running node container
# Your normal CTRL+C won't work. Node.js itself doesn't handle SIGINT (which is what CTRL+C is) in and of itself. Instead you either have to handle it yourself inside of your Node.js code (preferable for real apps) or you can tell Docker to handle it with the --init flag. This uses a package called tini to handle shutdown signal for you.

# --rm will delete the container once it's killed

# -p (short for --publish) is for port forwarding
# The publish part allows you to forward a port out of a container to the host computer. In this case we're forwarding the port of 3000 (which is what the Node.js server was listening on) to port 3000 on the host machine. The 3000 represents the port on the host machine and the second 3000 represents what port is being used in the container. If you did "docker run --publish 8000:3000 my-node-app" you'd open localhost:8000 to see the server (running on port 3000 inside the container).