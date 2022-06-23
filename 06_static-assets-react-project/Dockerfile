# BUILD STAGE
# if you're using a CI pipeline then you might build in a separate pipeline stage that will basically do the same thing
# to build the app we need node and npm, so that's the image we'll use
# if you check out the image on Docker Hub you'll also see that it includes Yarn
FROM node:latest AS build
# set/create a working directory (here we're putting it in a directory called "app" instead of directly on the root)
WORKDIR /app
# copy the entire project contents (minus anything in the .dockerignore file) over into "/app"
COPY . .
# install all dependencies and then build the app
RUN npm ci && npm run build

# RUNTIME STAGE
# the static files created from "npm run build" that exist in the "/app/build" directory (in the previous stage and container) will be served statically from nginx
# could also use "nginx:alpine"
FROM nginx:latest
# copy the "/app/build" directory from the previous stage into the default directory that nginx uses for serving static content
# the default nginx CMD will immediately run and serve whatever is in the "/usr/share/nginx/html" directory...that's why we don't supply a CMD ourselves
COPY --from=build /app/build /usr/share/nginx/html

# BUILD
# docker build -t static-app .

# RUN
# docker run --rm -p 8080:80 static-app

# no need for "--init" here b/c nginx understands the exit or kill command

# The project is to make a multi-stage Dockerfile that builds the project in one container and then serves it from a different container using NGINX. NGINX is a static file server, which is to say it takes HTML, CSS, JS, images, fonts, etc. and serves them to your users. It handles all the serving and file headers for you. Using it can be accomplished in few steps. You'll use the nginx:latest (or nginx:alpine! up to you) container and copy just the newly built files, not everything (which is in the build directory inside of the CRA app) to /usr/share/nginx/html and the nginx will take care of the rest. The nginx container defines CMD in it and if you don't override it, it starts NGINX for you. NGINX runs on port 80 by default, so you probably want to route that to something like 8080 on your host machine...otherwise you have to run it as root which no one wants to do.
