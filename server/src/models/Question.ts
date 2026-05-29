import mongoose, { Schema, type Document, type Model } from 'mongoose';
import type { QuestionInput } from '../types/question.js';

export interface IQuestion extends QuestionInput, Document {}

const questionSchema = new Schema<IQuestion>(
  {
    question: { type: String, required: true, trim: true },
    options: {
      type: [String],
      required: true,
      validate: {
        validator(v: string[]) {
          return v.length >= 2 && v.length <= 4;
        },
        message: 'Options must contain between 2 and 4 items',
      },
    },
    correctIndex: {
      type: Number,
      required: true,
      min: 0,
    },
    hint: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

questionSchema.pre('validate', function validateCorrectIndex() {
  if (this.correctIndex >= this.options.length) {
    this.invalidate(
      'correctIndex',
      'correctIndex must be a valid index into options'
    );
  }
});

export const Question: Model<IQuestion> = mongoose.model<IQuestion>(
  'Question',
  questionSchema
);
