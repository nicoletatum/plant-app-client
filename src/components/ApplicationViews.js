import React from "react"
import { Route } from "react-router-dom"
import { PlantList } from "./plant/PlantList"
import { PlantProvider } from "./plant/PlantProvider"
import { PlantForm } from "./plant/plantForm"
export const ApplicationViews = () => {
    return (
        <>
        <PlantProvider>
            <Route exact path="/plants">
                <PlantList/>
            </Route>
            <Route exact path="/add-plant">
                <PlantForm/>
            </Route>
        </PlantProvider>
        </>
    )
}