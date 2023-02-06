FROM        --platform=$TARGETOS/$TARGETARCH node:18-bullseye-slim
LABEL       author="Forcehost"
RUN         apt update \
            && apt -y install ffmpeg iproute2 git sqlite3 libsqlite3-dev python3 python3-dev ca-certificates dnsutils tzdata zip tar curl build-essential libtool \
            && useradd -m -d /home/container container
RUN         npm install npm@latest -g
USER        container
ENV         USER=container HOME=/home/container
WORKDIR     /home/container
COPY ["./package.json", "./package-lock.json*", "./npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 25566
RUN chown -R container /home/container
CMD ["npm", "start"]
