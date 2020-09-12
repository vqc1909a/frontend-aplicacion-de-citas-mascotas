import React, { Fragment, useState} from 'react';
import axios from 'axios';
const Cita = ({cita, i, eliminarCita, traerCitas}) => {
     const {name, propietario, fecha, hora, description, _id} = cita;

      const [citaedited, changeCitaEdited] = useState({
           name,
           propietario,
           fecha,
           hora,
           description,
           error: '',
           success: ''
      })
      const handleCitaEdited = (e) => {
           changeCitaEdited({
                ...citaedited,
                [e.target.name]: e.target.value
           })
      }

     const deleteCita = async (id) => {
          try{ 
               const {data} = await axios.delete(process.env.REACT_APP_BACKEND_URL + '/citas/' + id);
               //! Solo iria esto si trabajas con react nmas
               eliminarCita(id);
               //!-------------------
               console.log(data.message);
          }catch(err){
               const {data} = err.response;
               console.log(data.message);
          }
     }

     const submitCitaEdited = (id, editcita, e) => {
          e.preventDefault();
          if (name.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || description.trim() === '') {
               changeCitaEdited({
                    ...citaedited,
                    error: "Todos los campos son obligatorios",
               })
               return null;
          }
          updateCita(id, editcita)
     }
     const updateCita = async (id, editcita) => {
          try{
               const {data} = await axios.put(process.env.REACT_APP_BACKEND_URL + '/citas/' + id, editcita);
               traerCitas();
               changeCitaEdited({
                      ...citaedited,
                         success: data.message
               })
          }catch(err){
               const {data} = err.response;
               changeCitaEdited({
                    ...citaedited,
                    error: data.message
               })
          }
     }

     return (
          <Fragment>
               <div className="card text-body my-3">
                    <div className="card-header d-flex justify-content-between align-items-start">
                         <h3 className="card-title">Cita N°{i}</h3>
                         <div>
                              <span><i className="far fa-edit fa-2x mx-1" data-toggle="modal" data-target={`#editModal`+ i}></i></span>
                              <span><i onClick={() => deleteCita(_id.toString())} className="fas fa-times fa-2x"></i></span>
                         </div>
                    </div>
                    <div className="card-body mascota">
                         <ul className="list-group">
                              <li className="list-group-item"><span className="font-weight-bolder">Mascota: </span>{name}</li>
                              <li className="list-group-item"><span className="font-weight-bolder">Dueño: </span>{propietario}</li>
                              <li className="list-group-item"><span className="font-weight-bolder">Fecha: </span>{fecha}</li>
                              <li className="list-group-item"><span className="font-weight-bolder">Hora: </span>{hora}</li>
                              <li className="list-group-item"><span className="font-weight-bolder">Sintomas: </span>{description}</li>
                         </ul>
                    </div>
               </div>

               <div className="modal fade text-dark" id={`editModal`+ i}>
                    <div className="modal-dialog">
                         <div className="modal-content">
                              <div className="modal-header">
                                   <h3 className="modal-title">Cita N°{i}</h3>
                                   <button className="close" data-dismiss="modal">
                                        <span>&times;</span>
                                   </button>                                   
                              </div>
                              <div className="modal-body">
                                   <form onSubmit={(e) => submitCitaEdited(_id.toString(), citaedited, e)}>
                                        <div className="form-group">
                                             <input type="text" placeholder="Nombre mascota" value={citaedited.name} className="form-control" name="name" id="name" onChange={handleCitaEdited} />
                                        </div>
                                        <div className="form-group">
                                             <input type="text" placeholder="Nombre propietario" value={citaedited.propietario} className="form-control" name="propietario" id="propietario" onChange={handleCitaEdited}/>
                                        </div>
                                        <div className="form-group">
                                             <input type="date" value={citaedited.fecha.substr(0,10)} className="form-control" name="fecha" id="fecha" onChange={handleCitaEdited}/>
                                        </div>
                                        <div className="form-group">
                                             <input type="time" value={citaedited.hora} className="form-control" name="hora" id="hora" onChange={handleCitaEdited}/>
                                        </div>
                                        <div className="form-group">
                                             <textarea name="description" id="description" rows="5" value={citaedited.description} className="form-control" onChange={handleCitaEdited}></textarea>
                                        </div>
                                        <div className="form-group">
                                             <button type="submit" className="btn btn-primary btn-block">Editar Cita</button>
                                        </div>
                                   </form>
                                   {citaedited.error ? <div className="alert alert-danger d-block">{citaedited.error}</div> : null}
                                   {citaedited.success ? <div className="alert alert-success d-block">{citaedited.success}</div> : null}
                              </div>
                         </div>
                    </div>
               </div>
          </Fragment>

     );
}
 
export default Cita;