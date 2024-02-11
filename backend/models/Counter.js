var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//To auto assign an increasing id to tickets generated

const counterSchema = new Schema({
  _id: { type: String, required: true }, //model on which it has to be applied i.e."ticket"
  seq: { type: Number, default: 1000 }, //current count
});

counterSchema.index({ _id: 1, seq: 1 }, { unique: true }); //starting index

const counterModel = mongoose.model("counter", counterSchema);

//auto increasing function for counter model

const autoIncrementModelID = async function (modelName, doc, next) {
  try {
    const counter = await counterModel
      .findByIdAndUpdate(
        modelName,
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      )
      .exec();

    doc.id = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = autoIncrementModelID;
