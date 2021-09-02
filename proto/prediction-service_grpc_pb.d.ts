// package: papaya
// file: prediction-service.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as prediction_service_pb from "./prediction-service_pb";

interface IPapayaServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    predict: IPapayaServiceService_IPredict;
}

interface IPapayaServiceService_IPredict extends grpc.MethodDefinition<prediction_service_pb.PredictionRequest, prediction_service_pb.PredictionResponse> {
    path: "/papaya.PapayaService/Predict";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<prediction_service_pb.PredictionRequest>;
    requestDeserialize: grpc.deserialize<prediction_service_pb.PredictionRequest>;
    responseSerialize: grpc.serialize<prediction_service_pb.PredictionResponse>;
    responseDeserialize: grpc.deserialize<prediction_service_pb.PredictionResponse>;
}

export const PapayaServiceService: IPapayaServiceService;

export interface IPapayaServiceServer {
    predict: grpc.handleUnaryCall<prediction_service_pb.PredictionRequest, prediction_service_pb.PredictionResponse>;
}

export interface IPapayaServiceClient {
    predict(request: prediction_service_pb.PredictionRequest, callback: (error: grpc.ServiceError | null, response: prediction_service_pb.PredictionResponse) => void): grpc.ClientUnaryCall;
    predict(request: prediction_service_pb.PredictionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: prediction_service_pb.PredictionResponse) => void): grpc.ClientUnaryCall;
    predict(request: prediction_service_pb.PredictionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: prediction_service_pb.PredictionResponse) => void): grpc.ClientUnaryCall;
}

export class PapayaServiceClient extends grpc.Client implements IPapayaServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public predict(request: prediction_service_pb.PredictionRequest, callback: (error: grpc.ServiceError | null, response: prediction_service_pb.PredictionResponse) => void): grpc.ClientUnaryCall;
    public predict(request: prediction_service_pb.PredictionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: prediction_service_pb.PredictionResponse) => void): grpc.ClientUnaryCall;
    public predict(request: prediction_service_pb.PredictionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: prediction_service_pb.PredictionResponse) => void): grpc.ClientUnaryCall;
}
