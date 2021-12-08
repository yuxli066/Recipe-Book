# =========================== Production Build =========================== #
# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM alpine:latest as build-stage
WORKDIR /app

COPY package.json .
COPY client/package.json client/package.json

RUN apk add yarn
RUN yarn install --production

COPY ./client/ ./client/
RUN yarn build

# host app using same express api as api
FROM alpine:latest
WORKDIR /app

RUN apk add yarn

COPY --from=build-stage /app/client/build /app
COPY --from=build-stage /app/client/public /app
COPY --from=build-stage /app/package.json package.json
COPY server/package.json server/package.json
RUN yarn install

COPY api/ server/

EXPOSE 3000
CMD ["yarn","start"]
# =========================== Production Build =========================== #




