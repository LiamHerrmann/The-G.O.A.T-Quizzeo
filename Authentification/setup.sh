#!/bin/sh

# mettre à jour les dépendences
npm i -g npm-check-updates
ncu -u

#
npm install
