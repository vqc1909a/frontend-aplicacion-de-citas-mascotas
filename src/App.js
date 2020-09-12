import React, {Fragment, useState, useEffect} from 'react';
import Header from './components/Header';
import Form from './components//Form';
import Citas from './components/Citas';
import axios from 'axios';

function App() {
  const [citas, changeCitas] = useState([]);

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
  useEffect(()=>{
     traerCitas();
  },[]);

  const traerCitas = async () => {
        try{
          const {data} = await axios.get(process.env.REACT_APP_BACKEND_URL + '/citas');
          changeCitas(data.message);
        }catch(err){
          const {data} = err.response;
          console.log(data.message);
        }
  }

  return (
    <Fragment>
      <Header title="Administrador de Pacientes" />
      <main>
        <section className="citas py-5">
            <div className="container">
              <div className="row">
                <Form title="Crear cita" agregarCita={agregarCita}/>
                <Citas title="Administra tus citas" citas={citas} eliminarCita={eliminarCita} traerCitas={traerCitas} />
              </div>
            </div>
        </section>
      </main>
    </Fragment>

  );
}

export default App;
