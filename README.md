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
* Express looks for a system environment variable called NODE_ENV at the process.env object, otherwise it's set to "development"
* ```$ export NODE_ENV=production```
* To set NODE_ENV every time you log in: ```$ echo export NODE_ENV=production >> ~/.bash_profile
* To set NODE_ENV for a single run of the app (not persist): ```$ NODE_ENV=production node app```

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

##Cookie Middleware Options
* domain - Domain name for the cookie. Defaults to loaded domain name
* path - Path for the cookie. Defaults to "/"
* secure - Marks the cookie as HTTPS only
* expires - Expiry date of the cookie in GMT. If not specified or set to 0, creates a session cookie (session cookies may not be deleted when browser remembers tabs)
* maxAge - Convenient option for setting the expiry time relative to the current time (in milliseconds)
* httpOnly - Helps avoid XSS by disallowing client-side access
* signed - Signed cookie invalidated by tampering. To sign, pass a string to middleware when instantiating. Signed cookies are accessible through res.signedCookies not res.cookies

##Session Middleware Options
* key - Name of the cookie (defaults to connect.sid)
* store - Instance of a session store (defaults to MemoryStore). The session store may support options of its own
* secret - Secret for signing the cookie, required if not passed to cookieParser()
* cookie - regular cookie settings
* proxy - Whether or not to trustr the reverse proxy (default false)

##Benchmarking app with siege
####```siege -b -c100 -t10S http://localhost:3000/```
* -b - Indicates we're benchmarking, no delay between requests
* -c - Number of concurrent connections
* -t Duration of benchmarking test ([S] Seconds, [M] Minutes, [H] Hours)

####Results
* Transactions - The number of requests made.
* Availability - The percentage of socket connections successfully handled by the server.
* Elapsed Time - The duration of the entire siege test.
* Data Transferred - The sum of data transferred to every siege- simulated user. It includes the header information as well as the content. Because it includes header information, the number reported by siege will be larger then the number reported by the server. In internet mode, which hits random URLs in a configuration file, this number is expected to vary from run to run.
* Response Time - The average time taken to respond to each simulated user's requests.
* Transaction Rate - The average number of transactions the server was able to handle per second.
* Throughput  - The average number of bytes transferred every second from the server to all the simulated users.
* Concurrency - The average number of simultaneous connections, a number that rises as server performance decreases.
* Successful Transactions - The number of times the server returned a code less then 400.
* Failed Transactions - The number of times the server responded with a return code more than or equal to 400 plus the sum of all failed socket transactions, which includes socket timeouts
* Longest Transaction - The longest period of time that any single transaction took, out of all transactions.
* Shortest Transaction - The least period of time that any single transaction took, out of all transactions.

##Daemonize with Forever
* ```forever start app.js``` - Start app.js in the background and restart if it crashes
* ```forever list``` - List all the processes started with forever
* '''forever stop <process index>``` - Stop the specified process. Index can be gleaned from ```forever list```
* ```forever restart <process index>``` - Restart the specified process
####Forever options
* -m  MAX - Only run the specified script MAX times
* -l  LOGFILE - Logs the forever output to LOGFILE
* -o  OUTFILE - Logs stdout from child script to OUTFILE
* -e  ERRFILE - Logs stderr from child script to ERRFILE
* --plain          alias of --no-colors
* -d, --debug      Forces forever to log debug output
* -v, --verbose    Turns on the verbose messages from Forever
* -s, --silent     Run the child script silencing stdout and stderr
* -w, --watch      Watch for file changes

##Start App on Reboot with Upstart
* ```start myapp``` - starts the ```myapp``` job 
* ```restart myapp``` - Take a wild guess
* ```stop myapp``` - You'll never figure this one out!
###Example Upstart Job
*Upstart jobs are stored in /etc/init as .conf files*
```
description "Daemonized Express App"
author "Hack Sparrow"
# When to start the process
start on runlevel [2345]
# When to stop the process
stop on runlevel [016]
# The process to start
exec sudo -u www-data /usr/local/bin/node /var/www/example/app.js
# Restart the process if it is down
respawn
# Limit restart attempt to 10 times within 10 seconds
respawn limit 10 10

```