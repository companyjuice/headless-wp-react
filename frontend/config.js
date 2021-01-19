let wpUrl = 'http://companyjuice.com:8080/wp-json';

// If we're running on Docker, use the WordPress container hostname instead.
if (process.env.HOME === '/home/node') {
  wpUrl = 'http://wp-headless:8080/wp-json';
}
const Config = {
  apiUrl: wpUrl,
  AUTH_TOKEN: 'auth-token',
  USERNAME: 'username',
};

export default Config;
