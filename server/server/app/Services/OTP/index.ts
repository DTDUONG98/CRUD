import Speakeasy from 'speakeasy';
import QRCode from 'qrcode'
class OTP {
  static async generateSecret(options = {}) {
    const secret = Speakeasy.generateSecret({
      length: 20,
      ...options
    });
    const qr = await QRCode.toDataURL(secret.otpauth_url)
    return {
      base32: secret.base32,
      qrcode: qr
    }
  }

  static verify(otp, secret) {
    return Speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: otp,
      window: 6
    });
  }
}

export default OTP