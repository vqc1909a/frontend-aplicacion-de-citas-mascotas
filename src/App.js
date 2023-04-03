import React, {Fragment, useState, useEffect} from 'react';
import Header from './components/Header';
import Form from './components//Form';
import Citas from './components/Citas';
import axios from 'axios';

function App() {
  //! Trabajando con local storage;
  // let citasiniciales = JSON.parse(localStorage.getitem('citas'));
  // if(!citasiniciales){
  //   citasiniciales = [];
  // }
  // const [citas, changeCitas] = useState(citasiniciales); 
  // useEffect(()=>{
  //   if(citasiniciales.length !== 0){
  //     localStorage.setItem('citas', JSON.stringify(citas));
  //   }else{
  //     localStorage.setItem('citas', JSON.stringify([]));
  //   }
  // }, [citas])

  const [citas, changeCitas] = useState([]);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const agregarCita = (cita) => {
    changeCitas([
      ...citas,
      cita
    ])
    //! Esto no va si trabajas puro react
    traerCitas();
    //!-----------------
  }

  const eliminarCita = (id) => {
    const newCitas = citas.filter(cita => cita._id.toString() !== id);
    changeCitas([
      ...newCitas
    ]);
    //! Esto no va si trabajas puro react
    traerCitas();    
    //!-----------------
  }

  const traerCitas = async () => {
    try{
      const {data} = await axios.get(process.env.REACT_APP_BACKEND_URL + '/citas');
      changeCitas(data.message);
      setIsError(false);
      setMessage("");
    }catch(err){
      const {data} = err.response;
      const message = data.message  || err.message;
      setIsError(true);
      setMessage(message)
      console.log({
        message,
      })
    }
  }

  useEffect(()=>{
     traerCitas();
  },[]);

 

  return (
    <Fragment>
      <Header title="Administrador de Pacientes" />
      <main>
        <section className="citas py-5">
            <div className="container">
              <div className="row">
                <Form title="Crear cita" agregarCita={agregarCita}/>
                {
                  !isError
                  ?
                  <Citas title="Administra tus citas" citas={citas} eliminarCita={eliminarCita} traerCitas={traerCitas} />
                  :
                  <div className="alert alert-danger">{message}</div>
                }
              </div>
            </div>
        </section>
      </main>
    </Fragment>

  );
}

export default App;
