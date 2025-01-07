const bcrypt = require('bcrypt');

(async () => {
  const password = '123123'; // 암호화할 비밀번호
  const hashedPassword = await bcrypt.hash(password, 10); // 10은 saltRounds (암호화 강도)
  console.log('암호화된 비밀번호:', hashedPassword);
})();