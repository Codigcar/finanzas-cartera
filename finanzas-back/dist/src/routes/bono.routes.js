"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bono_controller_1 = require("../controllers/bono.controller");
const router = (0, express_1.Router)();
router.post('/', bono_controller_1.createBono);
// router.get('/', getHonorariesByUserId);
exports.default = router;
//# sourceMappingURL=bono.routes.js.map