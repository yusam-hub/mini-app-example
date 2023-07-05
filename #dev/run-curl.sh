#!/bin/bash

for i in $(seq 1 10);
do
    sh /var/www/single-curl.sh &
done