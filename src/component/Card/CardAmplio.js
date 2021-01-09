import React from 'react';
import './Card.scss';



  
const CardAmplio = ({ title, content }) => (
  <div className="cardAmplio card-dark mb-3">
    <div className="card-header">
      <div className="card-title text-ups"> 
        <span className="text-title fl">{ title }</span>
      </div>
    </div>
    
    <div className="card-body">
      { content }
    </div>
  </div>
);
 
export default CardAmplio;
