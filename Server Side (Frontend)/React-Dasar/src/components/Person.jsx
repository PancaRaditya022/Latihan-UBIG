import React from "react";

function Person(person) {
    return(
        <div>
            <h2>Hi My name is {person.person.name} and i am {person.person.age} years old, my skill is {person.person.skill}</h2>
        </div>
    )
}

export default Person;