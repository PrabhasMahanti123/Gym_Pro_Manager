import React, { useState } from 'react';
import { Modal } from 'antd';
import Layout from '../components/Layout';
import "../styles/HomePage.css";

const workouts = [
  {
    name: 'Chest',
    imgSrc: '/images/chest.png',
    exercises: ['Bench Press', 'Incline Dumbbell Press', 'Chest Flyes'],
    videoUrl: 'https://www.youtube.com/embed/WT0xOEuwxaw',
  },
  {
    name: 'Back',
    imgSrc: '/images/back.png',
    exercises: ['Pull-ups', 'Deadlifts', 'Barbell Rows'],
    videoUrl: 'https://www.youtube.com/embed/uUruAzW-DkI',
  },
  {
    name: 'Arms',
    imgSrc: '/images/arm.png',
    exercises: ['Barbell Curls', 'Hammer Curls', 'Concentration Curls', 'Forearms', 'Tricep'],
    videoUrl: 'https://www.youtube.com/embed/McwCYAkj5Co',
  },
  {
    name: 'Shoulders',
    imgSrc: '/images/shoulder.png',
    exercises: ['Overhead Press', 'Lateral Raises', 'Front Raises'],
    videoUrl: 'https://www.youtube.com/embed/oTd1EZHjZRY',
  },
  {
    name: 'Legs',
    imgSrc: '/images/leg.png',
    exercises: ['Squats', 'Lunges', 'Leg Press'],
    videoUrl: 'https://www.youtube.com/embed/Ksk6oh2VCJs',
  },
  {
    name: 'Abs',
    imgSrc: '/images/abs.png',
    exercises: ['Crunches', 'Planks', 'Russian Twists'],
    videoUrl: 'https://www.youtube.com/embed/qAMe-yqWe3Q',
  },

  {
    name: 'Tricep',
    imgSrc: '/images/tricep.jpg',
    exercises: ['Crunches', 'Planks', 'Russian Twists'],
    videoUrl: 'https://youtube.com/embed/1LO6pSHHk84?si=iC_lMsu0sS7tPC1R',
  },

  {
    name: 'Forearms',
    imgSrc: '/images/forearm.png',
    exercises: ['Crunches', 'Planks', 'Russian Twists'],
    videoUrl: 'https://www.youtube.com/embed/dmn4_NQ7edQ',
  },
];

const HomePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null); // Track hovered card index

  const showVideo = (url) => {
    setVideoUrl(url);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setTimeout(() => setVideoUrl(''), 300);
  };

  return (
    <Layout>
      <h1 className="text-center">GYM Workouts</h1>
      <div style={styles.container}>
        {workouts.map((workout, index) => (
          <div
            key={index}
            style={{
              ...styles.card,
              ...(hoveredCardIndex === index ? styles.cardHover : {}), // Apply hover style conditionally
            }}
            onMouseEnter={() => setHoveredCardIndex(index)}
            onMouseLeave={() => setHoveredCardIndex(null)}
          >
            <img
              src={workout.imgSrc}
              alt={workout.name}
              style={{
                ...styles.image,
                ...(hoveredCardIndex === index ? styles.imageHover : {}), // Apply hover style conditionally
              }}
            />
            <h2 style={styles.title}>{workout.name} Workout</h2>
            <button
              style={styles.videoButton}
              onClick={() => showVideo(workout.videoUrl)}
            >
              Watch Video
            </button>
          </div>
        ))}
      </div>

      {/* Modal for video popup */}
      <Modal
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        centered
        width={800}
      >
        <div style={{ textAlign: 'center' }}>
          {videoUrl && (
            <iframe
              width="720"
              height="400"
              src={videoUrl}
              title="Workout Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </Modal>
    </Layout>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: '20px',
  },
  cardContainer: {
    position: 'relative',
    width: '300px',
    margin: '20px',
    overflow: 'hidden',
  },
  cardHover: {
    transform: 'scale(1.05)', // Slightly enlarge the card on hover
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Enhance shadow effect on hover
  },
  card: {
    width: '300px',
    margin: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    backgroundColor: '#fff',
    padding: '20px',
    position: 'relative',
    transition: 'transform 0.3s ease-in-out',
    cursor: 'pointer',
  },
  imageHover: {
    transform: 'scale(1.1)', // Zoom the image on hover
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    transition: 'background-color 0.3s ease-in-out',
    zIndex: 1,
  },
  image: {
    width: '100%',
    borderRadius: '10px 10px 0 0',
    objectFit: 'cover',
    transition: 'transform 0.3s ease-in-out',
  },
  title: {
    fontSize: '24px',
    margin: '15px 0',
    zIndex: 2,
    transition: 'transform 0.3s ease-in-out, color 0.3s ease-in-out',
  },
  videoButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '15px 0',
    zIndex: 2,
    transition: 'background-color 0.3s ease-in-out',
  },
};

// Add CSS directly here or in your CSS file
const customStyles = `
  .workout-card:hover .overlay {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .workout-card:hover .title {
    transform: scale(1.1);
    color: #fff;
  }

  .workout-card:hover .videoButton {
    background-color: #ff5722;
  }

  .workout-card:hover img {
    transform: scale(1.05);
  }
`;

document.head.insertAdjacentHTML(
  'beforeend',
  `<style>${customStyles}</style>`
);

export default HomePage;
