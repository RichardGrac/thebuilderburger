import React from 'react'
import Classes from './Spinners.css'

const Spinner = () => {
    return (
        <React.Fragment>
            <div
                className={Classes.loader}
                style={{marginTop: '30%'}}>
                Loading...
            </div>
            <h3 style={{textAlign:'center'}}>Wait please...</h3>
        </React.Fragment>
    )
}

export default Spinner
