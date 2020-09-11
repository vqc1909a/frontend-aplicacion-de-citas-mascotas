import React, {Fragment} from 'react';
import Header from './components/Header';
import Form from './components//Form';
function App() {
  return (
    <Fragment>
      <Header title="Administrador de Pacientes" />
      <main>
        <section className="citas py-5">
            <div className="container">
              <div className="row">
                <Form title="Crear cita"/>
                <div className="col-md-6">
                  
                </div>
              </div>
            </div>
        </section>
      </main>
    </Fragment>

  );
}

export default App;
