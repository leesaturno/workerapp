import React, {Component} from 'react';
import './Card.scss';

import Icon from '../Icons/Icons'
import {NavLink} from 'react-router-dom';
  
const Card = ({ title, btn, href, content }) => (
  <div className="card card-dark mb-3">
    <div className="card-header">
      <div className="card-title text-ups"> 
        <span className="text-title fl">{ title }</span>
        <NavLink to={href}><a className="fr mr-30">
          <button className="btn-Card text-ups">
            <span className="text-h">
              { btn }
            </span>
            <Icon name="newUser"/>
          </button>
        </a></NavLink>
      </div>
    </div>
    <br/>
    <div className="card-body">
      { content }
    </div>
  </div>
);

export default Card;
