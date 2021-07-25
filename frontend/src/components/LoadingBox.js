import React from 'react'

export default function LoadingBox() {
    return (
        // <div style={{height: '80vh', lineHeight: '100%',display: 'flex', alignItems: 'center', justifyContent: 'center',textAlign: 'center'}}>
        //     <i style={{marginRight: '1rem'}} className="fas fa-spinner"></i>Loading...
        // </div>

        <div className="loading">
            <i style={{ marginRight: '1rem' }} className="fas fa-spinner"></i>Loading...
        </div>
    )
}
