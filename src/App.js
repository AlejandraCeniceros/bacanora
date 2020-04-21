/*import ProfileImage from './img/2nd test.png'*/

import React, {Component, Fragment} from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from 'chart.js';

export default class App extends Component{

  constructor(props){
    super(props)

    this.state = {
      url: 'https://pomber.github.io/covid19/timeseries.json',
      data: {},
      context: '',
      arr: []
    }
    this.canvas = React.createRef();

  }

  componentDidMount() {
    const {url} = this.state;
    fetch(url).then(res => res.json()).then(json => this.setState({
      data: json.Mexico[json.Mexico.length - 1],
      arr: json.Mexico
    }));
    this.setState({context: this.canvas.getContext('2d')});
  }

  shouldComponentUpdate(nextProps){
    return this.state.data !== nextProps.data;
  }
render() {
     const {data} = this.state;
     const {date, confirmed, deaths, recovered} = data;
     
     console.log(this.state);

     const arr_cofirmed = arr.map(e =>{
       return e.confirmed;
     });

     const arr_dates = arr.map(e =>{
       return e.date;
     });

     const arr_deaths = arr.map(e =>{
       return e.deaths;
     });

     const arr_recovereds = arr.map(e =>{
       return e.recovered;
     });

     const myChart = new Chart(this.state.context, {
       type: 'line',
       data: {
           labels: arr_dates,
           datasets: [{
               label: 'Casos confirmados',
               fill: false,
               data: arr_cofirmed,
               backgroundColor: 'rgba(22, 10, 0, 11)',
               borderColor: 'rgba(22, 10, 0, 11)',
               borderWidth: 2
           },
           {
             label: 'Fallecimientos',
             fill: false,
             data: arr_deaths,
             backgroundColor: 'rgba(22, 10, 0, 11)',
             borderColor: 'rgba(22, 10, 0, 11)',
             borderWidth: 2
         },
         {
           label: 'Pacientes recuperados',
           fill: false,
           data: arr_recovereds,
           backgroundColor: 'rgba(22, 10, 0, 11)',
           borderColor: 'rgba(22, 10, 0, 11)',
           borderWidth: 2
       }]
       },
       options: {
           scales: {
               yAxes: [{
                   ticks: {
                       beginAtZero: true
                   }
               }]
           }
       }
   });






     /* */
     return (
        <Fragment>

           <div className="container">
           <h1>Covid19 México</h1>
           <div className="row">

           <div className="col text-center">
                <div className="display-1">{date}</div>
                <div className="text-secondary"><strong>Ultima actualización</strong>/strong></div>
                <div className="display-1">{confirmed}</div>
                <div className="text-secondary"><strong>Confirmados</strong></div>
                <div className="display-1">{deaths}</div>
                <div className="text-secondary"><strong>Fallecimientos</strong></div>
                <div className="display-1">{recovered}</div>
                <div className="text-secondary"><strong>Recuperados</strong></div>
                <br/>
                <canvas id="myChart" ref={c => this.canvas = c} width="400" height="400"></canvas>
                 <br/>
                <footer>Datos tomados de "The Center for Systems Science and Engineering (CSSE) at JHU", public api: https://github.com/pomber/covid19</footer>
              </div>
            </div>

           </div>
        </Fragment>
     );
   }
 }
