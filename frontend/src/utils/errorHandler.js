export const errorHandler = (error) => {
  let message = 'An unexpected error occurred. Please try again later.';
  
  if (error.response) {
    // Server responded with a status other than 200 range
    if (error.response.data && error.response.data.message) {
      message = error.response.data.message;
    } else {
      message = `Server error: ${error.response.status}`;
    }
  } else if (error.request) {
    // Request was made but no response received
    message = 'Network error. Please check your internet connection.';
  } else {
    // Something else happened while setting up the request
    message = error.message;
  }

  return message;
};
