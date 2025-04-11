import React, { useState, useEffect } from 'react';

const hoverStyles = `
  .file-label:hover {
    background-color: #ff5a4a;
  }
`;

const foodImages = [
  'https://images.unsplash.com/photo-1600891964599-f61ba0e24092',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
  'https://images.unsplash.com/photo-1565895405132-c8c8df58a4bb',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
  'https://images.unsplash.com/photo-1498837167922-ddd27525d352',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1',
];

const UploadImage = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileStatus, setFileStatus] = useState('No file chosen');

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setBackgroundIndex((prev) => (prev + 1) % foodImages.length);
        setFade(true);
      }, 1000); // Fade out duration
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileStatus(file ? file.name : 'No file chosen');
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Upload success:', data);
        // Redirect or handle response
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Upload error');
    }
  };

  return (
    <>
      <style>{hoverStyles}</style>
      <div style={styles.wrapper}>
        {/* Background layer */}
        <div
          style={{
            ...styles.background,
            backgroundImage: `url(${foodImages[backgroundIndex]}?auto=format&fit=crop&w=1350&q=80)`,
            opacity: fade ? 1 : 0,
          }}
        ></div>
        {/* Overlay */}
        <div style={styles.overlay}>
          <h1 style={styles.title}>
            <span style={styles.brand}>NutriSnap:</span> Upload Your Meal
          </h1>
          <div style={styles.uploadSection}>
            <p style={styles.note}>Only food pictures, please 🍔🍕🥗</p>
            <div style={styles.fileInputWrapper}>
              <input
                type="file"
                id="fileInput"
                style={styles.fileInput}
                onChange={handleFileChange}
              />
              <label htmlFor="fileInput" style={styles.fileLabel} className="file-label">
                Choose File
              </label>
              <span style={styles.fileStatus}>{fileStatus}</span>
            </div>
            <button style={styles.submitButton} onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
    wrapper: {
      position: 'fixed',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
    },
    background: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',       // Ensures full screen fill
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      filter: 'brightness(60%)',
      transition: 'opacity 1s ease-in-out',
      zIndex: 1,
    },
  overlay: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
    padding: '20px',
    color: '#fff',
    textAlign: 'center',
  },
  title: {
    fontSize: '3rem',
    fontWeight: '900',
    color: '#000',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    padding: '10px 20px',
    borderRadius: '10px',
    marginBottom: '30px',
  },
  brand: {
    color: '#ff8800',
    fontStyle: 'italic',
  },
  uploadSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    color: '#333',
    maxWidth: '400px',
    width: '100%',
  },
  fileInputWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15px',
    flexWrap: 'wrap',
  },
  fileInput: {
    display: 'none',
  },
  fileLabel: {
    backgroundColor: '#ff6f61',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginRight: '10px',
    transition: 'background-color 0.3s',
  },
  fileStatus: {
    fontSize: '0.9rem',
    color: '#666',
    marginTop: '10px',
  },
  submitButton: {
    marginTop: '20px',
    backgroundColor: '#00b894',
    color: '#fff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '25px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
  },
  note: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#555',
    marginBottom: '10px',
  },
};

export default UploadImage;
