import crypto from 'crypto';

export const hashNumber = (number: string) => {
  return crypto.createHash('md5').update(number + process.env.NUMBER_SALT).digest("hex");
}

export const phoneNumberSGP = (number: string) => {
  let re = /^([3|6|8|9]\d{7}|65[3|6|8|9]\d{7}|\+65(\s)?[3|6|8|9]\d{7})$/;
  if(!re.test(String(number).toLowerCase())){
    return false
  }
  return true
}
