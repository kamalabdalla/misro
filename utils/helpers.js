// src/utils/helpers.js

const formatResponse = (status, data, message) => {
    return {
      status,
      data,
      message
    };
  };
  
  module.exports = {
    formatResponse
  };
  
