import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component{
    render(){
        return(
            <StripeCheckout 
                name = "Response Hub"
                description = "$1 for 1 Credit"
                amount = {500}
                token = {token => this.props.handleToken(token)}
                stripeKey = {process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn  yellow accent-4">Add Credits</button>
            </StripeCheckout>
        );
    }
}

export default connect(null, actions)(Payments);