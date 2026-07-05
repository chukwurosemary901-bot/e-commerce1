import { OTP } from "../models/otp.js"
import { User } from "../models/user.js"

export const deleteOTP = async (value) => {
  return  await  OTP.destroy({where: value})
}
export const newOTP = async (value) => {
  return  await  OTP.create(value)
}
export const findOTP = async (value) => {
  return  await  OTP.findOne({where: value})
}
export const verifyOTP = async (attribute, value) => {
  return  await  User.update(attribute, {where: value})
}