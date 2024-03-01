FROM  pathsongs-tilemaker3 AS src
LABEL Description="pathsongs-tilemaker3-tiles" Version="1.0.0"

ARG DEBIAN_FRONTEND=noninteractive

COPY process.lua .
COPY config.json .

