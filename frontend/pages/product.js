/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Menu from '../components/Menu';
import { withRouter } from 'next/router';

const Product = withRouter( props  => {


	const [ loading, setLoading ] = useState( false );
	const [ product, setProduct ] = useState( {} );

	const { headerMenu } = props;

	useEffect( () => {
		const productId = props.router.query.id;
		setLoading( true );
		axios.get( `/getProduct/${productId}` )
			.then( res => {
				setLoading( false );
				setProduct( res.data );
			} )
			.catch( err => console.warn( err.response.data ) );
	}, [] );
	console.warn( 'product', product );
	return (
		<Layout>
			<Menu menu={headerMenu} />
			{ loading ? <h3>Loading...</h3> : '' }
			{ Object.keys( product ).length ? (

				<div>
					<h3>Products</h3>
					<div className="products-wrapper">
						<div className="product-container" key={product.id}>
							<img className="product-image" src={product.images[0].src} alt={ product.name }/>
							<h5 className="product-name">{product.name}</h5>
							<p className="product-price">${product.price}</p>
							<Link href={`/product?id=${product.id}`}><a className="product-view-link">Buy</a></Link>
						</div>
					</div>
				</div>
			) : '' }
		</Layout>

	)
} );

Product.getInitialProps = async function( context ) {

}




export default PageWrapper(Product);
