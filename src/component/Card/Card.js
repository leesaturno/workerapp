import React, {Component} from 'react';
import './Card.scss';

import Icon from '../Icons/Icons'


const Card = ({ title, btn }) => (
  <div className="card card-dark mb-3 ">
        <div className="card-header">
          <div className="card-title text-ups"> 
            <span className="text-title fl">{ title }</span>
            <a href="#" className="fr mr-30">
              <button className="button btn-Card s-main-center text-ups">
                { btn }
                <span>
                  <Icon name="newUser"/>
                </span>
              </button>
            </a>
          </div>
        </div>
        <div className="card-body" />
      </div>
);

export default Card;
