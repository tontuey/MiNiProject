import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
//import withAuth from '../components/withAuth'
//import config from '../config/config'
import useSWR, { mutate } from 'swr';

const URL  = `http://localhost/api/Recipes`;
const fetcher = url => axios.get(url).then(res => res.data);

export default function Home({ token }) {
  
 const {data} = useSWR(URL,fetcher);
 const [max, setMax] = useState(10000);
 const [min, setMin] = useState(0);
 const [name, setName] = useState('');
if (!data) {
      console.log(data);
      return <div><h1>Please wait...</h1></div>
 }
 const searchMenu = (str) => {
   if(str == '')
    setName('')
   for(let i = 0 ;i <data.list.length;i++)
    {let strtest = data.list[i].name
    let n = strtest.includes(str)
    if(n){
      setName(data.list[i].name)
    }
    }
 }
 const printRecipes = (data) => {
  if(max == 0 || max == '')
    setMax(10000)
  if (data && data.length) {
    if(name != ''){
      let   Name = data.filter((item)=>item.name == name);
            Name = Name.filter((item)=>+item.cost>=min);
            Name = Name.filter((item)=>+item.cost<=max);
      return Name.map((item, index) => {
        return (
        <div className={styles.listItem} key={index}>
          <div><b>Name:</b> {item.name}</div>
          <div> <b>Ingredients:</b> {item.ingredients} </div>
          <div><b>Cooking:</b> {item.cooking}</div>
          <div><b>Cost:</b> {item.cost}</div>
          <div>
          </div>
          <br></br>
        </div>
      );
    });
    }
    else
    { 
      let Data = data.filter((item)=>+item.cost>=min);
          Data = Data.filter((item)=>+item.cost<=max);
      return Data.map((item, index) => {
        return (
        <div className={styles.listItem} key={index}>
          <div><b>Name:</b> {item.name}</div>
          <div> <b>Ingredients:</b> {item.ingredients} </div>
          <div><b>Cooking:</b> {item.cooking}</div>
          <div><b>Cost:</b> {item.cost}</div>
          <div>
          </div>
          <br></br>
        </div>
      );
    });}
  } 
    else {
    return <p>Please wait...</p>;
  }
};

  return (
    <Layout>
    <Head>
        <title>Home Page</title>
    </Head>
    <div className={styles.container}>
        <Navbar />
        <br></br>
        <h1>Recipes</h1>
       
        <br></br>
      <div className={styles.list}>
      ช่วงราคา : <input type="number" placeholder="min" onChange={(e) => setMin(e.target.value)}></input>
      <input type="number" placeholder="max" onChange={(e) => setMax(e.target.value)}></input> ค้นหาชื่อเมนู : 
      <input type="text" placeholder="ชื่อเมนู" onChange={(e) => searchMenu(e.target.value)}></input>          
      {printRecipes(data.list)} 
                   
      
                   
        
      </div>
    </div>
</Layout>
  )
}