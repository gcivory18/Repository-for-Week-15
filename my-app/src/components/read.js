import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";


export default function Read() {
  const [APIData, setAPIData] = useState([]);
//   using axios.get to send the GET request to the API.
// if the request is fulfilled, then setting the response data in our APIData state.
  useEffect(() => {
    axios
      .get(`https://63dd93672308e3e319fd50e3.mockapi.io/myData`)
      .then((response) => {
        console.log(response.data);
        setAPIData(response.data);
      });
  }, []);

// Destructuring data into id, firstName, lastName, and checkbox, and 
// then setting this data into local storage
  const setData = (data) => {
    let { id, firstName, lastName, checkbox } = data;
    localStorage.setItem("ID", id);
    localStorage.setItem("First Name", firstName);
    localStorage.setItem("Last Name", lastName);
    localStorage.setItem("Checkbox Value", checkbox)
  }

  const getData = () => {
    axios
      .get(`https://63dd93672308e3e319fd50e3.mockapi.io/myData`)
      .then((getData) => {
        setAPIData(getData.data);
      })
  }

//   This function will receive an ID parameter on the Delete button click
  const onDelete = (id) => {
    axios
      .delete(`https://63dd93672308e3e319fd50e3.mockapi.io/myData/${id}`)
      .then(() => {
        getData();
      })
  }

//   Semantic UI table for displaying the information
  return (
    <div>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Checked</Table.HeaderCell>
            <Table.HeaderCell>Update</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {APIData.map((data) => {
            return (
              <Table.Row>
                <Table.Cell>{data.firstName}</Table.Cell>
                <Table.Cell>{data.lastName}</Table.Cell>
                <Table.Cell>
                  {data.checkbox ? "Checked" : "Unchecked"}
                </Table.Cell>
                <Link to="/update">
                  <Table.Cell>
                    <Button onClick={() => setData(data)}>Update</Button>
                  </Table.Cell>
                </Link>
                <Table.Cell>
                  <Button onClick={() => onDelete(data.id)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </div>
  )
}
