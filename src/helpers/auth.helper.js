import bcrypt from 'bcrypt'

export const hashPassword = async (password) => {
    try {
        let hashedPassword = bcrypt.hash(password, Number(process.env.ROUND))
        return hashedPassword
    } catch (error) {
        console.log(error);
        
    }
}

export const comparPassword =  async( password , hashedPassword  ) => {
    return bcrypt.compare(password , hashedPassword)
}