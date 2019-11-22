#!/bin/sh

rm -rf dist/*
zip -r dist.zip .
cp dist.zip /dist/dist.zip