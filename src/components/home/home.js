import "./home.css"
import React from "react"


var weekday = new Array(7)
weekday[0] = "Sun";
weekday[1] = "Mon";
weekday[2] = "Tues";
weekday[3] = "Wed";
weekday[4] = "Thur";
weekday[5] = "Fri";
weekday[6] = "Sat";

var today = new Date()
var day = weekday[today.getDay()]
var dd = String(today.getDate()).padStart(2,'0')
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
today = day + ' ' + mm + '/' + dd + '/' + yyyy;


export const Home = () => {
        return (
            <>
                <section className="hero is-small header">
                    <div className="hero-body">
                        <p className="title">Welcome!</p>
                        <p className="subtitle">{today}</p>
                    </div>
                </section>
            </>
        )
    }