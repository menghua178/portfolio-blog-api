const jwt = require('jsonwebtoken');

        const generateToken = (id) => {
          return jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: '30d', // Token有效期30天
          });
        };

        module.exports = generateToken;