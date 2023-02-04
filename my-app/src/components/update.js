import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";
import { useHistory } from "react-router";
// import Read from "./read";

export default function Update() {
  let history = useHistory();
  const [id, setID] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  useEffect(() => {
    setID(localStorage.getItem("ID"))
    setFirstName(localStorage.getItem("First Name"));
    setLastName(localStorage.getItem("Last Name"));
    setCheckbox(localStorage.getItem("Checkbox Value"));
  }, []);

// Use axios.put to send a PUT request that will update the data
  const updateAPIData = () => {
    axios.put(`https://63dd93672308e3e319fd50e3.mockapi.io/myData/${id}`, {
        firstName,
         lastName,
         checkbox
        }).then(() => {
        // history.push function to push to the Read page just after the post API gets called.
            history.push('/read')
	})
}

// Semantic React Form I imported
return (
    <div>
      <Form className="create-form">
        <Form.Field>
          <label>First Name</label>
          <input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            label="HELL YEA I want to be on The Circle!!!!!"
            checked={checkbox}
            onChange={() => setCheckbox(!checkbox)}
          />
        </Form.Field>
        <Button type='submit' onClick={updateAPIData}>Update</Button>
      </Form>
    </div>
  )
}
