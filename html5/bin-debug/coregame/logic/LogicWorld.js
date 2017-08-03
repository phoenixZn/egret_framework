var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var LogicWorld = (function (_super) {
    __extends(LogicWorld, _super);
    function LogicWorld() {
        var _this = _super.call(this) || this;
        _this.m_object = _this;
        _this.m_render_messages = new Array();
        _this.m_entity_manager = new EntityManager(_this);
        _this.m_command_handler = new BubbleCommandHandler(_this);
        return _this;
    }
    //////////////////////////////////////////////////////////////////////////////////
    // ComposableObject
    LogicWorld.prototype.PreInitialize = function (context) {
        _super.prototype.PreInitialize.call(this, context);
        //this.m_command_handler = <ICommandHandler>worldcontext.m_custom_datas.get("CommandHandler");
    };
    LogicWorld.prototype.Init = function (worldcontext) {
        this.m_world_context = worldcontext;
        this.AddComponent(GameModeComponent);
    };
    LogicWorld.prototype.Update = function () {
        this.UpdateComponents();
        this.m_entity_manager.Update();
    };
    LogicWorld.prototype.HandleCommands = function (cmds) {
        var _this = this;
        cmds.forEach(function (element) {
            _this.m_command_handler.Handle(element);
        });
    };
    LogicWorld.prototype.Prepare = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, context;
            return __generator(this, function (_b) {
                for (_i = 0, _a = this.m_world_context.m_entities; _i < _a.length; _i++) {
                    context = _a[_i];
                    context.m_custom_datas.set("LogicWorld", this);
                    this.m_entity_manager.CreateObject(context);
                }
                return [2 /*return*/];
            });
        });
    };
    LogicWorld.prototype.Start = function () {
    };
    LogicWorld.prototype.GetEntityManager = function () {
        return this.m_entity_manager;
    };
    LogicWorld.prototype.GetWorldCreationContext = function () {
        return this.m_world_context;
    };
    ///////////////////////////////////////////////////////////////////////////
    // IRenderMessageGenerator
    LogicWorld.prototype.CanGenerateRenderMessage = function () {
        return true;
    };
    LogicWorld.prototype.AddRenderMessage = function (render_message) {
        this.m_render_messages.push(render_message);
    };
    LogicWorld.prototype.AddSimpleRenderMessage = function (type, entity_id, simple_data) {
        // SimpleRenderMessage render_message = RenderMessage.Create<SimpleRenderMessage>();
        // render_message.Construct(type, entity_id, simple_data);
        // m_render_messages.Add(render_message);
        this.m_render_messages.push(new SimpleRenderMessage(type, entity_id, simple_data));
    };
    LogicWorld.prototype.GetAllRenderMessages = function () {
        return this.m_render_messages;
    };
    LogicWorld.prototype.ClearRenderMessages = function () {
        this.m_render_messages.splice(0);
    };
    return LogicWorld;
}(ComposableObject));
__reflect(LogicWorld.prototype, "LogicWorld", ["IRenderMessageGenerator"]);
//# sourceMappingURL=LogicWorld.js.map