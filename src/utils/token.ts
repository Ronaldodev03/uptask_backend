export const generateToken = () =>
  Math.floor(100000 + Math.random() * 900000).toString(); // <-- token de 6 digitos
