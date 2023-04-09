"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
const express = require("express");
const path = require('path');
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    var bodyParser = require('body-parser');
    app.use(express.static(path.join(__dirname, '../')));
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(bodyParser.urlencoded({ limit: "500mb", extended: true, parameterLimit: 50000 }));
    await app.listen(process.env.PORT_SERVER);
}
bootstrap();
//# sourceMappingURL=main.js.map