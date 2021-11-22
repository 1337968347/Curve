attribute vec3 position;
attribute vec3 normal;

varying vec3 fcolor;

uniform vec3 eye;
uniform vec3 color;

/// import "transform.glsl"

/// import "sunlight.glsl"

void main() {
    transform(position);

    vec3 eyeNormal = normalize(eye - worldPosition);
    fcolor = color * sunLight(normal, eyeNormal, 200.0, 0.7, 0.4);
}