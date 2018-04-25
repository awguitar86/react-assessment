import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import router from './router';
import Home from './Home';
import Todo from './Todo';

export default (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/todo/:id' component={Todo}/>
    </Switch>
)