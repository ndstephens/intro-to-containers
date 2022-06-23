Sometimes our containers need to be stateful in some capacity. Sometimes our containers need to read and write to the host. This is fundamentally at odds with the idea of a stateless, able-to-create-and-destroy-anytime container that we've been adhering to thusfar. So what are we to do?

Bind mounts allow you to mount files from your host computer into your container. This allows you to use the containers a much more flexible way than previously possible: you don't have to know what files the container will have when you build it and it allows you to determine those files when you run it.

In the previous project, we used the NGINX container to build a container with our static assets baked into the container. In general this what I recommend you do since now we can ship that container anywhere and it'll just work. It's totally self-contained. But what if we just want to run a NGINX container locally to test stuff out? Sure, we could make a new Dockerfile and write it, but wouldn't it be cool if we could just use the NGINX container directly?

We'll run `docker run --mount type=bind,source="$(pwd)"/build,target=/usr/share/nginx/html -p 8080:80 nginx:1.17`

> `source` can be `src`
>
> `target` can be `dst`
>
> **NOTE:** I copied the '/build' directory from the previous project into this one, instead of copying over the entire project, just for the sake of example

Then check `localhost:8080` in your browser. A basic React project should be running

We're running a container with `nginx`, but the `/build` directory and its files live on this host computer, they are _NOT_ within the container itself.

This is how you do bind mounts. It's a bit verbose but necessary. Let's dissect it.

- We use the `--mount` flag to identify we're going to be mounting something in from the host.
- As far as I know the only two types are `bind` and `volume`. Here we're using `bind` because we to mount in some piece of already existing data from the host.
- In the source, we identify what part of the host we want to make readable-and-writable to the container. It has to be an absolute path (e.g we can't say `"./build"`) which is why use the `"$(pwd)"` to get the present working directory to make it an absolute path.
- The target is where we want those files to be mounted in the container. Here we're putting it in the spot that NGINX is expecting.
- As a side note, you can mount as many mounts as you care to, and you mix bind and volume mounts. NGINX has a default config that we're using but if we used another bind mount to mount an NGINX config to `/etc/nginx/nginx.conf` it would use that instead.
