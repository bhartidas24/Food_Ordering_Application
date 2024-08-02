import React, { useEffect, useState } from 'react';
// import './Spinner.css'; // Assuming you have some CSS for styling the spinner

const Spinner = () => {
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 10000); // Set the timeout to 10 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showSpinner && <div >
      <div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
      </div>}
    </div>
  );
};

export default Spinner;