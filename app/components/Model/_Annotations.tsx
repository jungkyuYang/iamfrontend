import { useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import TWEEN from '@tweenjs/tween.js'

import annotations from '../../../public/data/annotations.json'

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
			{annotations.map((a, i) => {
				return (
					<Html key={i} position={[a.lookAt.x, a.lookAt.y, a.lookAt.z]}>
						<svg
							height="34"
							width="34"
							transform="translate(-16 -16)"
							style={{ cursor: 'pointer' }}
						>
							<circle
								cx="17"
								cy="17"
								r="16"
								stroke="white"
								strokeWidth="3"
								fill="rgba(0,0,0,.66)"
								onPointerDown={() => {
									handleAnnotationClick(a, i)
								}}
							/>
							<text
								x="12"
								y="22"
								fill="white"
								fontSize={17}
								fontFamily="monospace"
								style={{ pointerEvents: 'none' }}
							>
								{i + 1}
							</text>
						</svg>
						{a.title && i === selected && (
							<div>
								<p>{a.title}</p>
							</div>
						)}
					</Html>
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
