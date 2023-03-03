var crypto = require("crypto-js")

export function dataEncryption(fileData) {
  let fpdata = fileData.toString();

  // const key = 'Z5OO0FWfkCWuUqalU4AwlA==';
  const key = 'axtQjz7QRHCV7yOrnNK7gp==';
  const keyBuffer = Buffer.from(key, 'base64');
  console.log(crypto.randomBytes(16).toString('base64'));

  // The plaintext data to encrypt
  const plaintext = fpdata;

  // The IV (initialization vector) to use for CBC mode
  const iv = 'Os28pvyLTO00JHdxsBA3sw==';
  const ivBuffer = Buffer.from(iv, 'base64');

  // Create the AES cipher using CBC mode with the generated key and IV
  const cipher = crypto.createCipheriv('aes-128-cbc', keyBuffer, ivBuffer);

  // Encrypt the plaintext
  let ciphertext = cipher.update(plaintext, 'utf8', 'base64');
  ciphertext += cipher.final('base64');

  // Send the ciphertext, IV, and key to the Android app
  // const dataToSend = {
  //   ciphertext: ciphertext,
  // };
  const dataToSend = ciphertext;
  return ciphertext;
}

export function dataDecryption(ciphertext) {
  // Decode the ciphertext from base64
  const ciphertextBuffer = Buffer.from(ciphertext, 'base64');

  // Set the encryption key and IV
  const key = 'axtQjz7QRHCV7yOrnNK7gp==';
  const iv = 'Os28pvyLTO00JHdxsBA3sw==';
  const keyBuffer = Buffer.from(key, 'base64');
  const ivBuffer = Buffer.from(iv, 'base64');

  // Create the AES cipher using CBC mode with the key and IV
  const decipher = crypto.createDecipheriv('aes-128-cbc', keyBuffer, ivBuffer);

  // Decrypt the ciphertext
  let plaintext = decipher.update(ciphertextBuffer, null, 'utf8');
  plaintext += decipher.final('utf8');

  // Parse the decrypted JSON data
  const fpdata = JSON.parse(plaintext);

  // Return the decrypted fingerprint data
  return fpdata;
}
