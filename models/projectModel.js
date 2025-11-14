 const mongoose = require('mongoose');

        const projectSchema = mongoose.Schema({
          title: { type: String, required: true },
          description: { type: String, required: true },
          imageUrl: { type: String },
          repoUrl: { type: String },
          liveUrl: { type: String },
          // 关联到创建此项目的用户
          user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
          },
        });

        const Project = mongoose.model('Project', projectSchema);
        module.exports = Project;