import React from 'react'

const eventNames = ['onDragStart', 'onDrag', 'onDragEnd'];

function round5(value) {
    return (Math.round(value * 1e5) / 1e5).toFixed(5);
}

export default function ControlPanel(props) {
    return (
        <div className="control-panel" style={{ position: 'fixed', top: 100, right: 30, backgroundColor: '#fff', borderRadius: '5px', padding: 10 }}>
            <h3>Draggable Marker</h3>
            <p>Try dragging the marker to another location.</p>
            <div>
                {eventNames.map(eventName => {
                    const { events = {} } = props;
                    const lngLat = events[eventName];
                    return (
                        <div key={eventName}>
                            <strong>{eventName}:</strong> {lngLat ? lngLat.map(round5).join(', ') : <em>null</em>}
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

