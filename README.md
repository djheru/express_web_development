express_web_development
=======================

Node/Express Training

package.json - All possible fields: [http://package.json.nodejitsu.com/] (http://package.json.nodejitsu.com/)

*To add a dependency to package.json automatically, pass --save/-S flag to like ```npm install <package> -S```*

List of node modules: [https://github.com/joyent/node/wiki/Modules] (https://github.com/joyent/node/wiki/Modules)

##Middleware included in express by default:
* router - The app's routing system
* logger - Log requests to the server
* compress - gzip/deflate support on the server
* basicAuth - Basic HTTP authentication
* json - Parse application/json
* urlencoded - Parse application/x-www-form-urlencoded
* multipart - Parse multipart/form-data
* bodyParser - Parse request body. Bundles json, urlencoded, and multipart middlewares together
* timeout - Request timeout
* cookieParser - Cookie parser
* session - Session support
* cookieSession - Cookie-based sessions
* methodOverride - HTTP method support
* responseTime - Show server response time
* static - Static assets directory for the website
* staticCache - Cache for the static middleware
* directory - Directory listing
* vhost - Enable vhost
* favicon - Favicon for the website
* limit - Limit the size of request body
* query - The GET query parser
* errorHandler - Generate HTML-formatted stack trace of errors in the server

##Formatting tokens for express.logger middleware:
* :req[header] - The specific HTTP header of the request
* :res[header] - The specific HTTP header of the response
* :http-version - The HTTP version
* :response-time - How long it took to generate the response
* :remote-addr - The user agent's IP address
* :date - Date and time of request
* :method - The HTTP method used for making the request
* :url - The requested URL
* :referrer - The URL that referred the current URL
* :user-agent - The user-agent signature
* :status - The HTTP status
* Can also use one of the following predefined formats: 'default', 'short', 'tiny', 'dev'