import React from "react"
import { Route } from "react-router-dom"
import { PlantList } from "./plant/PlantList"
import { PlantProvider } from "./plant/PlantProvider"
import { PlantForm } from "./plant/plantForm"
import { PlantCard } from "./plant/Plant"
import { Home } from "./home/home"
export const ApplicationViews = () => {
    return (
        <>
        <Route exact path="/plants">
                <Home/>
        </Route>
        <PlantProvider>
            <Route exact path="/plants">
                <PlantList/>
            </Route>
            <Route exact path="/plant-form">
                <PlantForm/>
            </Route>
            <Route exact path="/plant/:plantId(\d+)">
                <PlantCard/>
            </Route>
            <Route exact path="/plant/:plantId(\d+)/edit">
                <PlantForm/>
            </Route>
        </PlantProvider>
        </>
    )
}