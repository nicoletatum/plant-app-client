import React, { useContext, useEffect } from "react"
import { PlantContext } from "./PlantProvider"
import { PlantCard } from "./Plant"
import "./Plant.css"

export const PlantList = () => {
    const { plants, getPlants} = useContext(PlantContext)

useEffect(() => {
    getPlants()
}, [])

    return(
        <>
        <div className="tile is-ancestor">
            <div className="tile is-parent">
                {
                    plants.map(plant => {
                        return <PlantCard key={plant.id}
                            plant={plant} />
                    })
                }
            </div>
        </div>
        </>
    )
}