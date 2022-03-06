import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { Bar } from "react-chartjs-2";
import alanBtn from '@alan-ai/alan-sdk-web';
import './App.css';




const App = () => {
  const [term, setTerm] = useState('');
  const [food, setFood] = useState('');
  const [nutrient, setNutrient] = useState([]);
  const [chartData, setChartData] = useState({})
  const label = ['Calories', 'Carbohydrates', 'Cholesterol', 'Saturated Fat', 'Total Fat', 'Fiber', 
  'Potassium', 'Protein', 'Serving Size', 'Sodium', 'Sugar'];
  // var info = [];

  const changeQuery = () => {
    setTerm(food);
  }

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.request({
        method: 'GET',
        url: 'https://calorieninjas.p.rapidapi.com/v1/nutrition',
        params: {query: term},
        headers: {
          'x-rapidapi-host': 'calorieninjas.p.rapidapi.com',
          'x-rapidapi-key': '402efae18cmshdfe9a1ab13c9919p1a7dc8jsn18341fa513bd'
        }
      });
      if(res.data.items.length > 0) setNutrient([
        res.data.items[0].calories,
        res.data.items[0].carbohydrates_total_g,
        res.data.items[0].cholesterol_mg,
        res.data.items[0].fat_saturated_g,
        res.data.items[0].fat_total_g,
        res.data.items[0].fiber_g,
        res.data.items[0].potassium_mg,
        res.data.items[0].protein_g,
        res.data.items[0].serving_size_g,
        res.data.items[0].sodium_mg,
        res.data.items[0].sugar_g
      ]);
    }
    fetch();
    }, [term]);

    useEffect(() => {
      if(nutrient.length > 0) console.log(nutrient);
      setChartData({
        labels: label,
        datasets: [
          {
            label: "Nutrition",
            data: nutrient,
            backgroundColor: [
              "#ffbb11",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
              "#ffbb11",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
              "#ecf0f1"
            ]
          }
        ]
      })
    }, [nutrient]);


    useEffect(() => {
      alanBtn({
          key: '7e03308ec8b232eeeca57268fa55118e2e956eca572e1d8b807a3e2338fdd0dc/stage',
          onCommand: ( { command, info } ) => {
            if (command === 'info') {
              setTerm(info);
            }
          }
      });
    }, []);

  return (
    <div className="main-container">
      <h1 className="header">Nutrition</h1>
      <p className="quote">He who has health, has hope; and he who has hope has everything. --  <i>Thomas Carlyle</i></p>
      <div className="nav-container">
        <input 
            className="search"
            type="text"
            placeholder="Tomato, Chicken..."
            onChange={(e) => {
                setFood(e.target.value);
            }}
        />
        <button className="button" onClick={changeQuery}>Click to Know</button>
      </div>
      <div className="bar-container">
      {nutrient.length > 0 ? <Bar
        className="graph"
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: term.toUpperCase()
            },
            legend: {
              display: true,
              position: "bottom"
           }
          }
        }}
      /> : <br></br>}
      </div>
    </div>
  );
}

export default App;
