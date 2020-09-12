import React from 'react';
import Cita from '../components/Cita';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
const Citas = ({title, citas, eliminarCita, traerCitas}) => {
     return (
          <div className="col-md-6 text-white">
               <h2 className="font-weight-bolder text-uppercase text-center">{title}</h2>
               {citas.length === 0 ? <div className="alert alert-danger">No tiene citas agregadas</div> : null}
               <TransitionGroup className="citas" component={null}>
                    {citas.map((cita, i) => 
                         <CSSTransition
                         key={cita._id}
                         timeout={1000}
                         classNames="cita"
                         >
                                   <Cita cita={cita} i={i+1} eliminarCita={eliminarCita} traerCitas={traerCitas} />
                         </CSSTransition>
                    )}
               </TransitionGroup>
          </div>
     );
}
 
export default Citas;