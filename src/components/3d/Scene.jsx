import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Color } from 'three';
import * as THREE from 'three';
import { useOS } from '../../context/OSContext';

// --- Gradient Shader ---
const GradientShader = {
    uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new Color('#000000') },
        uColor2: { value: new Color('#1a0b2e') },
        uColor3: { value: new Color('#431259') },
        uThemeColor: { value: new Color('#007bff') }
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform vec3 uThemeColor;
    varying vec2 vUv;

    // Simplex noise function
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ; m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      float noise = snoise(vUv * 3.0 + uTime * 0.1);
      
      // Dynamic color mixing based on time and theme
      vec3 c1 = mix(uColor1, uThemeColor, 0.2 * sin(uTime * 0.2));
      vec3 c2 = mix(uColor2, uThemeColor, 0.3 * cos(uTime * 0.3));
      
      vec3 color = mix(c1, c2, vUv.y + noise * 0.2);
      color = mix(color, uColor3, vUv.x + noise * 0.2);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `,
};

const BackgroundPlane = ({ themeColor }) => {
    const mesh = useRef();
    const { viewport } = useThree();

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uColor1: { value: new Color('#0f0c29') },
            uColor2: { value: new Color('#302b63') },
            uColor3: { value: new Color('#24243e') },
            uThemeColor: { value: new Color(themeColor) }
        }),
        []
    );

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
            mesh.current.material.uniforms.uThemeColor.value.set(themeColor);
        }
    });

    return (
        <mesh ref={mesh} scale={[viewport.width * 2, viewport.height * 2, 1]} position={[0, 0, -10]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={GradientShader.vertexShader}
                fragmentShader={GradientShader.fragmentShader}
                depthWrite={false}
            />
        </mesh>
    );
};

// --- Particles ---
const Particles = ({ count = 1000, themeColor }) => {
    const mesh = useRef();
    const { viewport, mouse } = useThree();

    const dummy = useMemo(() => new THREE.Object3D(), []);
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -50 + Math.random() * 100;
            const yFactor = -50 + Math.random() * 100;
            const zFactor = -50 + Math.random() * 100;
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
            t = particle.t += speed / 2;
            const a = particle.mx += (mouse.x * viewport.width - particle.mx) * 0.1;
            const b = particle.my += (mouse.y * viewport.height - particle.my) * 0.1;

            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            );

            const s = Math.cos(t);
            dummy.scale.set(s, s, s);
            dummy.rotation.set(s * 5, s * 5, s * 5);
            dummy.updateMatrix();

            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
        // mesh.current.material.color.set(themeColor); // Update material color
    });

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <dodecahedronGeometry args={[0.2, 0]} />
            <meshPhongMaterial color={themeColor} emissive="#000000" specular="#ffffff" shininess={10} transparent opacity={0.8} />
        </instancedMesh>
    );
};

const Scene = () => {
    const { themeColor } = useOS();

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, background: '#000' }}>
            <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} color={themeColor} intensity={0.5} />

                <BackgroundPlane themeColor={themeColor} />
                <Particles count={800} themeColor={themeColor} />

                <fog attach="fog" args={['#000', 20, 60]} />
            </Canvas>
        </div>
    );
};

export default Scene;
