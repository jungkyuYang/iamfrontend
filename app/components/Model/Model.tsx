import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Fisheye, OrbitControls, Environment, Html } from '@react-three/drei'

import { Frame, Dog, Camera, Cactus, Box } from './Scene'
import { Annotations, Tween } from './Annotations'
import CameraPostionLogger from '../../utils/CameraPositionLogger'

function Model() {
	const ref = useRef(null)

	return (
		<Canvas flat camera={{ position: [23, 16, 20] }}>
			<Suspense fallback={'..loading'}>
				<Fisheye zoom={0}>
					<OrbitControls
						ref={ref}
						target={[8, 2, 3]}
						minPolarAngle={0}
						maxPolarAngle={Math.PI / 1.6}
					/>
					<ambientLight intensity={Math.PI / 2} />
					<group scale={20} position={[5, -11, -5]}>
						<Frame />
						<Dog />
						<Camera />
						<Cactus />
						<Box position={[-0.8, 1.4, 0.4]} scale={0.15} />
					</group>
					<Annotations controls={ref} />
					<Tween />
					<CameraPostionLogger event="mousedown" />
					<Environment preset="forest" background blur={2} />
				</Fisheye>
			</Suspense>
		</Canvas>
	)
}

export default Model
