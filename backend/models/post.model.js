const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const PostSchema = new mongoose.Schema(
  {
    userId: [{ type: ObjectId, ref: "user" }],
    message: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    picture: {
      type: String,
      
      // required: true,
    },
    video: {
      type: String,
    },
    likers: {
      type: [String],
      required: true,
    },
    comments: {
      type: [
        {
          commenterId:String,
          commenterPseudo: String,
          text: String,
          timestamp: Number,
        }
      ],
      required: true,
    },
    // comments: {
    //   type: [String],
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", PostSchema);
