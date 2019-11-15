import React, { useState } from "react";
import axios from "axios";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const axiosWithAuth = ()=>{
  return axios.create({
    headers: {
      authorization: localStorage.getItem("token")
    }
  });
}

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    color: "",
    code: {
      hex: "#"
    },
    id: 100
  })

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth().put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then((response)=>{
        console.log("edit success",response)
        updateColors(response.data);
      })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth().delete(`http://localhost:5000/api/colors/${color.id}`)
      .then((response) =>{
        console.log(response);
        updateColors(response.data);
      })

  };


  const onChangeHandler= (e) =>{
    if(e.target.name === "color"){
      setNewColor({
        ...newColor,
        color:e.target.value
      });
    }else{
      setNewColor({
        ...newColor,
        code:{
          hex: e.target.value
        }
      });
    }
  }
  const onSubmit = (e) =>{
    e.preventDefault();
    axiosWithAuth().post('http://localhost:5000/api/colors',newColor)
      .then((response)=>{
        console.log(response);
        updateColors(response.data);
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
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
          <legend>edit color</legend>
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
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form>
        <input name="color" placeholder="color" value={newColor.color} onChange={onChangeHandler}/>
        <input name="hex" placeholder="hex code" value={newColor.code.hex} onChange={onChangeHandler}/>
        <button onClick={onSubmit}>Add Color</button>
      </form>
    </div>
  );
};

export default ColorList;
