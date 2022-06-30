import React from 'react'
import RingLoader from 'react-spinners/RingLoader'

const LoadingPage = (props) => {
  return (
    <div style={{display:'flex',justifyContent:'center'}}>
        <RingLoader 
            color={'#ff4a4a'}
            loading={props.loading}
            size={150}
        />
    </div>
  )
}

export default LoadingPage