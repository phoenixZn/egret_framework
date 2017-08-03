var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ComposableObject = (function () {
    function ComposableObject() {
        this.m_components = new Map();
        this.m_update_components = new Array();
    }
    ComposableObject.prototype.Destruct = function () {
        this.m_components.forEach(function (value, key, map) {
            value.Destruct();
        });
        this.m_components.clear();
        this.OnDestruct();
    };
    ComposableObject.prototype.OnDestruct = function () {
        this.m_context = null;
    };
    Object.defineProperty(ComposableObject.prototype, "ID", {
        get: function () {
            return this.m_context.m_object_id;
        },
        enumerable: true,
        configurable: true
    });
    ComposableObject.prototype.GetCreationContext = function () {
        return this.m_context;
    };
    ComposableObject.prototype.Initialize = function (context) {
        egret.log("PreInitialize");
        this.PreInitialize(context);
        egret.log("InitializeComponents");
        this.InitializeComponents(context);
        egret.log("PostInitialize");
        this.PostInitialize(context);
    };
    ComposableObject.prototype.PreInitialize = function (context) {
        this.m_context = context;
    };
    ComposableObject.prototype.InitializeComponents = function (context) {
        var components_data = context.m_type_data.m_components_data;
        for (var _i = 0, components_data_1 = components_data; _i < components_data_1.length; _i++) {
            var data = components_data_1[_i];
            this.AddComponentFromData(data);
        }
        this.m_components.forEach(function (value, key, map) {
            value.InitializeComponent();
        });
        this.m_components.forEach(function (value, key, map) {
            value.PostInitializeComponent();
        });
    };
    ComposableObject.prototype.PostInitialize = function (context) {
    };
    ComposableObject.prototype.AddComponentFromData = function (component_data) {
        var component_type_id = component_data.m_component_type_id;
        if (!this.IsSuitableComponent(component_type_id))
            return null;
        var component = ComponentTypeRegistry.CreateComponent(component_type_id);
        if (component == null)
            return null;
        this.m_components.set(component_type_id, component);
        if (component["Update"] instanceof Function) {
            this.m_update_components.push(component);
        }
        if (component_data.m_component_variables != null)
            component.PreInitialize(component_type_id, this.m_object, component_data.m_component_variables);
        return component;
    };
    ComposableObject.prototype.IsSuitableComponent = function (component_type_id) {
        return true;
    };
    //不通过数据驱动，直接加组件
    ComposableObject.prototype.AddComponent = function (cmptType, variables) {
        if (variables === void 0) { variables = null; }
        var component_type_id = CRC.CalculateString(cmptType.toString());
        var component = new cmptType();
        this.m_components.set(component_type_id, component);
        if (component["Update"] instanceof Function) {
            this.m_update_components.push(component);
        }
        component.PreInitialize(component_type_id, this.m_object, variables);
        component.InitializeComponent();
        component.PostInitializeComponent();
    };
    ComposableObject.prototype.GetComponent = function (t) {
        var component_type_id = CRC.CalculateString(t.toString());
        return this.m_components.get(component_type_id);
    };
    ComposableObject.prototype.UpdateComponents = function () {
        for (var _i = 0, _a = this.m_update_components; _i < _a.length; _i++) {
            var component = _a[_i];
            component["Update"]();
        }
    };
    ComposableObject.prototype.HasUpdateComponents = function () {
        return this.m_update_components != null && this.m_update_components.length > 0;
    };
    return ComposableObject;
}());
__reflect(ComposableObject.prototype, "ComposableObject");
//# sourceMappingURL=Object.js.map