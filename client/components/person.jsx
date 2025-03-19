import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import axios from "axios"

function Person() {

    const [addFirstName, setAddFirstName] = useState();
    const [addLastName, setAddLastName] = useState();
    const [addAge, setAddAge] = useState();
    const [updateFirstName, setUpdateFirstName] = useState();
    const [updateLastName, setUpdateLastName] = useState();
    const [updateAge, setUpdateAge] = useState();
    const [updateId, setUpdateId] = useState();
    const [people, setPeople] = useState([]);
    const [change, setChange] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8080/persons", {})

            .then((res) => {
                setPeople(res.data);
            })
            .catch((e) => {
                console.log(e);
            })
    }, [change]);

    function createPerson(e) {
        e.preventDefault();

        axios.post("http://localhost:8080/person", {
            firstName:addFirstName, lastName:addLastName, age:addAge
        })
        .then((res) => {
            console.log(res);
            setChange(!change); 
            setAddAge();
            setAddFirstName();
            setAddLastName();
            alert("created person!");
        })
        .catch((e) => {
            console.log(e);
            alert("issue creating person");
        })
    }

    function deletePerson(e, id) {
        e.preventDefault();
        axios.delete("http://localhost:8080/person/" + id, {}) 

        .then((res) => {
            console.log(res);
            setChange(!change);
            alert("Deleted Person!");
        })
        .catch((e) => {
            console.log(e);
            alert("issue deleting person");
        })
    }

    function findPerson(e, id) {
        e.preventDefault();
        console.log("person finding")
        axios.get("http://localhost:8080/person/" + id, {})

        .then((res) => {
            console.log("person finding")
            setUpdateId(res.data.id);
            setUpdateAge(res.data.age);
            setUpdateFirstName(res.data.firstName);
            setUpdateLastName(res.data.lastName);
        })
        .catch((e) => {
            console.log(e);
            alert("issue finding person");
        })
    }

    function updatePerson(e) {
        e.preventDefault();
        axios.put("http://localhost:8080/person", {
           id:updateId, firstName:updateFirstName, lastName:updateLastName, age:updateAge
        })

        .then((res) => {
            console.log(res);
            setChange(!change);
            setUpdateId();
            setUpdateAge();
            setUpdateFirstName();
            setUpdateLastName();
            alert("Updated Person!");
        })
        .catch((e) => {
            console.log(e);
            alert("issue updating person");
        })
    }

    return (
        <div>
            <div className="login template d-flex justify-content-center align-items-center 100-w 100-vh bg primary" >
                <div style={{ paddingTop: 100 }}>
                    <h1 class="text-center">Create Person</h1>
                    <form action="POST">

                        <div data-mdb-input-init class="form-outline mb-4">
                            <input type="text" id="form2Example1" onChange={(e) => { setAddFirstName(e.target.value) }} class="form-control" />
                            <label class="form-label" for="form2Example1">First Name<span style={{ color: "red" }}> *</span></label>
                        </div>

                        <div data-mdb-input-init class="form-outline mb-4">
                            <input type="text" id="form2Example2" onChange={(e) => { setAddLastName(e.target.value) }} class="form-control" />
                            <label class="form-label" for="form2Example2">Last Name<span style={{ color: "red" }}> *</span></label>
                        </div>

                        <div data-mdb-input-init class="form-outline mb-4">
                            <input type="number" id="form2Example2" onChange={(e) => { setAddAge(e.target.value) }} class="form-control" />
                            <label class="form-label" for="form2Example2">Age<span style={{ color: "red" }}> *</span></label>
                        </div>
                        <div class=" d-flex justify-content-center align-items-center">
                            <   button type="submit" onClick={(e) => createPerson(e)} data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4">Create</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="login template d-flex justify-content-center align-items-center 100-w 100-vh bg primary" >
                <div style={{ paddingTop: 100 }}>
                    <h1 class="text-center">Update Person</h1>
                    <form action="PUT">

                        <div data-mdb-input-init class="form-outline mb-4">
                            <input type="text" id="form2Example1" value={updateFirstName} onChange={(e) => { setUpdateFirstName(e.target.value) }} class="form-control" />
                            <label class="form-label" for="form2Example1">First Name<span style={{ color: "red" }}> *</span></label>
                        </div>

                        <div data-mdb-input-init class="form-outline mb-4">
                            <input type="text" id="form2Example2" value={updateLastName} onChange={(e) => { setUpdateLastName(e.target.value) }} class="form-control" />
                            <label class="form-label" for="form2Example2">Last Name<span style={{ color: "red" }}> *</span></label>
                        </div>

                        <div data-mdb-input-init class="form-outline mb-4">
                            <input type="number" id="form2Example2" value={updateAge} onChange={(e) => { setUpdateAge(e.target.value) }} class="form-control" />
                            <label class="form-label" for="form2Example2">Age<span style={{ color: "red" }}> *</span></label>
                        </div>
                        <div class=" d-flex justify-content-center align-items-center">
                            <   button type="submit" onClick={(e) => updatePerson(e)} data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4">Update</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="d-flex justify-content-center">
                <div style={{ paddingTop: 50 }}>
                    <h2>Previous Orders</h2>
                    <table style={{ width: 1500 }} class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Age</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                people.map((person, index) => (
                                    <tr>
                                        <td>{index}</td>
                                        <td>{person.firstName}</td>
                                        <td>{person.lastName}</td>
                                        <td>{person.age}</td>
                                        <td><button class="btn btn-primary" onClick={(e) => findPerson(e, person.id)}>Update</button></td>
                                        <td><button class="btn btn-danger" onClick={(e) => deletePerson(e, person.id)}>Delete</button></td>
                                    </tr>
                                ))
                            }



                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Person;