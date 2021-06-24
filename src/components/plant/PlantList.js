import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router"
import { PlantContext } from "./PlantProvider"
import moment from "moment"
import "./Plant.css"

export const PlantList = () => {
    const { plants, getPlants, editPlant, getPlantById } = useContext(PlantContext)
    const history = useHistory()
    const timestamp = new Date().toLocaleString()
    const today = moment(timestamp).format('YYYY-MM-DD')

    const waterDate = moment(timestamp).subtract(7, 'days').calendar();

    useEffect(() => {
        getPlants()
    }, [])

    const WaterPlant = (event) => {
        const [prefix, id] = event.target.id.split("--")
        getPlantById(parseInt(id))
            .then(res => {
                const plantState = res
                plantState["last_water"] = moment(timestamp).format('YYYY-MM-DD')
                plantState["light_level"] = plantState["light_level"].id
                plantState["water_amount"] = plantState["water_amount"].id
                editPlant(plantState)
            })
    }

    return (
        <>
            <div className="columns is-multiline body">
                {plants.map(plant => {
                    {
                        if (moment(plant.last_water).isBefore(waterDate)){    
                    return (
                            <>
                                <h1 className="">These plants need water!</h1>
                                <div className="column is-one-fifth is-flex">
                                    <div className="tile is-child box">
                                        <div className="title">{plant.name}</div>
                                        <div className=""><b>Last Watered:</b> {plant.last_water}</div>
                                        <div className="image is-4by4"><img src={plant.plant_pic} /></div>
                                        <div className=""><b>Water</b> {plant.water_amount?.amount}</div>
                                        <button className="button" id={`plant--${plant.id}`} onClick={WaterPlant}> watered </button>
                                    </div>
                                </div>
                            </>
                        )}
                    else {return(<></>)}}
                })}

                {plants.map(plant => {
                    return (
                        <>
                            <div className="column is-one-quarter is-flex">
                                <div className="tile is-child box">
                                    <div className="title">{plant.name}</div>
                                    {
                                        plant.pest_watch ? <span className=" tag is-warning is-light">I'm on a pest watch :(</span> : ''
                                    }
                                    <div className=""><b>Last Watered:</b> {plant.last_water}</div>
                                    <div className="image is-4by4"><img src={plant.plant_pic} /></div>
                                    <div className=""><b>Light</b> {plant.light_level?.level}</div>
                                    <div className=""><b>Water</b> {plant.water_amount?.amount}</div>
                                    <div className=""><b>Temp</b> {plant.temp_needs}</div>
                                    <div className=""><b>Potting</b> {plant.potting_needs}</div>
                                    <button className="button" id={`plant--${plant.id}`} onClick={WaterPlant}> watered </button>
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