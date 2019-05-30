/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Menu from '../components/Menu';

class Products extends Component {

	constructor( props ) {
		super( props );

		this.state = {
			loading: false,
			products: []
		}
	}


	static async getInitialProps(context) {
	}

	componentDidMount() {
		this.setState( { loading: true }, () => {
			axios.get( '/getProducts' )
				.then( res => this.setState( { loading: false, products: res.data } ) )
				.catch( err => console.warn( err.response.data ) );
		} )
	}

	render() {
		const { headerMenu } = this.props;
		const { loading, products } = this.state;

		return (
			<Layout>
				<Menu menu={headerMenu} />
				{ loading ? <h3>Loading...</h3> : '' }
				{ products.length ? (

					<div>
						<h3>Products</h3>
						<div className="products-wrapper">
							{
								products.map( item => (
									<div className="product-container" key={item.id}>
										<img className="product-image" src={item.images[0].src} alt={ item.name }/>
										<h5 className="product-name">{item.name}</h5>
										<p className="product-price">${item.price}</p>
										<Link href={`/product/${item.id}`}><a className="product-view-link">View</a></Link>
									</div>
								) )
							}
						</div>
					</div>
				) : '' }
			</Layout>
		);
	}
}

export default PageWrapper(Products);
