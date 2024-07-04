import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import Navbar from './Navbar';
import Axios from 'axios';
import SearchComponent from './SearchComponent';
import { storage } from "./firebase";
import { listAll,getDownloadURL } from 'firebase/storage';
import { ref } from 'firebase/storage';
import './Root.css'; // Import your CSS file for styling

const URL = process.env.REACT_APP_SERVER_URL;

const Root = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [error, setError] = useState(null); // State to hold any error messages
    const navigate = useNavigate(); // Use useNavigate for navigation
    const [fileUrls, setFileUrls] = useState({});
    const imageListRef = ref(storage, "images/");
    const urls = {};
    useEffect(() => {
        Axios.get(`${URL}/read`)
            .then((response) => {
                setStudentList(response.data);
            })
            .catch((error) => {
                console.error('Error fetching student list:', error);
                setError('Error fetching student list. Please try again later.');
            });
        const fetchFileUrls = async () => {
        try {
            const response = await listAll(imageListRef);
            await Promise.all(
                response.items.map(async (item) => {
            try {
                const url = await getDownloadURL(item);
                console.log(item.name);
                console.log(url);
                urls[item.name] = url;
            } catch (error) {
                console.error('Error getting download URL:', error);
            }
        })
      );

      // Now you can set the file URLs after fetching them
      setFileUrls(urls);
      setFileUrls((prevUrls) => ({ ...prevUrls, ...urls }));
      console.log(urls);
    } catch (error) {
      console.error('Error listing items:', error);
    }
    
  };

  // Invoke the fetchFileUrls function without parentheses
  fetchFileUrls();
    }, []);

    const handleStudentClick = (id) => {
        navigate(`/student/${id}`);
    };

    return (
        <div className="home-container">
            <Navbar />
            <div className="search-container">
                <SearchComponent
                    data={studentList}
                    searchKey="name"
                    setSearchResults={results => setSearchResults(results.filter(student => student.name.includes(searchTerm)))}
                />
                
            </div>
            {error && <div className="error-message">{error}</div>}
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Register Number</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResults.map((student) => (
                        <tr key={student._id} onClick={() => handleStudentClick(student._id)}>
                            <td>{student.name}</td>
                            <td>{student.rollNo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="button-container">
                <Link to="/add-student" className="btn">Add Student</Link>
            </div>
        </div>
    );
};

export default Root;
