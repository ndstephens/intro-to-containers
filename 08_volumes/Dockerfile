# Bind mounts are great for when you need to share data between your host and your container as we just learned. Volumes, on the other hand, are so that your containers can maintain state between runs. So if you have a container that runs and the next time it runs it needs the results from the previous time it ran, volumes are going to be helpful. Volumes can not only be shared by the same container-type between runs but also between different containers. Maybe if you have two containers and you want to log to consolidate your logs to one place, volumes could help with that.

# They key here is this: bind mounts are file systems managed the host. They're just normal files in your host being mounted into a container. Volumes are different because they're a new file system that Docker manages that are mounted into your container. These Docker-managed file systems are not visible to the host system (they can be found but it's designed to be.)

FROM node:12-alpine

WORKDIR /src

COPY --chown=node:node . .

CMD ["node", "index.js"]

# BUILD
# docker build -t incrementor .

# RUN
# docker run --rm incrementor

# Every time you run this it'll be the same thing. That is, nothing is persisted once the container finishes. We need something that can live between runs. We could use bind mounts and it would work but this data is only designed to be used and written to within Docker which makes volumes preferable and recommended by Docker. If you use volumes, Docker can handle back ups, clean ups, and more security for you. If you use bind mounts, you're on your own.

# So, without having to rebuild your container, try this

# RUN
# docker run --rm --env DATA_PATH=/data/num.txt --mount type=volume,src=incrementor-data,target=/data incrementor

# Now you should be to run it multiple times and everything should work! We use the --env flag to set the DATA_PATH to be where we want Node.js to write the file and we use --mount to mount a named volume called incrementor-data. You can leave this out and it'll be an anonymous volume that will persist beyond the container but it won't automatically choose the right one on future runs. Awesome!

