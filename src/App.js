import "./App.css";
import { useState } from "react";
import date from "date-and-time";
function App() {


  //date
  const now = new Date();
  const day = date.format(now, "dddd");
 


  //hooks
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState("");
  const [errorMessage, setErrorMessage] = useState('');




  const delet = (itemDel) => {
    const updated = toDos.filter((item) => item !== itemDel);
    setToDos(updated);
  };


  const handleAddTodo = () => {
   
    if (toDo.trim() !== '') {
    
      const isDuplicate = toDos.some((todo) => todo.text.toLowerCase() === toDo.toLowerCase());
  
      if (isDuplicate) {
        setErrorMessage('Duplicate todo. Please enter a unique value.');
      } else {
        setToDos([...toDos, { id: Date.now(), text: toDo, status: false }]);
        setToDo('');
        setErrorMessage(''); 
      }
    } else {
      setErrorMessage('Please enter a non-empty value');
    }
  };

 

  return (
    <div className="app">
      <div className="mainHeading ">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {day} 🌝 ☕ </h2>
        <br />
      </div>
      <div className="input mx-auto p-2">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />

        <i
          onClick={handleAddTodo}
          className="fas fa-plus"
        ></i>
        
      </div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <div className="todos">
        {toDos.length <= 0 ? (
          <>
            <div className="todo">
              <div className="left mx-auto pt-3">
                <p className="p-2">INSER VALUE</p>
              </div>
              <div className="right"></div>
            </div>
          </>
        ) : (
          toDos.map((value) => {
            return (
              <div className="todo" key={value.id}>
                <input
                  onChange={(e) => {
                    setToDos(
                      toDos.filter((obj) => {
                        if (obj.id === value.id) {
                          obj.status = e.target.checked;
                        }
                        return obj;
                      })
                    );
                  }}
                  value={value.status}
                  type="checkbox"
                  name=""
                  id=""
                />
                <div className="left mx-auto pt-3">
                  <p>{value.text}</p>
                </div>
                <div className="right">
                  <i onClick={() => delet(value)} className="fas fa-times"></i>
                </div>
              </div>
            );
          })
        )}

        <br />
        <br />
        <br />
        <br />

        <h1>COMPLETED</h1>

        {toDos.map((obj) => {
          if (obj.status) {
            return (
              <div className="todo">
                <div className="left mx-auto pt-3">
                  <p className="p-2">{obj.text}</p>
                </div>
                <div className="right"></div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default App;
