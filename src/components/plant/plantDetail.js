import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { PlantContext } from "./PlantProvider"
import "./Plant.css"

export const PlantCard = () => {

    const { getPlantById } = useContext(PlantContext)

    const [ plant, setPlant ] = useState({})

    // const history = useHistory()

    //get id from url 
    const { plantId } = useParams()

    useEffect(() => {
        getPlantById(plantId)
        .then((res) => {
            setPlant(res)
        })
    }, [])

    return (
        <>
        <div className="tile is-child">
            <div className="title">{plant.name}</div>
            <div className="">Light: {plant.light_level?.level}</div>
            <div className="">Water: {plant.water_amount?.amount}</div>
            <div className="">Temp: {plant.temp_needs}</div>
            <div className="">Potting: {plant.potting_needs}</div>
            <div className="">Notes: {plant.notes}</div>
            <button>Details</button>
        </div>
        </>
    )
}