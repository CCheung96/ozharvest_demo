import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar/Navbar';
import axios from 'axios';

function HomePage() {
  const [data, setData] = useState([]);

  // For testing purposes: Attempt a GET request to Sharepoint Proxy Server at 
  // localhost port 3001
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/sharepoint');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data from SharePoint', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      
      {/* Replace with Home Page Content */}
      Home Page Content

      {/* For testing purposes: An attempt to display SharePoint data in React */}
      <h1>SharePoint Data</h1> 
      <ul>
        {data.map(item => (
          <li key={item.Id}>{item.Title}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;