import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import axios from "axios";
import AboutThisApp from "./aboutThisApp";

function Person() {

    const [addPerson, setAddPerson] = useState({
        firstName: "",
        lastName: "",
        age: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipCode: ""
    });
    const [updatePerson, setUpdatePerson] = useState({
        id: "",
        firstName: "",
        lastName: "",
        age: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipCode: ""
    });
    const [people, setPeople] = useState([]);
    const [change, setChange] = useState(false);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_SERVER_URL}/persons`, {})

            .then((res) => {
                setPeople(res.data);
            })
            .catch((e) => {
                console.log(e);
            })
    }, [change]);

    function handleAddInputChange(e) {
        const { name, value } = e.target;
        setAddPerson(prevAddPerson => ({
            ...prevAddPerson, [name]: value
        }));
    }

    function handleUpdateInputChange(e) {
        const { name, value } = e.target;
        setUpdatePerson(prevAddPerson => ({
            ...prevAddPerson, [name]: value
        }));
    }

    async function createPerson(e) {
        e.preventDefault();
        try {
            const response1 = await axios.post(`${import.meta.env.VITE_BASE_SERVER_URL}/validate`, {
                address1: addPerson.address1,
                address2: addPerson.address2,
                city: addPerson.city,
                state: addPerson.state,
                zipCode: addPerson.zipCode
            });
            console.log(response1);

            if ((response1.data.result.verdict.addressComplete && response1.data.result.verdict.addressComplete == true) || response1.data.result.verdict.validationGranularity != "OTHER") {

                if (confirm("Would you like to use this address?\n " + response1.data.result.address.formattedAddress)) {

                    const response2 = await axios.post(`${import.meta.env.VITE_BASE_SERVER_URL}/person`, {
                        firstName: addPerson.firstName,
                        lastName: addPerson.lastName,
                        age: addPerson.age,
                        address1: response1.data.result.address.postalAddress.addressLines[0],
                        address2: "",
                        city: response1.data.result.address.postalAddress.locality,
                        state: response1.data.result.address.postalAddress.administrativeArea,
                        zipCode: response1.data.result.address.postalAddress.postalCode
                    });

                    console.log(response2);

                    setAddPerson({
                        firstName: "",
                        lastName: "",
                        age: "",
                        address1: "",
                        address2: "",
                        city: "",
                        state: "",
                        zipCode: ""
                    });
                    setChange(!change);
                    alert("Successfully created person!");
                }
            }
            else {
                alert("The address is not valid.  Please update and save again.");
                return;
            }
        }
        catch (e) {
            if (e.status == 422) {
                const messages = e.response.data.details.map((error, index) => {
                    return error + "\n";
                })
                alert(messages);
            }
            else {
                alert("Something went wrong creating a user.  Please try again later.");
            }
            console.log(e);
        }
    }

    function deletePerson(e, id) {
        e.preventDefault();
        axios.delete(`${import.meta.env.VITE_BASE_SERVER_URL}/person/` + id, {})

            .then((res) => {
                console.log(res);
                setChange(!change);
                alert("Deleted Person!");
            })
            .catch((e) => {
                alert("Something went wrong deleting a user.  Please try again later.");
                console.log(e);
            })
    }

    function findPerson(e, id) {
        e.preventDefault();
        axios.get(`${import.meta.env.VITE_BASE_SERVER_URL}/person/` + id, {})

            .then((res) => {
                setUpdatePerson({
                    id: res.data.id,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    age: res.data.age,
                    address1: res.data.address1,
                    address2: res.data.address2,
                    city: res.data.city,
                    state: res.data.state,
                    zipCode: res.data.zipCode
                });
            })
            .catch((e) => {
                if (e.response && e.response.status == 404) {
                    alert("User wasn't able to be found.");
                }
                else {
                    alert("Something went wrong finding a user.  Please try again later.");
                }
                console.log(e);
            })
    }

    async function updateSomeone(e) {
        e.preventDefault();

        try {
            const response1 = await axios.post(`${import.meta.env.VITE_BASE_SERVER_URL}/validate`, {
                address1: updatePerson.address1,
                address2: updatePerson.address2,
                city: updatePerson.city,
                state: updatePerson.state,
                zipCode: updatePerson.zipCode
            });
            console.log(response1);

            if ((response1.data.result.verdict.addressComplete && response1.data.result.verdict.addressComplete == true) || response1.data.result.verdict.validationGranularity != "OTHER") {

                if (confirm("Would you like to use this address?\n " + response1.data.result.address.formattedAddress)) {
                    const response2 = await axios.put(`${import.meta.env.VITE_BASE_SERVER_URL}/person`, {
                        id: updatePerson.id,
                        firstName: updatePerson.firstName,
                        lastName: updatePerson.lastName,
                        age: updatePerson.age,
                        address1: response1.data.result.address.postalAddress.addressLines[0],
                        address2: "",
                        city: response1.data.result.address.postalAddress.locality,
                        state: response1.data.result.address.postalAddress.administrativeArea,
                        zipCode: response1.data.result.address.postalAddress.postalCode
                    });

                    console.log(response2);

                    setUpdatePerson({
                        id: "",
                        firstName: "",
                        lastName: "",
                        age: "",
                        address1: "",
                        address2: "",
                        city: "",
                        state: "",
                        zipCode: ""
                    });
                    setChange(!change);
                    alert("Successfully updated person!");

                }
            }
            else {
                alert("The address is not valid.  Please update and save again.");
                return;
            }
        }
        catch (e) {
            if (e.status == 404) {
                alert("User wasn't able to be found.");
            }
            else if (e.status == 422) {
                const messages = e.response.data.details.map((error, index) => {
                    return error + "\n";
                })
                alert(messages);
            }
            else {
                alert("Something went wrong updating a user.  Please try again later.");
            }
            console.log(e);
        }
    }

    return (
        <div>
            <div style={{ paddingTop: 25, paddingLeft: 30, width: 1000 }}>
                <AboutThisApp />
            </div>
            <div style={{ width: 1000 }} className="d-flex justify-content-center mx-auto">
                <div className="login template d-flex justify-content-center align-items-center 100-w 100-vh bg primary" >
                    <div style={{ paddingTop: 25, paddingRight: 200 }}>
                        <h1 class="text-center">Create Person</h1>
                        <form action="POST">

                            <div data-mdb-input-init class="form-outline mb-4">
                                <input type="text" id="form2Example1" name="firstName" value={addPerson.firstName} onChange={(e) => { handleAddInputChange(e) }} class="form-control" />
                                <label class="form-label" for="form2Example1">First Name<span style={{ color: "red" }}> *</span></label>
                            </div>

                            <div data-mdb-input-init class="form-outline mb-4">
                                <input type="text" id="form2Example2" name="lastName" value={addPerson.lastName} onChange={(e) => { handleAddInputChange(e) }} class="form-control" />
                                <label class="form-label" for="form2Example2">Last Name<span style={{ color: "red" }}> *</span></label>
                            </div>

                            <div data-mdb-input-init class="form-outline mb-4">
                                <input type="number" id="form2Example2" name="age" value={addPerson.age} onChange={(e) => { handleAddInputChange(e) }} class="form-control" />
                                <label class="form-label" for="form2Example2">Age<span style={{ color: "red" }}> *</span></label>
                            </div>
                            <div data-mdb-input-init class="form-outline mb-4">
                                <input type="text" id="form2Example1" name="address1" value={addPerson.address1} onChange={(e) => { handleAddInputChange(e) }} class="form-control" />
                                <label class="form-label" for="form2Example1">Address1<span style={{ color: "red" }}> *</span></label>
                            </div>

                            <div data-mdb-input-init class="form-outline mb-4">
                                <input type="text" id="form2Example2" name="address2" value={addPerson.address2} onChange={(e) => { handleAddInputChange(e) }} class="form-control" />
                                <label class="form-label" for="form2Example2">Address2</label>
                            </div>

                            <div data-mdb-input-init class="form-outline mb-4">
                                <input type="text" id="form2Example2" name="city" value={addPerson.city} onChange={(e) => { handleAddInputChange(e) }} class="form-control" />
                                <label class="form-label" for="form2Example2">City<span style={{ color: "red" }}> *</span></label>
                            </div>
                            <div data-mdb-input-init class="form-outline mb-4">
                                <input type="text" id="form2Example1" name="state" value={addPerson.state} onChange={(e) => { handleAddInputChange(e) }} class="form-control" />
                                <label class="form-label" for="form2Example1">State<span style={{ color: "red" }}> *</span></label>
                            </div>

                            <div data-mdb-input-init class="form-outline mb-4">
                                <input type="text" id="form2Example2" name="zipCode" value={addPerson.zipCode} onChange={(e) => { handleAddInputChange(e) }} class="form-control" />
                                <label class="form-label" for="form2Example2">Zip Code<span style={{ color: "red" }}> *</span></label>
                            </div>
                            <div class=" d-flex justify-content-center align-items-center">
                                <   button type="submit" onClick={(e) => createPerson(e)} data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="login template d-flex justify-content-center align-items-center 100-w 100-vh bg primary" >
                    <div style={{ paddingTop: 25 }}>
                        <h1 class="text-center">Update Person</h1>
                        <form action="PUT">

                            <div data-mdb-input-init class="form-outline mb-4">
                                <input type="text" id="form2Example1" name="firstName" value={updatePerson.firstName} onChange={(e) => { handleUpdateInputChange(e) }} class="form-control" />
                                <label class="form-label" for="form2Example1">First Name<span style={{ color: "red" }}> *</span></label>
                            </div>

                            <div data-mdb-input-init class="form-outline mb-4">
                                <input type="text" id="form2Example2" name="lastName" value={updatePerson.lastName} onChange={(e) => { handleUpdateInputChange(e) }} class="form-control" />
                                <label class="form-label" for="form2Example2">Last Name<span style={{ color: "red" }}> *</span></label>
                            </div>
                            <div data-mdb-input-init class="form-outline mb-4">
                                <input type="number" id="form2Example2" name="age" value={updatePerson.age} onChange={(e) => { handleUpdateInputChange(e) }} class="form-control" />
                                <label class="form-label" for="form2Example2">Age<span style={{ color: "red" }}> *</span></label>
                            </div>
                            <div data-mdb-input-init class="form-outline mb-4">
                                <input type="text" id="form2Example1" name="address1" value={updatePerson.address1} onChange={(e) => { handleUpdateInputChange(e) }} class="form-control" />
                                <label class="form-label" for="form2Example1">Address1<span style={{ color: "red" }}> *</span></label>
                            </div>

                            <div data-mdb-input-init class="form-outline mb-4">
                                <input type="text" id="form2Example2" name="address2" value={updatePerson.address2} onChange={(e) => { handleUpdateInputChange(e) }} class="form-control" />
                                <label class="form-label" for="form2Example2">Address2</label>
                            </div>

                            <div data-mdb-input-init class="form-outline mb-4">
                                <input type="" id="form2Example2" name="city" value={updatePerson.city} onChange={(e) => { handleUpdateInputChange(e) }} class="form-control" />
                                <label class="form-label" for="form2Example2">City<span style={{ color: "red" }}> *</span></label>
                            </div>
                            <div data-mdb-input-init class="form-outline mb-4">
                                <input type="text" id="form2Example1" name="state" value={updatePerson.state} onChange={(e) => { handleUpdateInputChange(e) }} class="form-control" />
                                <label class="form-label" for="form2Example1">State<span style={{ color: "red" }}> *</span></label>
                            </div>

                            <div data-mdb-input-init class="form-outline mb-4">
                                <input type="text" id="form2Example2" name="zipCode" value={updatePerson.zipCode} onChange={(e) => { handleUpdateInputChange(e) }} class="form-control" />
                                <label class="form-label" for="form2Example2">Zip Code<span style={{ color: "red" }}> *</span></label>
                            </div>
                            <div class=" d-flex justify-content-center align-items-center">
                                <   button type="submit" onClick={(e) => updateSomeone(e)} data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-center">
                <div style={{ paddingTop: 50 }}>
                    <h2>People</h2>
                    <table style={{ width: 1500 }} class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Age</th>
                                <th scope="col">Address</th>
                                <th scope="col">City</th>
                                <th scope="col">State</th>
                                <th scope="col">Zip Code</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                people.map((person, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{person.firstName}</td>
                                        <td>{person.lastName}</td>
                                        <td>{person.age}</td>
                                        <td>{person.address1}</td>
                                        <td>{person.city}</td>
                                        <td>{person.state}</td>
                                        <td>{person.zipCode}</td>
                                        <td><button class="btn btn-primary" onClick={(e) => findPerson(e, person.id)}>Edit</button></td>
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