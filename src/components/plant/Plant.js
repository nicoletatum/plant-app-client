import React, { useContext, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { PlantContext, PlantProvider } from "./PlantProvider"
import "./Plant.css"

export const PlantCard = ({ plant }) => {

    const { getPlantById } = useContext(PlantContext)

    // const history = useHistory()

    //get id from url 
    const { plantId } = useParams()

    useEffect(() => {
        getPlantById(plantId)
    }, [])

    return (
        <>
        <div className="tile is-child">
            <div className="title">{plant.name}</div>
            <div className="">Light: {plant.light_level.level}</div>
            <div className="">Water: {plant.water_amount.amount}</div>
            <div className="">Temp: {plant.temp_needs}</div>
            <div className="">Potting: {plant.potting_needs}</div>
            <div className="">Notes: {plant.notes}</div>
        </div>
        </>
    )
}