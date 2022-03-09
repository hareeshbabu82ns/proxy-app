* vercel cli is installed as dev dependency
* build and deploy with `yarn vercel`
* build and deploy to prod `yarn vercel --prod`

# Docker Build
```sh
docker build . -t proxy-server
```

# Docker Run
```sh
docker run -d -p 3232:3232 \
  -e "APP_ID=homer" \
  --name proxy-server proxy-server
# or
docker run -d -p 3232:3232 \
  -e "APP_URL=https://joplin.cap.terabits.io" \
  --name proxy-server proxy-server

docker rm -f proxy-server
```

# Switching Proxy using Browser Headers
* `APP_ID` to switch between known apps
* `APP_URL` to switch using HTTP url