import React from 'react'
import {Col} from 'react-bootstrap'

export default function RouterInfo() {
    return (             
        <Col md={6} className="routerInfo">
            <h2>React Router</h2>
            <div className="text-left p-4">
                <p>To implement router functionality in ReactJS:</p>
                <ol>
                    <li><strong>npm install react-router-dom</strong></li>
                    <li><strong>Import the following components from the react-router-dom package:</strong>
                        <ul>
                            <li>BrowserRouter (Optional: use an alias of Router)</li>
                            <li>Routes</li>
                            <li>Route</li>
                            <li>Link (see Navigation.js)</li>
                        </ul>
                    </li>
                    <li><strong>Create the structure as seen in App.js code</strong></li>
                    <li><strong>For every 'page' in your router, import the component and make a new instance of the Route component, declaring the path and the component to display</strong></li>
                    <li><strong>Create the ProtectedRoute component to lock down specific routes in your app</strong></li>
                </ol>
            </div>
        </Col>
    )
}