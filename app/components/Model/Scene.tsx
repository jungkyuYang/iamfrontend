import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshWobbleMaterial, useGLTF } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'

interface MySpringProps {
	rotation: [number, number, number]
}

const Frame = () => {
	const { nodes } = useGLTF('/models/level-react-draco.glb')

	if (!nodes.Level || !(nodes.Level instanceof THREE.Mesh)) {
		return null // 'Level' 객체를 찾지 못하거나 Mesh 타입이 아닌 경우 컴포넌트를 렌더링하지 않음
	}

	return (
		<mesh
			geometry={nodes.Level.geometry}
			material={nodes.Level.material}
			position={[-0.38, 0.69, 0.62]}
			rotation={[Math.PI / 2, -Math.PI / 9, 0]}
		/>
	)
}

const Dog = () => {
	const { nodes } = useGLTF('/models/level-react-draco.glb')
	const [spring, api] = useSpring(
		() => ({ rotation: [Math.PI / 2, 0, 0.29], config: { friction: 40 } }),
		[],
	)

	useEffect(() => {
		let timeout: ReturnType<typeof setTimeout> | null = null
		const wander = () => {
			api.start({
				rotation: [
					Math.PI / 2 + THREE.MathUtils.randFloatSpread(2) * 0.3,
					0,
					0.29 + THREE.MathUtils.randFloatSpread(2) * 0.2,
				],
			})
			timeout = setTimeout(wander, (1 + Math.random() * 2) * 800)
		}
		wander()

		return () => {
			if (timeout !== null) {
				clearTimeout(timeout)
			}
		}
	}, [api])
	if (
		!nodes.Sudo ||
		!nodes.SudoHead ||
		!(nodes.Sudo instanceof THREE.Mesh) ||
		!(nodes.SudoHead instanceof THREE.Mesh)
	) {
		return null
	}

	return (
		<>
			<mesh
				geometry={nodes.Sudo.geometry}
				material={nodes.Sudo.material}
				position={[0.68, 0.33, -0.67]}
				rotation={[Math.PI / 2, 0, 0.29]}
			/>
			<a.mesh
				geometry={nodes.SudoHead.geometry}
				material={nodes.SudoHead.material}
				position={[0.68, 0.33, -0.67]}
				{...(spring as Omit<MySpringProps, 'rotation'>)}
			/>
		</>
	)
}

const Camera = () => {
	const { nodes, materials } = useGLTF('/models/level-react-draco.glb')
	const [spring, api] = useSpring(() => ({ 'rotation-z': 0, config: { friction: 40 } }), [])

	useEffect(() => {
		let timeout: ReturnType<typeof setTimeout> | null = null
		const wander = () => {
			api.start({ 'rotation-z': Math.random() })
			timeout = setTimeout(wander, (1 + Math.random() * 2) * 800)
		}
		wander()

		return () => {
			if (timeout !== null) {
				clearTimeout(timeout)
			}
		}
	}, [api])

	if (
		!nodes.Camera ||
		!nodes.Camera_1 ||
		!(nodes.Camera instanceof THREE.Mesh) ||
		!(nodes.Camera_1 instanceof THREE.Mesh)
	) {
		return null
	}

	return (
		<a.group position={[-0.58, 0.83, -0.03]} rotation={[Math.PI / 2, 0, 0.47]} {...spring}>
			<mesh geometry={nodes.Camera.geometry} material={nodes.Camera.material} />
			<mesh geometry={nodes.Camera_1.geometry} material={materials.Lens} />
		</a.group>
	)
}

const Cactus = () => {
	const { nodes, materials } = useGLTF('/models/level-react-draco.glb')

	if (
		!nodes.Cactus ||
		!(nodes.Cactus instanceof THREE.Mesh) ||
		!(materials.Cactus instanceof THREE.MeshStandardMaterial)
	) {
		return null
	}

	return (
		<mesh
			geometry={nodes.Cactus.geometry}
			position={[-0.42, 0.51, -0.62]}
			rotation={[Math.PI / 2, 0, 0]}
		>
			<MeshWobbleMaterial factor={0.4} map={materials.Cactus.map} />
		</mesh>
	)
}

const Box = ({ scale = 1, ...props }) => {
	const ref = useRef<THREE.Mesh>(null)
	const [hovered, hover] = useState(false)
	const [clicked, click] = useState(false)
	useFrame((state, delta) => {
		if (ref.current) {
			ref.current.rotation.x = ref.current.rotation.y += delta
		}
	})

	return (
		<mesh
			{...props}
			ref={ref}
			scale={(clicked ? 1.5 : 1) * scale}
			onClick={() => click(!clicked)}
			onPointerOver={event => (event.stopPropagation(), hover(true))}
			onPointerOut={event => hover(false)}
		>
			<boxGeometry />
			<meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
		</mesh>
	)
}

export { Frame, Dog, Camera, Cactus, Box }
