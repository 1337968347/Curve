/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface AppRoot {
    }
    interface CyCoordinate {
        "controlPoints": Array<Array<number>>;
        "height": number;
        "points": Array<Array<number>>;
        "width": number;
    }
}
declare global {
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLCyCoordinateElement extends Components.CyCoordinate, HTMLStencilElement {
    }
    var HTMLCyCoordinateElement: {
        prototype: HTMLCyCoordinateElement;
        new (): HTMLCyCoordinateElement;
    };
    interface HTMLElementTagNameMap {
        "app-root": HTMLAppRootElement;
        "cy-coordinate": HTMLCyCoordinateElement;
    }
}
declare namespace LocalJSX {
    interface AppRoot {
    }
    interface CyCoordinate {
        "controlPoints"?: Array<Array<number>>;
        "height"?: number;
        "points"?: Array<Array<number>>;
        "width"?: number;
    }
    interface IntrinsicElements {
        "app-root": AppRoot;
        "cy-coordinate": CyCoordinate;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "cy-coordinate": LocalJSX.CyCoordinate & JSXBase.HTMLAttributes<HTMLCyCoordinateElement>;
        }
    }
}
