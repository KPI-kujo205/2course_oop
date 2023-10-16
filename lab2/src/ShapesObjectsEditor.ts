import Shape from "./shapes/Shape.ts";
import EllipsisEditor from "./editors/EllipsisEditor.ts";
import ShapeEditor from "./editors/ShapeEditor.ts";
import RectangleEditor from "./editors/RectangleEditor.ts";
import LineEditor from "./editors/LineEditor.ts";
import PointEditor from "./editors/PointEditor.ts";

enum EditorType{
    RectangleEditor,
    EllipsisEditor,
    LineEditor,
    PointEditor
}

const EditorTypeMapper:Record<EditorType, string> = {
    [EditorType.RectangleEditor]:'Прямокутник',
    [EditorType.EllipsisEditor]:'Еліпс',
    [EditorType.LineEditor]:'Лінія',
    [EditorType.PointEditor]:'Крапка'
}
class ShapesObjectEditor{
    private ctx:CanvasRenderingContext2D;
    private editor!:ShapeEditor;
    constructor(public shapes:Shape[]=[]) {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const menu= document.getElementById('objects_menu') as HTMLSelectElement;
        this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        this.configureEditor(+menu.value as EditorType)

        menu.addEventListener('change',(_)=> this.configureEditor(+menu.value as EditorType))
        canvas.addEventListener('mousedown',(e)=>this.editor.onPaintStart(e))
        canvas.addEventListener('mousemove', (e)=>{
            this.repaint();
            this.editor.onMouseMove(e)
        })
        canvas.addEventListener('mouseup',(e)=> {
            this.shapes.push(this.editor.onPaintEnd(e))
        })
    }
    repaint(){
        this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height)
        for (const shape of this.shapes) {
            shape.paint(this.ctx);
        }
    }

    configureEditor(type:EditorType){
        switch (type) {
            case EditorType.RectangleEditor:
                this.editor = new RectangleEditor(this.ctx);
                break;
            case EditorType.EllipsisEditor:
                this.editor = new EllipsisEditor(this.ctx);
                break;
            case EditorType.LineEditor:
                this.editor = new LineEditor(this.ctx);
                break;
            case EditorType.PointEditor:
                this.editor = new PointEditor(this.ctx);
                break;
        }

        const typeField=document.getElementById('object_mode') as HTMLSpanElement;
        typeField.innerHTML=EditorTypeMapper[type];
    }


}
export default ShapesObjectEditor;
