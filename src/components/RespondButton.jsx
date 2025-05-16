import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const RespondButton = ({ taskId }) => {
  const [responded, setResponded] = useState(false);
  const token = useSelector((state) => state.auth.token);
  console.log('TOKEN:', token);
  console.log('TASK ID:', taskId);
  console.log('RESPONDED:', responded);

  const handleRespond = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/tasks/${taskId}/respond`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,

          },
        }
      );
      alert(res.data.message);
      setResponded(true);
    } catch (error) {
      alert(error.response?.data?.message || 'Помилка при відгуку');
    }
  };

  return (
    <button
      onClick={handleRespond}
      disabled={responded}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
    >
      {responded ? 'Відгук надіслано' : 'Відгукнутись'}
    </button>
  );
};
RespondButton.propTypes = {
  taskId: PropTypes.string.isRequired,
};

export default RespondButton;
