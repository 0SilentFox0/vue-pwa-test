# additional modules stage (brotli)
# See https://github.com/nginxinc/docker-nginx/blob/f3fe494531f9b157d9c09ba509e412dace54cd4f/modules/Dockerfile.alpine
FROM nginx:mainline-alpine as module-builder
ARG ENABLED_MODULES
RUN set -ex \
    && if [ "$ENABLED_MODULES" = "" ]; then \
    echo "No additional modules enabled, exiting"; \
    exit 1; \
    fi

RUN set -ex \
    && apk update \
    && apk add linux-headers openssl-dev pcre-dev zlib-dev openssl abuild \
    musl-dev libxslt libxml2-utils make mercurial gcc unzip git \
    xz g++ \
    # allow abuild as a root user \
    && printf "#!/bin/sh\\n/usr/bin/abuild -F \"\$@\"\\n" > /usr/local/bin/abuild \
    && chmod +x /usr/local/bin/abuild \
    && hg clone -r ${NGINX_VERSION}-${PKG_RELEASE} https://hg.nginx.org/pkg-oss/ \
    && cd pkg-oss \
    && mkdir /tmp/packages \
    && for module in $ENABLED_MODULES; do \
    echo "Building $module for nginx-$NGINX_VERSION"; \
    if [ -d /modules/$module ]; then \
    echo "Building $module from user-supplied sources"; \
    # check if module sources file is there and not empty
    if [ ! -s /modules/$module/source ]; then \
    echo "No source file for $module in modules/$module/source, exiting"; \
    exit 1; \
    fi; \
    # some modules require build dependencies
    if [ -f /modules/$module/build-deps ]; then \
    echo "Installing $module build dependencies"; \
    apk update && apk add $(cat /modules/$module/build-deps | xargs); \
    fi; \
    # if a module has a build dependency that is not in a distro, provide a
    # shell script to fetch/build/install those
    # note that shared libraries produced as a result of this script will
    # not be copied from the builder image to the main one so build static
    if [ -x /modules/$module/prebuild ]; then \
    echo "Running prebuild script for $module"; \
    /modules/$module/prebuild; \
    fi; \
    /pkg-oss/build_module.sh -v $NGINX_VERSION -f -y -o /tmp/packages -n $module $(cat /modules/$module/source); \
    elif make -C /pkg-oss/alpine list | grep -E "^$module\s+\d+" > /dev/null; then \
    echo "Building $module from pkg-oss sources"; \
    cd /pkg-oss/alpine; \
    make abuild-module-$module BASE_VERSION=$NGINX_VERSION NGINX_VERSION=$NGINX_VERSION; \
    apk add $(. ./abuild-module-$module/APKBUILD; echo $makedepends;); \
    make module-$module BASE_VERSION=$NGINX_VERSION NGINX_VERSION=$NGINX_VERSION; \
    find ~/packages -type f -name "*.apk" -exec mv -v {} /tmp/packages/ \;; \
    else \
    echo "Don't know how to build $module module, exiting"; \
    exit 1; \
    fi; \
    done

# build stage
FROM node:18 as build-stage
ARG FONTAWESOMETOKEN="-"
WORKDIR /
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm config set "@fortawesome:registry" https://npm.fontawesome.com/ && npm config set "//npm.fontawesome.com/:_authToken" $FONTAWESOMETOKEN
RUN npm install
COPY ./env ./env
COPY ./src ./src
COPY ./public ./public
COPY ./index.html ./
COPY ./pwa.config.ts ./
COPY ./tsconfig.json ./
COPY ./vite.config.ts ./

# CMD ["sh"] 
RUN npm run build -- --mode development
RUN printf '%s\n' 'User-agent: *' 'Disallow: /' > /dist/robots.txt
RUN printf $(date +"%Y%m%d-%H%M%S") > /dist/version.txt

# production stage
FROM nginx:mainline-alpine as production-stage
ARG ENABLED_MODULES
COPY --from=module-builder /tmp/packages /tmp/packages
RUN set -ex \
    && for module in $ENABLED_MODULES; do \
    apk add --no-cache --allow-untrusted /tmp/packages/nginx-module-${module}-${NGINX_VERSION}*.apk; \
    done \
    && rm -rf /tmp/packages
COPY --from=build-stage /dist /usr/share/nginx/html
COPY deployment/development/nginx.conf /etc/nginx/nginx.conf

# upgrade musl to remove potential vulnerability
RUN apk upgrade musl

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 

