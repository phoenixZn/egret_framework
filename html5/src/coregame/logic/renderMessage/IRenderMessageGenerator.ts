interface IRenderMessageGenerator
{
    CanGenerateRenderMessage() : boolean;
    AddRenderMessage(render_message : RenderMessage) : void;
    AddSimpleRenderMessage(type : int, entity_id : int, simple_data : int) : void;
    GetAllRenderMessages() : Array<RenderMessage>;
    ClearRenderMessages() : void;
}