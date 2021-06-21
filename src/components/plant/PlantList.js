import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router"
import { PlantContext } from "./PlantProvider"
import "./Plant.css"

export const PlantList = () => {
    const { plants, getPlants } = useContext(PlantContext)

    const history = useHistory()
    
    useEffect(() => {
        getPlants()
    }, [])

    return (
        <>
            <div className="tile is-ancestor">
                <div className="tile is-parent">
                    { plants.map(plant => {
                        return (
                            <>
                            <div className="tile is-child">
                                <div className="title">{plant.name}</div>
                                <div className="">Light: {plant.light_level?.level}</div>
                                <div className="">Water: {plant.water_amount?.amount}</div>
                                <div className="">Temp: {plant.temp_needs}</div>
                                <div className="">Potting: {plant.potting_needs}</div>
                                <div className="">Notes: {plant.notes}</div>
                                <button className="button" onClick={() => {
                                    history.push(`/plant/${plant.id}`)
                                }}>Details</button>
                            </div>
                            </>
                        )
                    }) }
                </div>
            </div>
        </>
    )
}