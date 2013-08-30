Express Web Development
=======================

Node/Express Training

package.json - All possible fields: [http://package.json.nodejitsu.com/] (http://package.json.nodejitsu.com/)

*To add a dependency to package.json automatically, pass --save/-S flag to like ```$ npm install <package> -S```*

List of node modules: [https://github.com/joyent/node/wiki/Modules] (https://github.com/joyent/node/wiki/Modules)

##Express bootstrap: ```$ express [options] [directory]```
* -h, --help output usage information
* -V, --version output the version number
* -s, --sessions add session support
* -e, --ejs add ejs engine support (defaults to jade)
* -J, --jshtml add jshtml engine support (defaults to jade)
* -H, --hogan add hogan.js engine support
* -c, --css <engine> add stylesheet <engine> support (less|stylus)
* directory defaults to pwd

##Application options:
* env The environment the app is running on.
* trust proxy Enables reverse proxy.
* jsonp callback name Callback name for JSONP requests.
* json replacer The JSON replacer callback.
* json spaces The amount of space for indenting JSON responses.
* case sensitive routing Makes route names case-sensitive.
* strict routing Trailing slash at the end of a route name should be treated as separate from that without.
* view cache Cache views. Enabled in production by default.
* view engine The engine for processing view files.
* views The directory of view files.

##Setting the application environment:
Express looks for a system environment variable called NODE_ENV at the process.env object, otherwise it's set to "development"
```$ export NODE_ENV=production```
To set NODE_ENV every time you log in: ```$ echo export NODE_ENV=production >> ~/.bash_profile
To set NODE_ENV for a single run of the app (not persist): ```$ NODE_ENV=production node app```

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

##Stylus Options
* serve - Serves stylus files from the dest directory
* force - Force recompilation of the Stylus files for every request
* src - Path to the stylus files
* dest - Path to output the compiled CSS files. Defaults to src
* compile - Custom compile function
* compress - Minifies the generated css
* firebug - Generates debug info for the FireStylus Firebug plugin
* linenos Shows commented Stylus line number

##res.cookie() Options
* domain - Domain name for the cookie. Defaults to loaded domain name
* path - Path for the cookie. Defaults to "/"
* secure - Marks the cookie as HTTPS only
* expires - Expiry date of the cookie in GMT. If not specified or set to 0, creates a session cookie (session cookies may not be deleted when browser remembers tabs)
* maxAge - Convenient option for setting the expiry time relative to the current time (in milliseconds)
* httpOnly - Helps avoid XSS by disallowing client-side access
* signed - Signed cookie invalidated by tampering. To sign, pass a string to middleware when instantiating. Signed cookies are accessible through res.signedCookies not res.cookies




