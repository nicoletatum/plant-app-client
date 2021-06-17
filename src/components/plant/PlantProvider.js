import React, { useState } from "react"

export const PlantContext = React.createContext()

export const PlantProvider = (props) => {
    const [ plants, setPlants ] = useState([])

    const getPlants = () => {
        return fetch("http://localhost:8000/plants", {
            headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setPlants)
    }   

    const getPlantById = (plantId) => {
        return fetch(`http://localhost:8000/plants/${plantId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
    }

    const createPlant = (plant) => {
        return fetch("http://localhost:8000/plants",{
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(plant)
        })
        .then(getPlants)
    }

    return (
        <PlantContext.Provider value={{ plants, getPlants, getPlantById, createPlant}} >
            {props.children}
        </PlantContext.Provider>
    )
}