import { useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import TWEEN from '@tweenjs/tween.js'

import annotations from '../../../../public/json/annotations.json'
import './annotations.scss'
import Presentation from '../../Presentation/Presentation'

interface AnnotationsProps {
	controls: React.MutableRefObject<{
		target: {
			x: number
			y: number
			z: number
		}
	} | null>
}

function Annotations({ controls }: AnnotationsProps) {
	const { camera } = useThree()
	const [selected, setSelected] = useState(-1)

	const handleAnnotationClick = (annotation: any, index: number) => {
		setSelected(index)
		if (controls.current !== null) {
			// change target
			new TWEEN.Tween(controls.current.target)
				.to(
					{
						x: annotation.lookAt.x,
						y: annotation.lookAt.y,
						z: annotation.lookAt.z,
					},
					1000,
				)
				.easing(TWEEN.Easing.Cubic.Out)
				.start()

			// change camera position
			new TWEEN.Tween(camera.position)
				.to(
					{
						x: annotation.camPos.x,
						y: annotation.camPos.y,
						z: annotation.camPos.z,
					},
					1000,
				)
				.easing(TWEEN.Easing.Cubic.Out)
				.start()
		} else {
			console.log(' Error: handleAnnotationClick')
		}
	}

	return (
		<>
			{annotations.map((item, i) => {
				return (
					<>
						<Html key={i} position={[item.lookAt.x, item.lookAt.y, item.lookAt.z]}>
							<svg>
								<circle
									onPointerDown={() => {
										handleAnnotationClick(item, i)
									}}
								/>
								<text x="12" y="22" style={{ pointerEvents: 'none' }}>
									{i + 1}
								</text>
							</svg>
							{item.title && i === selected && (
								<div>
									<p>{item.title}</p>
									<Presentation />
								</div>
							)}
						</Html>
					</>
				)
			})}
		</>
	)
}

function Tween() {
	return useFrame(() => {
		TWEEN.update()
	})
}

export { Annotations, Tween }
