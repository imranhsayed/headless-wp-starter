let wpUrl = 'http://localhost:8080/wp-json';

// If we're running on Docker, use the WordPress container hostname instead of localhost.
if (process.env.HOME === '/home/node') {
  wpUrl = 'http://wp-headless:8080/wp-json';
}
const Config = {
  apiUrl: wpUrl,
  AUTH_TOKEN: 'auth-token',
  USERNAME: 'username',

	WooConsumerKey: 'ck_7d348678e9b514fb6f4d9e468ad287a0110a7919',
	WooSecret: 'cs_0c90700142f65d732c4e4c9b71d9156c9ba1d6f8'
};

export default Config;
