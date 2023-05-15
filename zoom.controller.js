"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoomController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const paginated_dto_1 = require("../dataObjects/dto/paginated.dto");
const pagination_params_dto_1 = require("../dataObjects/dto/pagination-params.dto");
const zoom_service_1 = require("./zoom.service");
const zoom_dto_1 = require("../dataObjects/dto/zoom.dto");
const axios_1 = require("axios");
const zoomConfig_1 = require("./zoomConfig");
let ZoomController = class ZoomController {
    constructor(_zoomService) {
        this._zoomService = _zoomService;
    }
    async getZoomMeetingInvitation(req, meetingId) {
        const token = req.headers.authorization.replace('Bearer ', '');
        const apiUrl = `https://api.zoom.us/v2/meetings/${meetingId}`;
        try {
            const response = await axios_1.default.get(apiUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                    'X-Api-Key': zoomConfig_1.zoomConfig.apiKey,
                    'X-Api-Secret': zoomConfig_1.zoomConfig.apiSecret,
                },
            });
            const { join_url } = response.data;
            return { url: join_url };
        }
        catch (error) {
            console.error('Error retrieving Zoom meeting URL:', error.message);
            throw error;
        }
    }
    async create(req, createDto) {
        createDto.created_user = req.user.tokenDetails.uuid;
        createDto.created_date = new Date();
        return this._zoomService.create(createDto);
    }
    async findAll(req, { skip, limit }) {
        const query = {
            $and: [{ isDeleted: false }],
        };
        return this._zoomService.findAll(query, { skip, limit });
    }
    findOne(req, uuid) {
        const query = {
            $and: [{ uuid: uuid, isDeleted: false }],
        };
        return this._zoomService.findOne(query);
    }
    update(req, uuid, updateDto) {
        const query = {
            $and: [{ uuid: uuid, isDeleted: false }],
        };
        updateDto.modified_user = req.user.tokenDetails.uuid;
        return this._zoomService.update(query, updateDto);
    }
    delete(req, uuid) {
        const query = {
            $and: [{ uuid: uuid, isDeleted: false }],
        };
        return this._zoomService.delete(query, req.user.tokenDetails.uuid);
    }
};
__decorate([
    (0, common_1.Get)('meeting'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('meetingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ZoomController.prototype, "getZoomMeetingInvitation", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, zoom_dto_1.ZoomDto]),
    __metadata("design:returntype", Promise)
], ZoomController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_params_dto_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], ZoomController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':uuid'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ZoomController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':uuid'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('uuid')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ZoomController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':uuid'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ZoomController.prototype, "delete", null);
ZoomController = __decorate([
    (0, swagger_1.ApiTags)('api/zoom'),
    (0, common_1.Controller)('api/zoom'),
    (0, swagger_1.ApiExtraModels)(paginated_dto_1.PaginatedDto),
    __metadata("design:paramtypes", [zoom_service_1.ZoomService])
], ZoomController);
exports.ZoomController = ZoomController;
//# sourceMappingURL=zoom.controller.js.map