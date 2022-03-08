##################
# Server BUILDER #
##################

FROM node:14 as builder

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install

COPY . .

# RUN yarn build
# RUN npm audit fix

#########
# FINAL #
#########

FROM node:14-alpine

ENV APP_HOME=/home/app
ENV APP_SERVER=/home/app/server
ENV DATA_DIR=/data

RUN mkdir $DATA_DIR

WORKDIR $APP_HOME
COPY --from=builder /usr/src/app $APP_SERVER

EXPOSE 3232

# create the app user
RUN addgroup -S app \
  && adduser -S app -G app

# chown all the files to the app user
RUN chown -R app:app $APP_HOME
# RUN chown -R app:app $DATA_DIR

# change to the app user
USER app

WORKDIR $APP_SERVER
CMD [ "yarn", "start" ]