

class Operation
{
    public opType : int;
    public x : int;
    public y : int;
}

interface IOperationHandler
{
    HandleOperation(op : Operation) : boolean;
}


interface IJoystack
{
    CurDir() : egret.Point;
}