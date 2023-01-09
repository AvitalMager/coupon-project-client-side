import React, { Component } from 'react'
import { store } from '../../redux/store';
import "./Header.css";

export default class Header extends Component {
    public render() {

//Welcome {store.getState().userInfo.userName}, it is nice good to see you! :)

        return (
          <div 
          className="header">  
          <img src="58aff217829958a978a4a6d2.png" alt="Avatar" width="170" />
          </div>


        );
    }
  }
