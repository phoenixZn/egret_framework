class EventListener
{
    private func: Function;
    private thisobj: any;
    private param: any

    constructor(func: Function, thisobj: any, param: any)
    {
        this.func = func;
        this.thisobj = thisobj;
        this.param = param;
    }

    public Exec(event: any)
    {
        this.func.apply(this.thisobj, [event, this.param]);
    }
};

class EventListeners
{
    private listeners: Array<EventListener> = new Array<EventListener>();
    private listeners_once: Array<EventListener> = new Array<EventListener>();

    constructor()
    {
    }

    public Add(func: (event: any, param: any) => void, thisobj: any, param: any, once: boolean)
    {
        if (once)
            this.listeners_once.push(new EventListener(func, thisobj, param));
        else
            this.listeners.push(new EventListener(func, thisobj, param));
    }

    public Exec(event: any)
    {
        for (let i of this.listeners_once)
            i.Exec(event);
        for (let i of this.listeners)
            i.Exec(event);
        this.listeners_once = new Array<EventListener>();
    }
};

class EventCenter
{
    private listeners: Map<number, EventListeners> = new Map<number, EventListeners>();

    constructor()
    {
    }

    public Listen(id: number, func: (event: any, param: any) => void, thisobj: any, param?: any)
    {
        if (!this.listeners.get(id))
            this.listeners.set(id, new EventListeners);
        this.listeners.get(id).Add(func, thisobj, param, false);
    }
    public ListenOnce(id: number, func: (event: any, param: any) => void, thisobj: any, param?: any)
    {
        if (!this.listeners.get(id))
            this.listeners.set(id, new EventListeners);
        this.listeners.get(id).Add(func, thisobj, param, true);
    }

    public Trigger(id: number, event: any)
    {
        if (this.listeners.get(id))
            this.listeners.get(id).Exec(event);
    }

    public Update()
    {
    }
};
