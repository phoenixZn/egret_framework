class BubbleCoreGameFactory implements ICoreGameFactory
{
    private m_config: BubbleObjectConfig;

    public GetObjectTypeData(id : int) : ObjectTypeData 
    {
        return this.m_config.GetObjectTypeData(id);
    }

    public GetObjectProtoData(id : int) : ObjectProtoData
    {
        return this.m_config.GetObjectProtoData(id);
    }

    public CreateLogicWorld() : LogicWorld
    {
        return new BubbleLogicWorld();
    }

    public CreateRenderWorld() : RenderWorld
    {
        return new BubbleRenderWorld();
    }

    public RegisterComponents() : void
    {
        ComponentTypeRegistry.Clear();

        //ComponentRegistry
        let category = CmptSuitableCategory.LogicWorld;
        ComponentTypeRegistry.Register(GameModeComponent, category);

        category = CmptSuitableCategory.LogicEntity;
		ComponentTypeRegistry.Register(PositionComponent, category);
		ComponentTypeRegistry.Register(PlayerComponent, category);
		ComponentTypeRegistry.Register(BlackboardComponent, category);
        ComponentTypeRegistry.Register(ActorCmpt, category);
        ComponentTypeRegistry.Register(ActorMoveCtrlCmpt, category);
        
        category = CmptSuitableCategory.RenderWorld;
		ComponentTypeRegistry.Register(ViewComponent, category);
		ComponentTypeRegistry.Register(RenderEntityManager, category);


        category = CmptSuitableCategory.RenderEntity;
		ComponentTypeRegistry.Register(ModelComponent, category);
		ComponentTypeRegistry.Register(AnimationComponent, category);
		ComponentTypeRegistry.Register(ActorRenderCmpt, category);
        ComponentTypeRegistry.Register(UILocalCtrlCmpt, category);


        this.m_config = new BubbleObjectConfig();

    }
    public RegisterCommands() : void
    {
        //TODO:  Use ResuableObjectPool
    }
    public RegisterRenderMessages() : void
    {
        //TODO:  Use ResuableObjectPool
    }


    public CreateWorldCreationContext(init_info : CoreGameInitInfo) : WorldCreationContext
    {
        let world_context = new WorldCreationContext();

        let login = GameGlobal.GameLogic.ModuleManager.GetModule(LoginModule);
        for(let pstid of init_info.player_pstids)
        {
            let isLocal : boolean = pstid.equals(login.Pstid())
            if (isLocal)
            {
                let obj_context = new ObjectCreationContext();
                obj_context.m_type_data = this.GetObjectTypeData(BubbleObjectConfig.LocalActorEntityID);
                obj_context.m_proto_data = this.GetObjectProtoData(BubbleObjectConfig.MusicBoyProtoID);
                obj_context.m_custom_datas.set("ActorName", pstid.toString());
                obj_context.m_custom_datas.set("Pos", new egret3d.Vector3D(0,0,0));
                obj_context.m_custom_datas.set("IsLocal", true);
                world_context.m_entities.push(obj_context);
            }
            else
            {
                let obj_context = new ObjectCreationContext();
                obj_context.m_type_data = this.GetObjectTypeData(BubbleObjectConfig.NetActorEntityID);
                obj_context.m_proto_data = this.GetObjectProtoData(BubbleObjectConfig.MusicBoyProtoID);
                obj_context.m_custom_datas.set("ActorName", pstid.toString());
                obj_context.m_custom_datas.set("Pos", new egret3d.Vector3D(1,0,0));
                world_context.m_entities.push(obj_context);
            }
        }

        return world_context;
    }

}


