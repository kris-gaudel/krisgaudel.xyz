import React, {useRef} from 'react';
import { Canvas, useFrame, Vector3 } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Group } from "three";

type IDodecahedronProps = {
  message: String;
  path: "/about" | "/resume" | "/connect";
  position: Vector3;
};

const Dodecahedron: React.FC<IDodecahedronProps> = ({message, path, position}: IDodecahedronProps) => {
  return (
    <mesh position={position}>
      <icosahedronGeometry />
      <meshStandardMaterial roughness={0.75} emissive="#404057" />
      <Html distanceFactor={10}>
        <div className="content">
          <a href={path}>{message}</a>
        </div>
      </Html>
    </mesh>
  )
}

const Content: React.FC = () => {
  const ref = useRef<Group>(null!);  
  useFrame(() => (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += 0.005));

  return (
    <group ref={ref}>
      <Dodecahedron message="About" path="/about" position={[-2, 0, 0]} />
      <Dodecahedron message="Resume"  path="/resume" position={[0, -2, -3]} />
      <Dodecahedron message="Connect" path="/connect" position={[2, 0, 0]} />
    </group>
  )
}

const App: React.FC = () => {
  return (
    <>
     <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 7.5] }}>
      <pointLight color="indianred" />
      <pointLight position={[10, 10, -10]} color="orange" />
      <pointLight position={[-10, -10, 10]} color="lightblue" />
      <Content />
     </Canvas>
    </>
  )
}

export default App;
