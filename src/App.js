import React from 'react';
import Home from './pages/home/home';
import './App.css';
import { emit } from './utils/emit'
import intl from 'react-intl-universal'
require('intl/locale-data/jsonp/en.js');
require('intl/locale-data/jsonp/zh.js');

const locales = {
  'en':require('./assets/lang/en.json'),
  'zh':require('./assets/lang/zh.json')
}

export default class App extends React.Component{
  componentDidMount(){
    emit.on('changeLanguage',(lang)=>this.loadLocales(lang))
    this.loadLocales();
  }
  loadLocales(lang = 'zh'){
    intl.init({
      currentLocale:lang,
      locales
    }).then(() => {
      // window.location.reload();
      this.forceUpdate();
    });
  }
  render(){
    return (
      <div className="App">
        <Home/>
      </div>
    )
  }
}
