export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[0-9]{10,15}$/;
  return re.test(phone.replace(/\D/g, ""));
};

export const validatePassword = (password) => {
  return password.length >= 8;
};
