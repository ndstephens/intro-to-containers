FROM node:12-stretch

# node images have a "node user".  it's home dir is at /home/node.  this is simply built into the node image...not all images have built-in users
USER node

# create a "root" folder in the node-user directory
WORKDIR /home/node/src

# set user permissions before copying the file over, otherwise has root-user permissions
COPY --chown=node:node index.js .

CMD ["node", "/home/node/code/index.js"]
