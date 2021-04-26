
import { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'
import withAuth from '../components/withAuth'
import config from '../config/config'
import axios from 'axios';
import Layout from '../components/layout'
const URL = `http://localhost/api/Recipes`


const admin = ({ token }) => {
  
    const [recipes, setRecipes] = useState({})
    const [recipe, setRecipe] = useState({});
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [cooking, setCooking] = useState('');
    const [cost, setCost] = useState(0);
    useEffect(() => {
      getRecipes();
      profileUser();
    }, []);
    const profileUser = async () => {
        try {
          
          const users = await axios.get(`${config.URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
         
          setUser(users.data);
        } catch (e) {
          console.log(e);
        }
      };
    

const getRecipes = async () => {
        let recipe = await axios.get(URL)
        setRecipes(recipe.data)
    
}
const getRecipe = async (id) => {
        let recipe = await axios.get(`${URL}/${id}`);
        setRecipe(recipe.data)
}
      const addRecipe = async (name, ingredients, cooking ,cost) => {
        let recipe = await axios.post(URL, { name, ingredients, cooking ,cost})
        console.log(recipe.data);
        getRecipes();
       
      }
      const updateRecipe = async (id) => {
        let recipe = await axios.put(`${URL}/${id}`, { name, ingredients, cooking ,cost })
        setRecipes(recipe.data)
        getRecipes();
      }
    
      const deleteRecipe = async (id) => {
        let recipe = await axios.delete(`${URL}/${id}`, { name, ingredients, cooking ,cost })
        getRecipes();
      }
    
      const printRecipes = () => {
        if (recipes.list && recipes.list.length) {
            return recipes.list.map((item, index) => {
              return (
                <div className={styles.listItem} key={index}>
                   
                  <b> {index+1}.) Name:</b>{item.name}  <br />
                  <b>Ingredients:</b> {item.ingredients} <br />
                  <b>Cooking:</b> {item.cooking} <br />
                  <b>Cost:</b> {item.cost} <br />
                  <div >
                    <button onClick={() => getRecipe(item.id)} >
                      Get
                    </button>
                    <button onClick={() => updateRecipe(item.id)} >
                      Update
                    </button>
                    <button onClick={() => deleteRecipe(item.id)}>
                      Delete
                    </button>
                  </div>
                  <br></br>
                </div>
              );
            });
          } else {
            return <p>Loading...</p>;
          }
        };


    return (
      <Layout>
            <div className={styles.container}>
                <Navbar />
            <h1>Our lovely Recipes</h1>
            <div>
            Name : {recipe.name}<br/>
            Ingredients : {recipe.ingredients}<br/>
            Cooking : {recipe.cooking}<br/>
            Cost : {recipe.cost}
            </div>
            <h2>Add Recipe</h2>
            Name:<input type="text" onChange={(e) => setName(e.target.value)}/>
            Ingredients:<input type="text" onChange={(e) => setIngredients(e.target.value)}/>
            Cooking:<input type="text" onChange={(e) => setCooking(e.target.value)}/>
            Cost:<input type="number" onChange={(e) => setCost(e.target.value)}/>
            <br></br>
             
            <button className={styles.buttoncolor} onClick={() => addRecipe(name, ingredients, cooking, cost)}>Add</button>
            
            <h3>Our Recipe</h3>
            <div className={styles.list}>{printRecipes()}</div>
            </div>
            </Layout>
        )
        
};
      
    
export default withAuth(admin)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}


