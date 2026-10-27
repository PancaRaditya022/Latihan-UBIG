import React from "react";
import Person from "./Person";

function NameList() {
    const people = [
        {id: 1, name: "April", age: 20, skill: "Html"},
        {id: 2, name: "Pra", age: 20, skill: "CSS"},
        {id: 3, name: "Bogo", age: 20, skill: "JS"}
    ];

    const personList = people.map(person => (
        <Person key={person.id} person={person} />
    ))
    return(
        <div>
            {personList}
        </div>
    )
}

export default NameList;
