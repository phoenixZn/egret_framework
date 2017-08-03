class EntityComponent extends GameComponent<Entity>
{

    public GetOwnerPlayerID() : int
    {
        return 0;
    }

    public GetOwnerEntityID() : int
    {
        return this.m_owner.ID;
    }

    public GetOwnerEntity() : Entity
    {
        return this.m_owner;
    }

    public GetLogicWorld() : LogicWorld
    {
        return this.m_owner.GetLogicWorld();
    }
}