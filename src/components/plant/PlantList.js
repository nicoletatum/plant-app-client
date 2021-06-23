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
            <div className="columns is-multiline body">
                {plants.map(plant => {
                    return (
                        <>
                            <div className="column is-one-quarter is-flex">
                                <div className="tile is-child box">
                                    <div className="title">{plant.name}</div>
                                    {
                                        plant.pest_watch ? <span className=" tag is-warning is-light">I'm on a pest watch :(</span> : ''
                                    }
                                    <div className="image is-4by4"><img src={plant.plant_pic}/></div>
                                    <div className="">Light: {plant.light_level?.level}</div>
                                    <div className="">Water: {plant.water_amount?.amount}</div>
                                    <div className="">Temp: {plant.temp_needs}</div>
                                    <div className="">Potting: {plant.potting_needs}</div>
                                    <div className="">Notes: {plant.notes}</div>
                                    <button className="button" onClick={() => {
                                        history.push(`/plant/${plant.id}`)
                                    }}>Details</button>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
        </>
    )
}