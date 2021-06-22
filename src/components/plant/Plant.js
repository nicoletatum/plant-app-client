import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { PlantContext } from "./PlantProvider"
import "./Plant.css"

export const PlantCard = () => {

    const { getPlantById, deletePlant, editPlant, plant } = useContext(PlantContext)
    const history = useHistory()
    const { plantId } = useParams()
    
    useEffect(() => {
        getPlantById(plantId)
    }, [])

    // const[currentPlant, setCurrentPlant] = useState({
    //     pest_watch:false
    // })

    const handleDelete = () => {
        console.log("delete", plant)
        deletePlant(plant.id)
            .then(() => {
                history.push("/plants")
            })
    }

    const handleCheckInput = (event) => {
        const newPlantState = { ...plant }
        let selectedValue = event.target.checked
        newPlantState[event.target.id] = selectedValue
        newPlantState["light_level"] =newPlantState["light_level"].id
        newPlantState["water_amount"] =newPlantState["water_amount"].id

        editPlant(newPlantState)
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
            <img src={plant.plant_pic} className="detailsImage"/>
            <div>
            <label class="checkbox">
                <input type="checkbox" id="pest_watch" checked={plant.pest_watch} onChange={handleCheckInput}/>
                Pest Watch?</label>
            </div>
            <button className="button" onClick={() => {
                history.push(`/plant/${plant.id}/edit`)
            }}>Edit</button>
            <button className="button" onClick={handleDelete}>Delete</button>
        </div>
        </>
    )
}