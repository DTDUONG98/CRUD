
export const formatNumber = (num: number) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

export const phoneNumberSGP = (value: any) => {
  let re = /^([3|6|8|9]\d{7}|65[3|6|8|9]\d{7}|\+65(\s)?[3|6|8|9]\d{7})$/;
  if(!re.test(String(value).toLowerCase())){
    return false
  }
  return true
}
