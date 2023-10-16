import Shape from "../shapes/Shape.ts";

abstract class ShapeEditor{
    abstract onPaintStart(e:MouseEvent): void;
    abstract onMouseMove(e:MouseEvent): void;
    abstract onPaintEnd(e:MouseEvent): Shape;
    abstract paint(): void;
}

export default ShapeEditor
