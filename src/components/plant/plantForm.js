import React, { useContext, useEffect, useState } from "react"
import { PlantContext } from "./PlantProvider"
import { useHistory, useParams } from "react-router-dom"
import "./Plant.css"

export const PlantForm = () => {

    const history = useHistory()
    const { createPlant, getPlantById, getLights, editPlant, plants, plant, setPlant, lights, water, getWater } = useContext(PlantContext)
    const { plantId } = useParams()
    const [image, setImage] = useState([])

    useEffect(() => {
        getLights()
            .then(getWater())
    }, [])


    useEffect(() => {
        if (plantId) {
            getPlantById(plantId)
                .then(setCurrentPlant(plant))
        }
    }, [plantId])

    const [currentPlant, setCurrentPlant] = useState({
        name: "",
        light_level: 0,
        water_amount: 0,
        temp_needs: "",
        potting_needs: "",
        notes: "",
        plant_pic: ""
    })

    const handleInput = (event) => {
        const newPlantState = { ...currentPlant }
        let selectedValue = event.target.value
        if (event.target.id === "water_amount" || event.target.id === "light_level") {
            selectedValue = parseInt(selectedValue)
        }
        newPlantState[event.target.id] = selectedValue
        setCurrentPlant(newPlantState)
    }

    const handleClickSavePlant = (event) => {
        event.preventDefault()
        if (plantId) {
            const editedPlant = { ...currentPlant }
            editedPlant["light_level"] = editedPlant["light_level"].id ? editedPlant["light_level"].id : editedPlant["light_level"]
            editedPlant["water_amount"] = editedPlant["water_amount"].id ? editedPlant["water_amount"].id : editedPlant["water_amount"]
            editPlant(editedPlant)
                .then(() => history.push(`/plant/${editedPlant.id}`))
        } else {
            createPlant(currentPlant)
                .then(() => history.push('/plants'))
        }
    }

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    //handle controlled input change and convert the image to a format that can be sent to server
    const createPicString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            // Update a component state variable to the value of base64ImageString
            const newImageState = { ...currentPlant }
            newImageState.plant_pic = base64ImageString
            setCurrentPlant(newImageState)
        });
    }


    return (
        <>
            <div className="container">
                <div className="field">
                    <label className="label">Name: </label>
                    <div className="control">
                        <input className="input form-control" type="text" id="name" required autoFocus value={currentPlant.name} onChange={handleInput}></input>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Light Requirements: </label>
                    <div>
                        <select className="select" id="light_level" required autoFocus value={currentPlant.light_level.id} onChange={handleInput}>
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
                        <select className="select" id="water_amount" required autoFocus value={currentPlant.water_amount.id} onChange={handleInput}>
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
                        <input className="input form-control" type="text" id="potting_needs" required autoFocus value={currentPlant.potting_needs} onChange={handleInput}></input>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Notes:</label>
                    <div className="control">
                        <input className="input form-control" type="text" id="notes" required autoFocus value={currentPlant.notes} onChange={handleInput}></input>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Plant:</label>
                    <div className="control">
                        <input type="file" id="plant_pic" onChange={createPicString} />
                        <input type="hidden" id="plant_pic" value={image} />
                    </div>
                </div>
                <div className="control">
                    <button className="button is-primary" onClick={handleClickSavePlant}>{plantId ? "Save Plant" : "Create Plant"}</button>
                </div>
            </div>
        </>
    )
}