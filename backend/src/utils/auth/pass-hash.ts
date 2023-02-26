import byscrypt from 'bcryptjs';

const hashPassword = async (password: string) => {
  const salt = await byscrypt.genSalt(10);
  const hash = await byscrypt.hash(password, salt);
  return hash;
};

const comparePassword = async (password: string, hash: string) => {
  const isValid = await byscrypt.compare(password, hash);
  return isValid;
};

export { hashPassword, comparePassword };
