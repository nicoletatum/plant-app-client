import React, { useContext, useEffect, useState } from "react"
import { PlantContext } from "./PlantProvider"
import { useHistory, useParams } from "react-router-dom"


export const PlantForm = () => {

    const history = useHistory()
    const { createPlant, getPlantById, plants } = useContext(PlantContext)
    const currentUser = localStorage.getItem("rare_user_id")
    const { plantId } = useParams()

    const[currentPlant, setCurrentPlant] = useState({
        plant_owner: parseInt(currentUser),
        name:"",
        light_level: 0,
        water_amount: 0,
        temp_needs: "",
        potting_needs: "",
        notes: ""

    })

    useEffect(() => {
        if (plantId) {
            getPlantById(plantId).then(plant => {
                setCurrentPlant({
                    name: plant.name,
                    light_level: plant.light_level,
                    water_amount: plant.water_amount,
                    temp_needs: plant.temp_needs,
                    potting_needs: plant.potting_needs,
                    notes: plant.notes
                })
            })
        }
    }, [plantId])

    const handleInput = (event) => {
        const newPlantState = { ...currentPlant }
        let selectedValue = event.target.selectedValue
        newPlantState[event.target.id] = selectedValue
        setCurrentPlant(newPlantState)
    }

    return(
        <>  
        <div className="field">
            <label className="label">Name: </label>
            <div className="control">
                <input className="input form-control" type="text" id="name" required autoFocus value={currentPlant.name} onChange={handleInput}></input>
            </div>
        </div>
        <div className="field">
            <label className="label">Light Requirements: </label>
            <div className="select" id="light" required autoFocus value={currentPlant.light_level.id} onChange={handleInput}>
                <select>
                    <option value="0">Select Light Needs... </option>
                   
                            <option key={plants.light.id} value={light.id}>
                                {light.light_level}
                            </option>
                </select>
            </div>
        </div>
        <div className="field">
            <label className="label">Water Requirements: </label>
            <div className="select">
                <select>
                    <option value="0">Select Water Requirements... </option>
                </select>
            </div>
        </div>
        <div className="field">
            <label className="label">Temp:</label>
            <div className="control">
                <input className="input" type="text"></input>
            </div>
        </div>
        <div className="field">
            <label className="label">Potting:</label>
            <div className="control">
                <input className="input" type="text"></input>
            </div>
        </div>
        <div className="field">
            <label className="label">Notes:</label>
            <div className="control">
                <input className="input" type="text"></input>
            </div>
        </div>
        <div className="control">
            <button className="button is-primary">Add To Plant Family</button>
        </div>
        </>
    )
}