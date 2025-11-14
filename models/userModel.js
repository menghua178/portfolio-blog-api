 const mongoose = require('mongoose');
        const bcrypt = require('bcryptjs');

        const userSchema = mongoose.Schema(
          {
            username: {
              type: String,
              required: true,
              unique: true,
            },
            email: {
              type: String,
              required: true,
              unique: true,
            },
            password: {
              type: String,
              required: true,
              minlength: 6,
            },
          },
          {
            timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
          }
        );

        // 在保存用户前，对密码进行哈希加密
        userSchema.pre('save', async function (next) {
          if (!this.isModified('password')) {
            next();
          }
          const salt = await bcrypt.genSalt(10);
          this.password = await bcrypt.hash(this.password, salt);
        });

        // 添加一个方法来比较输入的密码和哈希后的密码
        userSchema.methods.matchPassword = async function (enteredPassword) {
          return await bcrypt.compare(enteredPassword, this.password);
        };

        const User = mongoose.model('User', userSchema);
        module.exports = User;