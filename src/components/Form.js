import React, {useState} from 'react';
import axios from 'axios';
const Form = ({title, agregarCita}) => {

     const [cita, changeCita] = useState({
          name: '',
          propietario: '',
          fecha: '',
          hora: '',
          description: '',
          error: '',
          success: ''
     })

     const {name, propietario, fecha, hora, description, error, success} = cita;

     const handleCita = (e) => {
          changeCita({
               ...cita,
               [e.target.name]: e.target.value
          })
     }
     const submitCita = (e) => {
          e.preventDefault();
          if(name.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || description.trim() === ''){
               changeCita({
                    ...cita,
                    error: "Todos los campos son obligatorios",
               })
               return null;
          }
          crearCita(cita, agregarCita);
     }
     const crearCita = async (cita, agregarCita) => {
          try{
               const { data } = await axios.post(process.env.REACT_APP_BACKEND_URL+ '/citas', cita);
               //! Solo iria esto si trabajas con react nmas
               agregarCita(cita);
               //!-------------------
               changeCita({
                 name: "",
                 propietario: "",
                 fecha: "",
                 hora: "",
                 description: "",
                 error: "",
                 success: data.message,
               });  
          }catch(err){
               const { data } = err.response;
               changeCita({
                 ...cita,
                 error: data.message,
               });  
          }
     }
     return (
           <div className="col-md-6 text-white">
               <h2 className="font-weight-bolder text-uppercase text-center">{title}</h2>
               <form action="" onSubmit={submitCita} className="font-weight-bolder justify-content-center">
                    <div className="form-group">
                         <label htmlFor="name">Nombre Mascota</label>
                         <input type="text" className="form-control" name="name" id="name" placeholder="Nombre mascota" onChange={handleCita} value={name}/>
                    </div>
                    <div className="form-group">
                         <label htmlFor="propietario">Nombre Dueño</label>
                         <input type="text" className="form-control" name="propietario" id="propietario" placeholder="Nombre dueño" onChange={handleCita} value={propietario}/>
                    </div>
                    <div className="form-group">
                         <label htmlFor="fecha">Fecha</label>
                         <input type="date" className="form-control" name="fecha" id="fecha"  onChange={handleCita} value={fecha}/>
                    </div>
                    <div className="form-group">
                         <label htmlFor="hora">Hora</label>
                         <input type="time" className="form-control" name="hora" id="hora" onChange={handleCita} value={hora}/>
                    </div>
                    <div className="form-group">
                         <label htmlFor="description">Síntomas</label>
                         <textarea className="form-control" name="description" id="description" placeholder="Descripción" rows="5" onChange={handleCita} value={description}></textarea>
                    </div>
                    <div className="form-group text-center">
                         <button type="submit" className="btn btn-outline-light btn-lg text-center btn-block">Agregar Cita</button>
                    </div>
               </form>
               {error ? <div className="alert alert-danger">{error}</div> : null}
               {success ? <div className="alert alert-success">{success}</div> : null}

          </div>
     );
}
 
export default Form;