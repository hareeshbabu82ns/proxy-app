const express = require( 'express' )
const morgan = require( "morgan" )
const { createProxyMiddleware } = require( 'http-proxy-middleware' )

// Create Express Server
const app = express()

// Configuration
const PORT = 3232
const HOST = "localhost"
// const API_SERVICE_URL = "http://proxy-pi.local.io:28093" // homer
// const API_SERVICE_URL = "http://docker-ct.local.io:28093"
// const API_SERVICE_URL = "https://jsonplaceholder.typicode.com"
// const API_SERVICE_URL = "https://joplin.terabits.io/"
const API_SERVICE_URL = "https://wiki.terabits.io/"
// const API_SERVICE_URL = "https://kasm.local.terabits.io/"

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

// // Proxy endpoints
// app.use( '/homer', createProxyMiddleware( {
//   target: HOMER_SERVICE_URL,
//   changeOrigin: true,
//   secure: false,
//   autoRewrite: true,
//   protocolRewrite: 'http',
//   pathRewrite: ( path, req ) => path.replace( '/homer', '' )
// } ) )

// Proxy endpoints
app.use( '/', createProxyMiddleware( {
  target: API_SERVICE_URL,
  changeOrigin: true,
  secure: false,
  autoRewrite: true,
  protocolRewrite: 'http',
  ws: true,
} ) )

// // Proxy endpoints
// app.use( '/wiki', createProxyMiddleware( {
//   target: API_SERVICE_URL,
//   changeOrigin: true,
//   pathRewrite: {
//     [ `^/wiki` ]: '',
//   },
// } ) )

// Start Proxy
app.listen( PORT, HOST, () => {
  console.log( `Starting Proxy at http://${HOST}:${PORT}` )
} )
