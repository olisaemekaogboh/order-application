export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error
    const { status, data } = error.response;
    const message = data?.message || data?.error || "An error occurred";
    return { status, message, details: data };
  } else if (error.request) {
    // No response from server
    return { status: 0, message: "Network error - server unreachable" };
  } else {
    // Request setup error
    return { status: -1, message: error.message || "Request failed" };
  }
};

export const isNetworkError = (error) => {
  return error.response?.status === 0 || error.code === "ECONNABORTED";
};

export const isUnauthorized = (error) => {
  return error.response?.status === 401;
};
