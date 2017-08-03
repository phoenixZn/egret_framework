
class BubbleSetting
{
    static CoreGameSettingInit() : void
    {

    }


    static RenderWorldCreationContext(world : RenderWorld) : ObjectCreationContext
    {
        let context : ObjectCreationContext = new ObjectCreationContext();
		context.m_custom_datas.set("LogicWorld", world.GetLogicWorld())
        return context;
    }

}

class ModeRule
{

}