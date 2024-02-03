import { CanvasBuilder } from "./builder"

export class CanvasManager {
    public canvases: Map<string, CanvasBuilder>
  
    constructor() {
      this.canvases = new Map()
    }
  
    public create = (name: string, width: number, height: number) => {
      this.canvases.set(name, new CanvasBuilder(width, height))
    }
  
    public remove = (name: string) => {
      this.canvases.delete(name)
    }
  
    public set = (name: string, canvas: CanvasBuilder) => {
      if (!this.canvases.has(name))
        return;
  
      this.canvases.set(name, canvas)
    }
  
    public get = (name: string) => {
      if (!this.canvases.has(name))
        return;
  
      return this.canvases.get(name)
    }
  
    public all = () => {
      return this.canvases
    }
}