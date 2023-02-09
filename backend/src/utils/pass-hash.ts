import byscrypt from 'bcryptjs';

export const hashPassword = (password: string) => {
    const salt = byscrypt.genSaltSync(10);
    return byscrypt.hashSync(password, salt);
}

export const comparePassword = (password: string, hash: string) => {
    return byscrypt.compareSync(password, hash);
}

export default { hashPassword, comparePassword };