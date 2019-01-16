import React, {Component} from 'react'
import Order from './Order/Order'
import axios from '../../axios/orders'
import withErrorHandler from '../../hoc/withErrorHandler'

class Orders extends Component {

    state = {
        orders: null
    }

    componentDidMount() {
        axios.get('orders.json')
            .then(response => {
                console.log('Response: ', response)
                this.setState({orders:response.data})
            })
            .catch(error => {
                console.error('Error getting orders: ', error)
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

export default withErrorHandler(Orders, axios)