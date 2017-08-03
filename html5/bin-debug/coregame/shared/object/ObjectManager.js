var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var IDGenerator = (function () {
    function IDGenerator(first_id) {
        this.m_next_id = 0;
        this.m_next_id = first_id;
    }
    IDGenerator.prototype.Destruct = function () {
        this.m_next_id = 0;
    };
    IDGenerator.prototype.GenID = function () {
        return this.m_next_id++;
    };
    return IDGenerator;
}());
__reflect(IDGenerator.prototype, "IDGenerator");
var ObjectManager = (function () {
    function ObjectManager(logic_world, first_id) {
        this.m_objects = new Map();
        //protected m_named_objects : Map<string, TObject> = new Map<string, TObject>();
        this.m_is_dirty = false;
        this.m_logic_world = logic_world;
        this.m_id_generator = new IDGenerator(first_id);
    }
    ObjectManager.prototype.Destruct = function () {
        var _this = this;
        this.m_objects.forEach(function (value, key, map) {
            _this.PreDestroyObject(value);
            value.Destruct();
        });
        this.m_objects.clear();
        //this.m_named_objects.clear();
        this.m_logic_world = null;
        this.m_id_generator.Destruct();
    };
    Object.defineProperty(ObjectManager.prototype, "Dirty", {
        get: function () {
            return this.m_is_dirty;
        },
        set: function (value) {
            this.m_is_dirty = value;
        },
        enumerable: true,
        configurable: true
    });
    ObjectManager.prototype.GetObject = function (object_id) {
        return this.m_objects.get(object_id);
    };
    // public GetObjectByName(name : string) : TObject
    // {
    //     return this.m_named_objects[name];
    // }
    ObjectManager.prototype.CreateObject = function (context) {
        if (context.m_object_id < 0) {
            var id = this.m_id_generator.GenID();
            context.m_object_id = id;
        }
        var obj = this.CreateObjectInstance(context);
        this.m_objects.set(context.m_object_id, obj);
        // if (context.m_name != null && context.m_name.Length > 0)
        //     this.m_named_objects[context.m_name] = obj;
        obj.Initialize(context);
        this.AfterObjectCreated(obj);
        this.m_is_dirty = true;
        return obj;
    };
    ObjectManager.prototype.AfterObjectCreated = function (obj) {
    };
    ObjectManager.prototype.DestroyObject = function (object_id) {
        var obj = this.m_objects.get(object_id);
        if (typeof obj == "undefined")
            return;
        // name : string = obj.Name;
        // if (name != null && name.Length > 0)
        //     m_named_objects.Remove(name);
        this.PreDestroyObject(obj);
        obj.Destruct();
        this.m_objects.delete(object_id);
        this.m_is_dirty = true;
    };
    ObjectManager.prototype.PreDestroyObject = function (obj) {
    };
    ObjectManager.prototype.GetAllObjects = function () {
        return this.m_objects;
    };
    ObjectManager.prototype.Update = function () {
        this.m_objects.forEach(function (value, key, map) {
            value.UpdateComponents();
        });
    };
    return ObjectManager;
}());
__reflect(ObjectManager.prototype, "ObjectManager");
//# sourceMappingURL=ObjectManager.js.map