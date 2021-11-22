precision highp float;

varying vec3 worldPosition;
varying float depth;
varying vec3 fTexCoord;

uniform vec3 eye;

/// import "sunlight.glsl"

void main() {

    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}