#!/bin/bash
symfony run -d yarn dev-server &&  symfony server:start --port=80
trap EXIT
symfony server:stop