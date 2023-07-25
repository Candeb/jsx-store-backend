"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshController = exports.loginController = exports.registerController = exports.deleteUserController = exports.getAllUsersController = void 0;
const authLogic_1 = require("./authLogic");
const getAllUsersController = (res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, authLogic_1.getAllUsers)();
        console.log(result);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllUsersController = getAllUsersController;
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        yield (0, authLogic_1.deleteUserByEmail)(email);
        res.send('Usuario eliminado con éxito');
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteUserController = deleteUserController;
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const result = yield (0, authLogic_1.register)(name, email, password);
        res.json(result);
    }
    catch (err) {
        res.status(500).send(err);
        return;
    }
});
exports.registerController = registerController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const result = yield (0, authLogic_1.login)(email, password);
        res.json(result);
    }
    catch (err) {
        res.status(500).send(err);
        return;
    }
});
exports.loginController = loginController;
const refreshController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const header = req.headers.authorization;
    if (!header) {
        res
            .status(401)
            .json({ message: 'No autorizado: el token no está presente' });
        return;
    }
    const token = header.split(' ')[1];
    try {
        const result = yield (0, authLogic_1.refreshToken)(token);
        res.json(result);
        return;
    }
    catch (error) {
        res
            .status(500)
            .json({ message: 'No autorizado: el token no está presente' });
        return;
    }
});
exports.refreshController = refreshController;
