import React, { useState } from 'react';
import api from '../services/api';
import Navbar from './Navbar';

const CSVUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        await api.post('/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        alert('CSV Uploaded and Tasks Distributed!');
    };

    return (
        <div>
            <Navbar />
            <h2>Upload CSV</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default CSVUpload;
