// package: papaya
// file: prediction-service.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class PredictionRequest extends jspb.Message { 
    getImage(): Uint8Array | string;
    getImage_asU8(): Uint8Array;
    getImage_asB64(): string;
    setImage(value: Uint8Array | string): PredictionRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PredictionRequest.AsObject;
    static toObject(includeInstance: boolean, msg: PredictionRequest): PredictionRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PredictionRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PredictionRequest;
    static deserializeBinaryFromReader(message: PredictionRequest, reader: jspb.BinaryReader): PredictionRequest;
}

export namespace PredictionRequest {
    export type AsObject = {
        image: Uint8Array | string,
    }
}

export class PredictionResponse extends jspb.Message { 
    getLabel(): string;
    setLabel(value: string): PredictionResponse;
    getConfidence(): number;
    setConfidence(value: number): PredictionResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PredictionResponse.AsObject;
    static toObject(includeInstance: boolean, msg: PredictionResponse): PredictionResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PredictionResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PredictionResponse;
    static deserializeBinaryFromReader(message: PredictionResponse, reader: jspb.BinaryReader): PredictionResponse;
}

export namespace PredictionResponse {
    export type AsObject = {
        label: string,
        confidence: number,
    }
}
