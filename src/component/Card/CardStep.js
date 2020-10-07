import React, {Component} from 'react';
import './Card.scss';


const CardStep = ({ title, content }) => (
    <div>
        <div className="card-step card-dark mb-3">
            <div className="card-header">
                <div className="card-title text-title text-ups"> 
                    { title }
                </div>
            </div>
            <div className="card-body">
                { content }
            </div>
        </div>
    </div>
);

export default CardStep;
