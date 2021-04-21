import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
//import withAuth from '../components/withAuth'
//import config from '../config/config'
import useSWR, { mutate } from 'swr';

const URL  = `http://localhost/api/students`;
const fetcher = url => axios.get(url).then(res => res.data);

export default function Home({ token }) {
  
 const {data} = useSWR(URL,fetcher);
 
  const [students, setStudents] = useState({ });
  const [student, setStudent] = useState({ });
  const [name, setName] = useState('');
  const [major, setMajor] = useState('');
  const [gpa, setGpa] = useState(0);

if (!data) {
      console.log(data);
      return <div><h1>Please wait...</h1></div>
 }
 const getStudent = async(id) =>{
  let student = await axios.get(`${URL}/${id}`);
  setStudent(student.data)
  mutate(URL);

 }
 const getStudents = async () =>{
  let student = await axios.get(`${URL}`);
  mutate(URL);

 }
 const printStudents = () => {
  if (data.list && data.list.length) {
    return data.list.map((item, index) => {
      return (
        <div className={styles.listItem} key={index}>
          <div><b>Name:</b> {item.name}</div>
          <div> <b>Major:</b> {item.major} </div>
          <div><b>GPA:</b> {item.gpa}</div>
          
          <div>
          <button onClick={() => getStudent(item.id)}>Get</button>
          </div>
          <br></br>
        </div>
      );
    });
  } else {
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
        <h1>Our lovely students</h1>
       <h4> Student : Name : {student.name}__Major : {student.major}__GPA : {student.gpa} </h4>
        <br></br>
      <div className={styles.list}>
        {printStudents()}
      </div>
    </div>
</Layout>
  )
}