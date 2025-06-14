const crypto = require('crypto');

const generateRandomPassword = () => {
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*";
  const all = lower + upper + numbers + symbols;

  const getRandomChar = (charset) => charset.charAt(crypto.randomInt(0, charset.length));


  let password = [
    getRandomChar(lower),
    getRandomChar(upper),
    getRandomChar(numbers),
    getRandomChar(symbols),
  ];


  for (let i = 4; i < 8; i++) {
    password.push(getRandomChar(all));
  }


  return password.sort(() => 0.5 - Math.random()).join('');
};

module.exports = generateRandomPassword;
