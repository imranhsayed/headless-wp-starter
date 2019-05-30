const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const WooCommerceAPI = require( 'woocommerce-api' );
const wooConfig = require( './wooConfig' );
const WooCommerce = new WooCommerceAPI({
	url: 'http://localhost:8080',
	consumerKey: wooConfig.wooConsumerKey,
	consumerSecret: wooConfig.wooSecret,
	wpAPI: true,
	version: 'wc/v3'
});

app
  .prepare()
  .then(() => {
    const server = express();

    server.get('/post/:slug', (req, res) => {
      const actualPage = '/post';
      const queryParams = { slug: req.params.slug, apiRoute: 'post' };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/page/:slug', (req, res) => {
      const actualPage = '/post';
      const queryParams = { slug: req.params.slug, apiRoute: 'page' };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/category/:slug', (req, res) => {
      const actualPage = '/category';
      const queryParams = { slug: req.params.slug };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/_preview/:id/:wpnonce', (req, res) => {
      const actualPage = '/preview';
      const queryParams = { id: req.params.id, wpnonce: req.params.wpnonce };
      app.render(req, res, actualPage, queryParams);
    });

	  /**
	   * Get All products
	   */
	  server.get( '/getProducts', ( request, response ) => {

		  // Get All Products
		  WooCommerce.get('products', function(err, data, res) {
			  response.json( JSON.parse(res) );
		  });
	  } );

	  /**
	   * Get Product by Id
	   */
	  server.get( '/getProduct/:id', ( request, response ) => {
	  	    const productId = request.params.id;

		  // Get Product by Id
		  WooCommerce.get( `products/${productId}`, function(err, data, res) {
			  response.json( JSON.parse(res) );
		  });
	  } );

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
