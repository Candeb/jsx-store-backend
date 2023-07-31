"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
var getAcessToken = function () {
    if (process.env.ACCESS_TOKEN_SECRET) {
        return process.env.ACCESS_TOKEN_SECRET;
    }
    throw new Error('ACCES TOKEN SECRET NOT PRESENT');
};
var getRefreshToken = function () {
    if (process.env.REFRESH_TOKEN_SECRET) {
        return process.env.REFRESH_TOKEN_SECRET;
    }
    throw new Error('REFRESH TOKEN SECRET NOT PRESENT');
};
var config = null;
var getConfig = function () {
    if (config) {
        return config;
    }
    config = {
        accesTokenSecret: getAcessToken(),
        refreshTokenSecret: getRefreshToken(),
    };
    return config;
};
exports.getConfig = getConfig;
