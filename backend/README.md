## 📦 WordPress Docker Setup

- WordPress
- Composer
- MySQL
- phpMyAdmin

## Setup

This is not required if you have run `./nextwp configure` as explained in the project's root [README.md](https://github.com/itsamoreh/nextjs-headless-wordpress/blob/master/README.md).

Run this from the `backend` directory (or run `./nextwp start-backend` from the root directory):

```bash
docker-compose -f docker-compose.yml up -d
```

This will start the docker containers in [detached mode](https://docs.docker.com/engine/reference/run/#detached--d).

*WordPress* will be available at [http://localhost:8080](http://localhost:8080).

*phpMyAdmin* will be available at [http://localhost:8183](http://localhost:8183).

```shell script
port: mysql:3306
username: root
password: root
```

## Development

1. If you modify `composer.json`, run this from the `backend` directory (or run `./nextwp stop && ./nextwp start-backend` from the root directory):

```shell script
docker-compose -f docker-compose.yml down && \
docker-compose -f docker-compose.yml up -d 
```

This will stop all docker containers related to this project, then start them in [detached mode](https://docs.docker.com/engine/reference/run/#detached--d).

2. To check logs:

```shell script
docker logs -f container-name
```

While the above commands are running in detached mode, you can run this command to see the live logs. To get `container-name` see below.

```bash
CONTAINER ID        IMAGE               COMMAND                  CREATED              STATUS              PORTS                  NAMES
165fb86452bd   phpmyadmin/phpmyadmin   "/docker-entrypoint.…"   6 seconds ago   Up 5 seconds   0.0.0.0:8183->80/tcp, :::8183->80/tcp   backend_phpmyadmin_1
0ce0621df4e6   wordpress:latest        "docker-entrypoint.s…"   6 seconds ago   Up 5 seconds   0.0.0.0:8080->80/tcp, :::8080->80/tcp   backend_wordpress_1
8f511be2001e   composer                "/docker-entrypoint.…"   7 seconds ago   Up 6 seconds                                           backend_composer_1
68f04c4988cb   mysql:8.0               "docker-entrypoint.s…"   7 seconds ago   Up 6 seconds   3306/tcp, 33060/tcp                     backend_mysql_1
```

The last column lists the container names.

3. If you make changes to docker-compose.yml file, run the following (or run `./nextwp stop && ./nextwp start-backend` from the root directory):

```shell script
docker-compose -f docker-compose.yml down && \
docker-compose -f docker-compose.yml up -d
```

**Note:** If you changed the ports in `docker-compose.yml` in addition to running the commands above.

## Docker Images

[WordPress](https://hub.docker.com/_/wordpress)
[Composer](https://hub.docker.com/_/composer)
[MySQL 8.0](https://hub.docker.com/_/mysql)
[phpMyAdmin](https://hub.docker.com/_/phpmyadmin)
