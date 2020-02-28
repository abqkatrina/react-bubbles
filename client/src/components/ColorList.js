import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const addColor = ()=> {
    setAdding(true);
  }

  const saveAdd = e => {
    e.preventDefault();
    axiosWithAuth()
    .post(`http://localhost:5000/api/colors/`, colorToAdd)
    .then(response => {
      updateColors(colors.map(color => {
        if(color.id === colorToAdd.id) { return colorToAdd } else { return color}
      }))
      console.log(colors)
    })
    .catch(error => console.log('no save new color', error))
  };

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    .get(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(response => {
      updateColors(colors.map(color => {
        if(color.id === colorToEdit.id) {
          return colorToEdit;
        } else {
          return color;
        }
      })
      )})
      .catch(error => console.log('no save edited color', error))
  };

  const deleteColor = color => {
    axiosWithAuth()
    .delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(response => updateColors(colors.filter(color => color.id !== response.data)))
    .catch(error => console.log('no delete color', error))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <button onClick={addColor}>add new color</button>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color:</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>)}
        {adding && (
          <form onSubmit={saveAdd}>
            <legend> add color:</legend>
            <a href='http://htmlcolorcodes.com' target='_blank'> find a color </a>
            <label>color name:
            <input onChange={event => setColorToAdd({...colorToAdd, color: event.target.value})} value={colorToAdd.color} /></label>
            <label>hex code:
            <input onChange={event => setColorToAdd({ ...colorToAdd, code: { hex: event.target.value}})} value={colorToAdd.code.hex} /></label>
            <div className="button-row">
              <button type="submit">save</button>
              <button onClick={() => setAdding(false)}>cancel</button>
            </div>
          </form>)}
    </div>
  );
};

export default ColorList;
