import React from "react";
import { Col } from "react-bootstrap";

export default function AuthInfo() {
  return (
    <Col md={6} className="authInfo">
      <h2>Authentication Process</h2>
      <div className="text-left p-4">
        <ol>
          <li>
            <strong>Create a Firebase Application</strong>
          </li>
          <li>
            <strong>Create a GitHub Auth App</strong>
            <ul>
              <li>Navigate to your profile/settings/Developer Settings</li>
              <li>Create a new OAuth App</li>
              <li>
                Place the callback URL from Firebase in the Authorization
                callback URL
              </li>
            </ul>
          </li>
          <li>
            <strong>.env</strong>
            <ul>
              <li>
                This file houses the configuration settings for our Firebase
                application. Think of this file as similar to the
                connections.config in a .NET application.
              </li>
            </ul>
          </li>
          <li>
            <strong>base.js</strong>
            <ul>
              <li>
                The code here is similar to the web.config connection strings in
                ASP.NET MVC apps.
              </li>
            </ul>
          </li>
          <li>
            <strong>contexts &gt; AuthContext</strong>
            <ul>
              <li>
                The AuthContext holds all things authentication and allows us to
                easily pass auth information to every component in the app.
              </li>
              <li>
                Tools like Redux are alternatives to store state data separate
                from components, allowing for easier data management in your
                React app.
              </li>
            </ul>
          </li>
          <li>
            <strong>App.js</strong>
            <ul>
              <li>
                In the App.js, we render all other components inside the
                AuthProvider component.
              </li>
              <li>
                Every component in the AuthProvider will have access to the
                useAuth functionality (including currentUser, authenticate,
                logout) from the AuthContext file.
              </li>
            </ul>
          </li>
          <li>
            <strong>Login and Logout Components</strong>
            <ul>
              <li>Just the UI that will manage logging in/out</li>
            </ul>
          </li>
        </ol>
      </div>
    </Col>
  );
}