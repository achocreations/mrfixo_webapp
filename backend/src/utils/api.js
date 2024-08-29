const sendResponse = (res, statusCode, data) => {
    res.status(statusCode).json(data);
  };
  
  const sendErrorResponse = (res, statusCode, message) => {
    res.status(statusCode).json({ message });
  };
  
  module.exports = {
    sendResponse,
    sendErrorResponse,
  };
  