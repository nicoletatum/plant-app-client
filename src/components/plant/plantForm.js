import React, { useContext, useEffect, useState } from "react"
import { PlantContext } from "./PlantProvider"
import { useHistory, useParams } from "react-router-dom"


export const PlantForm = () => {

    const history = useHistory()
    const { createPlant, getPlantById, getLights, editPlant, plants, plant, lights, water, getWater } = useContext(PlantContext)
    const { plantId } = useParams()

    const[currentPlant, setCurrentPlant] = useState({
        name:"",
        light_level: 0,
        water_amount: 0,
        temp_needs: "",
        potting_needs: "",
        notes: ""
    })


    useEffect(() => {
        getLights()
        .then(getWater())
    }, [])


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
        let selectedValue = event.target.value

        if (event.target.id === "water_amount" || event.target.id ==="light_level"){
            selectedValue = parseInt(selectedValue)
        }

        newPlantState[event.target.id] = selectedValue

        setCurrentPlant(newPlantState)
    }


    const handleClickSavePlant = (event) => {
        event.preventDefault()

        if (plantId) {
            editPlant(currentPlant)
                .then(() => history.push(`/plant/${currentPlant.id}`))
        } else {
            createPlant(currentPlant)
                .then(() => history.push('/plants'))
        }
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
            <div>
                <select className="select" id="light_level" required autoFocus value={currentPlant.light_level} onChange={handleInput}>
                    <option value="0">Select Light Needs... </option>
                        {
                            lights.map(level => {
                                return <option key={level.id} value={level.id}>{level.level}</option>
                            })
                        }
                </select>
            </div>
        </div>
        <div className="field">
            <label className="label">Water Requirements: </label>
            <div>
                <select className="select" id="water_amount" required autoFocus value={currentPlant.water_amount} onChange={handleInput}>
                    <option value="0">Select Water Requirements... </option>
                        {
                            water.map(amount => {
                                return <option key={amount.id} value={amount.id}>{amount.amount}</option>
                            })
                        }
                </select>
            </div>
        </div>
        <div className="field">
            <label className="label">Temp:</label>
            <div className="control">
                <input className="input form-control" type="text" id="temp_needs" required autoFocus value={currentPlant.temp_needs} onChange={handleInput}></input>
            </div>
        </div>
        <div className="field">
            <label className="label">Potting:</label>
            <div className="control">
                <input className="input form-control" type="text" type="text" id="potting_needs" required autoFocus value={currentPlant.potting_needs} onChange={handleInput}></input>
            </div>
        </div>
        <div className="field">
            <label className="label">Notes:</label>
            <div className="control">
                <input className="input form-control" type="text" type="text" id="notes" required autoFocus value={currentPlant.notes} onChange={handleInput}></input>
            </div>
        </div>
        <div className="control">
            <button className="button is-primary" onClick={handleClickSavePlant}>{plantId? "Save Plant" : "Create Plant"}</button>
        </div>
        </>
    )
}