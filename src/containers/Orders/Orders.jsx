import React, {useEffect} from 'react'
import Order from './Order/Order'
import axios from '../../axios/orders'
import withErrorHandler from '../../hoc/withErrorHandler'
import {connect} from 'react-redux'
import {fetchOrders} from '../../redux/orders/actions/orders'

const Orders = props => {
    useEffect(() => {
        props.fetchOrders(props.tokenId, props.userId)
    }, [])

    const {orders} = props

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