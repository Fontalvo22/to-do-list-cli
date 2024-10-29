## Installation

The project is easy to run, just should have installed `docker` and `docker-compose`.

For quick install in windows, [download from here](https://www.docker.com/products/docker-desktop/)

Then, run these commands:

```bash
docker-compose up -d --build
```

When you enter in the `dev` mode, this activates automatically the run of the unit tests in watching mode and also activates the hot reload.

For you can check the logs and work with the hot reaload, execute:

```bash
docker logs -f app
```

For enter in `production` mode, you can enter in the `.env` file, look for the variable called `RUN_MODE`, and change to `production`

### If you are in production mode

With all the containers running, you can interact with the app executing:

| Platform                                | command                         |
| :-------------------------------------- | :------------------------------ |
| Windows, **using the git bash console** | `docker exec -it app sh`        |
| Windows, **using CMD or powershell**    | `docker exec -it app /bin/bash` |
| Linux                                   | `docker exec -it app /bin/bash` |
