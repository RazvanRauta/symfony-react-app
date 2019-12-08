#!/usr/bin/env bash
symfony run -d yarn dev-server &&  symfony server:start
trap EXIT
symfony server:stop