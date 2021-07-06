import React, { useState } from "react"

export const PlantContext = React.createContext()

export const PlantProvider = (props) => {
    const [ plants, setPlants ] = useState([])
    const [ lights, setLights ] = useState([])
    const [ water, setWater] = useState([])
    const [ plant, setPlant ] = useState([])

    const getPlants = () => {
        return fetch("https://my-plant-care.herokuapp.com/plants", {
            headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setPlants)
    }   

    const getPlantById = (plantId) => {
        return fetch(`https://my-plant-care.herokuapp.com/plants/${plantId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
    }

    const getLights = () => {
        return fetch("https://my-plant-care.herokuapp.com/light", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
        .then(response => response.json()
        .then(setLights))
    }
    const getWater = () => {
        return fetch("https://my-plant-care.herokuapp.com/water", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
        .then(response => response.json()
        .then(setWater))
    }
    const editPlant = (plant) => {
        return fetch(`https://my-plant-care.herokuapp.com/plants/${plant.id}`, {
            method:"PUT",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(plant)
        })
        .then(() => getPlantById(plant.id))
    }
    

    const createPlant = (plant) => {
        return fetch("https://my-plant-care.herokuapp.com/plants",{
            method:"POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(plant)
        })
        .then(getPlants)
    }

    const deletePlant = (plantId) => {
        return fetch(`https://my-plant-care.herokuapp.com/plants/${plantId}`,{
            method:"DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
        .then(getPlants)
    }

    return (
        <PlantContext.Provider value={{ plants, plant, getPlants, deletePlant, setPlant, water, lights, editPlant, setLights, setWater, getWater, getLights, getPlantById, createPlant}} >
            {props.children}
        </PlantContext.Provider>
    )
}