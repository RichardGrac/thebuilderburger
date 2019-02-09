import React, {Component} from 'react'
import Order from './Order/Order'
import axios from '../../axios/orders'
import withErrorHandler from '../../hoc/withErrorHandler'
import {connect} from 'react-redux'
import {fetchOrders} from '../../redux/orders/actions/orders'

class Orders extends Component {

    state = {
        orders: this.props.orders
    }

    componentDidMount() {
        this.props.fetchOrders(this.props.tokenId, this.props.userId)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            orders: nextProps.orders
        })
    }

    render() {
        const {orders} = this.state

        let ordersElements = []
        if (orders !== null) {
            for (let order in orders) {
                ordersElements.push(<Order order={orders[order]} key={order} />)
            }
        } else {
            ordersElements = <h2 style={{textAlign: 'center', marginTop: '15%'}}>No orders registered.</h2>
        }

        return (
            <div>
                {ordersElements}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.ordersReducer.orders,
        tokenId: state.authReducer.tokenId,
        userId: state.authReducer.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (tokenId, userId) => dispatch(fetchOrders(tokenId, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))