import React, { useState, Fragment } from "react";

import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  // const [inputFields, setInputFields] = useState([
  let [inputFields, setInputFields] = useState([
    // {dimention: 'a'}, {dimention: 'b'}
  ]);

  let [outputField, setOutputFields] = useState([
    // {equation: "None", value: 0}
  ]);

  const shapes = [
    {id: "square", dimentions: ["a"]},
    {id: "rectangle", dimentions: ["a", "b"]},
    {id: "circle", dimentions: ["r"]},
    {id: "trapezium", dimentions: ["a", "b", "h"]}
  ]

  const handleSubmit = e => {
    e.preventDefault();
    console.log("inputFields", inputFields);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    values[index].value = event.target.value;

    setInputFields(values);
    setOutput(values);
    values.forEach( el => (
      console.log(`shape: ${el.shape}, dimention: ${el.dimention}, value: ${el.value}`)
    ))
  };

  const handleAddFields = (element) => {
    const values = [...inputFields];
    element.dimentions.forEach(dim => {
      values.push({dimention: dim, value: 0, shape: element.id})
    });
    setInputFields(values);
  };

  const handleRemoveFields = index => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);

    console.log(`Removing all values from: ${inputFields}`);
    inputFields = [];
  };

  const handleChoice = (element) => {
    handleRemoveFields(1);
    handleAddFields(element);
  };

  const setOutput = (data) => {
    let output = {};
    let allValues = true;
    data.forEach( el => (
      allValues = !isNaN(el.value) && el.value > 0
    ))

    if (allValues) {
      if (data[0].shape === "square") {
        let result = (parseInt(data[0].value))**2;
        output = {equation: "a^2", value: result}
      }
      else if (data[0].shape === "rectangle") {
        let result = parseInt(data[0].value) * parseInt(data[1].value);
        output = {equation: "a*b", value: result}
      }
      else if (data[0].shape === "circle") {
        let result = 3.1415 * (parseInt(data[0].value))**2;
        output = {equation: "PI*r^2", value: result}
      }
      else if (data[0].shape === "trapezium") {
        let result = (parseInt(data[0].value) + parseInt(data[1].value)) * (parseInt(data[2].value)/2);
        output = {equation: "(a+b)*h/2", value: result}
      }
    }

    outputField = [];
    const values = [...outputField];
    values.push(output);
    console.log(`output: ${output.value}`)
    setOutputFields(values);
  }


  return (
    <>
      <h1>Dynamic Form Fields in React</h1>
      <form onSubmit={handleSubmit}>

        {shapes.map( element => (
          <label className="mt-3 mx-2">
          <input 
            type="radio"
            name="configurator"
            id={element.id}
            onChange={() => handleChoice(element)}
          />{element.id}
          <span></span>
        </label>
        ))}

        <div className="form-row my-4 mx-4">
          {inputFields.map((inputField, index) => (
            <Fragment key={`${inputField}~${index}`}>
              <div className="form-group col-1">
                <input
                  type="text"
                  className="form-control"
                  id={inputField.dimention}
                  name={inputField.dimention}
                  placeholder={inputField.dimention}
                  onChange={event => handleInputChange(index, event)}
                  />
              </div>
            </Fragment>
          ))}
        </div>

        <div className="form-row my-4 mx-4">
          {outputField.map((outputField, index) => (
            <Fragment key={`${outputField}~${index}`}>
              Computed area: <b>{outputField.value}</b> using equation: {outputField.equation}
            </Fragment>
          ))}
        </div>

      </form>
    </>
  )
}



export default App;
