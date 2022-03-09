const express = require( 'express' )
const morgan = require( "morgan" )
const { createProxyMiddleware } = require( 'http-proxy-middleware' )

// Create Express Server
const app = express()

// Configuration
const PORT = process.env.PORT || 3232
const HOST = "localhost"
const API_ID = process.env.APP_ID || "joplin"
const API_SERVICE_URL = process.env.APP_URL || "https://joplin.terabits.io/"
const APP_URL_MAP = {
  "homer": "https://homer.local.terabits.io/",
  "tv": "http://tv.tvzon.tv/",
  // "homer": "http://proxy-pi.local.io:28093",
  "joplin": "https://joplin.cap.terabits.io/",
  "wiki": "https://wiki.terabits.io/",
  "kasm": "https://kasm.local.terabits.io/",
}

// Logging
app.use( morgan( 'dev' ) )

// Info GET endpoint
app.get( '/info', ( req, res, next ) => {
  res.send( 'This is a proxy service which proxies to JSONPlaceholder API.' )
} )

// // Authorization
// app.use( '', ( req, res, next ) => {
//   if ( req.headers.authorization ) {
//     next()
//   } else {
//     res.sendStatus( 403 )
//   }
// } )

const proxyMiddlewares = {}

function createProxyFromHeader( req, res, next ) {
  const appID = req.headers[ 'app_id' ] || API_ID
  const appURL = req.headers[ 'app_url' ] ? req.headers[ 'app_url' ] :
    appID && APP_URL_MAP[ appID ] ? APP_URL_MAP[ appID ] : API_SERVICE_URL
  // console.log( "Headers:", req.headers )
  console.log( "App URL:", appURL )

  const proxy = proxyMiddlewares[ appURL ] ? proxyMiddlewares[ appURL ] :
    createProxyMiddleware( {
      target: appURL,
      changeOrigin: true,
      secure: false,
      autoRewrite: true,
      protocolRewrite: 'http',
      ws: true,
    } )

  proxyMiddlewares[ appURL ] = proxy

  return proxy ? proxy( req, res, next ) : res.send( 'not found' )
}

app.use( '/', createProxyFromHeader )

// // Proxy endpoints
// app.use( '/', createProxyMiddleware( {
//   target: API_SERVICE_URL,
//   changeOrigin: true,
//   secure: false,
//   autoRewrite: true,
//   protocolRewrite: 'http',
//   ws: true,
// } ) )

// // Proxy endpoints
// app.use( '/wiki', createProxyMiddleware( {
//   target: API_SERVICE_URL,
//   changeOrigin: true,
//   pathRewrite: {
//     [ `^/wiki` ]: '',
//   },
// } ) )

// Start Proxy
app.listen( PORT, () => {
  console.log( `Starting Proxy at http://${HOST}:${PORT}` )
} )
