// in src/index.js

// Added lines to use wp.element instead of importing React
const { Component, render } = wp.element;
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import App from './App';

import * as serviceWorker from './serviceWorker';
import thunk from 'redux-thunk'

const store = createStore(
    applyMiddleware(thunk)
)
for (var i = 0; i < document.getElementsByClassName("app").length; i++) {
    let id = document.getElementsByClassName("app")[i].getAttribute("id");
    ReactDOM.render(
        <Provider store={store}><App id={id} /></Provider>, document.getElementById(id)
    )
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
