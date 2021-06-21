import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { PlantContext } from "./PlantProvider"
import "./Plant.css"

export const PlantCard = () => {

    const { getPlantById, deletePlant } = useContext(PlantContext)
    const [ plant, setPlant ] = useState({})
    const history = useHistory()
    const { plantId } = useParams()
    
    useEffect(() => {
        getPlantById(plantId)
        .then((res) => {
            setPlant(res)
        })
    }, [])

    const handleDelete = () => {
        console.log("delete", plant)
        deletePlant(plant.id)
            .then(() => {
                history.push("/plants")
            })
    }




    return (
        <>
        <div className="tile is-child">
            <div className="title">{plant.name}</div>
            <div className="">Light: {plant.light_level?.level}</div>
            <div className="">Water: {plant.water_amount?.amount}</div>
            <div className="">Temp: {plant.temp_needs}</div>
            <div className="">Potting: {plant.potting_needs}</div>
            <div className="">Notes: {plant.notes}</div>
            <img src={plant.plant_pic} />
            <button className="button" onClick={() => {
                history.push(`/plant/${plant.id}/edit`)
            }}>Edit</button>
            <button className="button" onClick={handleDelete}>Delete</button>
        </div>
        </>
    )
}