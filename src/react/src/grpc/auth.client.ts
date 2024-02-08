// @generated by protobuf-ts 2.9.3
// @generated from protobuf file "auth.proto" (package "proto.auth", syntax proto3)
// tslint:disable
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { AuthService } from "./auth";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { AuthResponse } from "./auth";
import type { UserDTO } from "./auth";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service proto.auth.AuthService
 */
export interface IAuthServiceClient {
    /**
     * @generated from protobuf rpc: register(proto.auth.UserDTO) returns (proto.auth.AuthResponse);
     */
    register(input: UserDTO, options?: RpcOptions): UnaryCall<UserDTO, AuthResponse>;
    /**
     * @generated from protobuf rpc: login(proto.auth.UserDTO) returns (proto.auth.AuthResponse);
     */
    login(input: UserDTO, options?: RpcOptions): UnaryCall<UserDTO, AuthResponse>;
}
/**
 * @generated from protobuf service proto.auth.AuthService
 */
export class AuthServiceClient implements IAuthServiceClient, ServiceInfo {
    typeName = AuthService.typeName;
    methods = AuthService.methods;
    options = AuthService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * @generated from protobuf rpc: register(proto.auth.UserDTO) returns (proto.auth.AuthResponse);
     */
    register(input: UserDTO, options?: RpcOptions): UnaryCall<UserDTO, AuthResponse> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<UserDTO, AuthResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: login(proto.auth.UserDTO) returns (proto.auth.AuthResponse);
     */
    login(input: UserDTO, options?: RpcOptions): UnaryCall<UserDTO, AuthResponse> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<UserDTO, AuthResponse>("unary", this._transport, method, opt, input);
    }
}
