// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var proto_prediction$service_pb = require('../proto/prediction-service_pb.js');

function serialize_papaya_PredictionRequest(arg) {
  if (!(arg instanceof proto_prediction$service_pb.PredictionRequest)) {
    throw new Error('Expected argument of type papaya.PredictionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_papaya_PredictionRequest(buffer_arg) {
  return proto_prediction$service_pb.PredictionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_papaya_PredictionResponse(arg) {
  if (!(arg instanceof proto_prediction$service_pb.PredictionResponse)) {
    throw new Error('Expected argument of type papaya.PredictionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_papaya_PredictionResponse(buffer_arg) {
  return proto_prediction$service_pb.PredictionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var PapayaServiceService = exports.PapayaServiceService = {
  predict: {
    path: '/papaya.PapayaService/Predict',
    requestStream: false,
    responseStream: false,
    requestType: proto_prediction$service_pb.PredictionRequest,
    responseType: proto_prediction$service_pb.PredictionResponse,
    requestSerialize: serialize_papaya_PredictionRequest,
    requestDeserialize: deserialize_papaya_PredictionRequest,
    responseSerialize: serialize_papaya_PredictionResponse,
    responseDeserialize: deserialize_papaya_PredictionResponse,
  },
};

exports.PapayaServiceClient = grpc.makeGenericClientConstructor(PapayaServiceService);
