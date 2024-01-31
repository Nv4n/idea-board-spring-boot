// @generated by protobuf-ts 2.9.3
// @generated from protobuf file "greet.proto" (package "proto.greet", syntax proto3)
// tslint:disable
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message proto.greet.Greeting
 */
export interface Greeting {
    /**
     * @generated from protobuf field: string first_name = 1;
     */
    firstName: string;
    /**
     * @generated from protobuf field: string last_name = 2;
     */
    lastName: string;
}
/**
 * @generated from protobuf message proto.greet.GreetRequest
 */
export interface GreetRequest {
    /**
     * @generated from protobuf field: proto.greet.Greeting greeting = 1;
     */
    greeting?: Greeting;
}
/**
 * @generated from protobuf message proto.greet.GreetResponse
 */
export interface GreetResponse {
    /**
     * @generated from protobuf field: string result = 1;
     */
    result: string;
}
// @generated message type with reflection information, may provide speed optimized methods
class Greeting$Type extends MessageType<Greeting> {
    constructor() {
        super("proto.greet.Greeting", [
            { no: 1, name: "first_name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "last_name", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<Greeting>): Greeting {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.firstName = "";
        message.lastName = "";
        if (value !== undefined)
            reflectionMergePartial<Greeting>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Greeting): Greeting {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string first_name */ 1:
                    message.firstName = reader.string();
                    break;
                case /* string last_name */ 2:
                    message.lastName = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: Greeting, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string first_name = 1; */
        if (message.firstName !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.firstName);
        /* string last_name = 2; */
        if (message.lastName !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.lastName);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message proto.greet.Greeting
 */
export const Greeting = new Greeting$Type();
// @generated message type with reflection information, may provide speed optimized methods
class GreetRequest$Type extends MessageType<GreetRequest> {
    constructor() {
        super("proto.greet.GreetRequest", [
            { no: 1, name: "greeting", kind: "message", T: () => Greeting }
        ]);
    }
    create(value?: PartialMessage<GreetRequest>): GreetRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        if (value !== undefined)
            reflectionMergePartial<GreetRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: GreetRequest): GreetRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* proto.greet.Greeting greeting */ 1:
                    message.greeting = Greeting.internalBinaryRead(reader, reader.uint32(), options, message.greeting);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: GreetRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* proto.greet.Greeting greeting = 1; */
        if (message.greeting)
            Greeting.internalBinaryWrite(message.greeting, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message proto.greet.GreetRequest
 */
export const GreetRequest = new GreetRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class GreetResponse$Type extends MessageType<GreetResponse> {
    constructor() {
        super("proto.greet.GreetResponse", [
            { no: 1, name: "result", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<GreetResponse>): GreetResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.result = "";
        if (value !== undefined)
            reflectionMergePartial<GreetResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: GreetResponse): GreetResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string result */ 1:
                    message.result = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: GreetResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string result = 1; */
        if (message.result !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.result);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message proto.greet.GreetResponse
 */
export const GreetResponse = new GreetResponse$Type();
/**
 * @generated ServiceType for protobuf service proto.greet.GreetService
 */
export const GreetService = new ServiceType("proto.greet.GreetService", [
    { name: "Greet", options: {}, I: GreetRequest, O: GreetResponse }
]);