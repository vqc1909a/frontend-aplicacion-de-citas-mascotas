import React from 'react';
const Header = ({title}) => {

     
     return (
          <header className="header py-3 justify-content-center">
               <div className="container">
                    <div className="row">
                         <div className="col text-center text-white">
                              <h1 className="display-4 font-weight-bolder">{title}</h1>
                         </div>
                    </div>
               </div>
          </header>
     );
}
 
export default Header;