import { Schema, model, Types } from 'mongoose';

interface IRequest {
  _id: Types.ObjectId;
  bin_id: string;
  request_id: string;
  data: any;
}

const RequestSchema = new Schema<IRequest>({
  bin_id: {
    type: String,
    required: true,
  },
  request_id: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});

/* eslint-disable no-param-reassign */
RequestSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    // Don't reveal internal db IDs to the public
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
/* eslint-enable no-param-reassign */

const RequestModel = model('Request', RequestSchema);

export { IRequest, RequestModel };
