
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { PlantApp } from "./components/PlantApp.js"
import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <PlantApp />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)