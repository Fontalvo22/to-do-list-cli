## Installation

The project is easy to run, just should have installed `docker` and `docker-compose`.

For quick install in windows, [download from here](https://www.docker.com/products/docker-desktop/)

Then, run these commands:

```bash
docker-compose up -d --build
```

You can configure the app mode in the ".env" file, the variables called "RUN_MODE". This variable can take two values: dev, or production.

When you enter in the `dev` mode, this activates automatically the run of the unit tests in watching mode and also activates the hot reload.

For you can check the logs and work with the hot reaload, execute:

```bash
docker logs -f app
```

### If you are in production mode

With all the containers running, you can interact with the app executing:

| Platform                                | command                         |
| :-------------------------------------- | :------------------------------ |
| Windows, **using the git bash console** | `docker exec -it app sh`        |
| Windows, **using CMD or powershell**    | `docker exec -it app /bin/bash` |
| Linux                                   | `docker exec -it app /bin/bash` |

Then, when you are inside of the docker container, you can see all the app commands using:

```bash
tasks -h
```

The only two commands that you can execute without login are: register and login

Before start using the app, try typing:

```bash
tasks info
```

Ok, enough, I'll let you interact with the app, if you have any question or need anything, just contact me :wink:
