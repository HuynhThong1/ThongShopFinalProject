import React from 'react'

export default function LoadingBox() {
    return (
        // <div style={{height: '80vh', lineHeight: '100%',display: 'flex', alignItems: 'center', justifyContent: 'center',textAlign: 'center'}}>
        //     <i style={{marginRight: '1rem'}} className="fas fa-spinner"></i>Loading...
        // </div>

        <div className="loading">
            <div className="loading-content">
                {/* <i style={{ marginRight: '1rem' }} className="fas fa-spinner"></i>Loading... */}
                <span className="back">
                    <span>L</span>
                    <span>o</span>
                    <span>a</span>
                    <span>d</span>
                    <span>i</span>
                    <span>n</span>
                    <span>g</span>
                </span>
            </div>
        </div>
    )
}
