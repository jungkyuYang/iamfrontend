import React, { useState } from 'react'

import './presentation.scss'
import Presentation_list from '../../../public/json/presentation_list.json'
import HardSkills from './HardSkills'
import SoftSkills from './SoftSkills'
import Career from './Career'
import Propose from './Propose'

interface SelectComponentType {
	[index: string]: React.ReactElement
}

const selectComponent: SelectComponentType = {
	HardSkills: <HardSkills />,
	SoftSkills: <SoftSkills />,
	Career: <Career />,
	Propose: <Propose />,
}

function Presentation() {
	const [content, setContent] = useState<string | null>(null)

	const handleClickButton: React.MouseEventHandler<HTMLButtonElement> = e => {
		const { name } = e.currentTarget
		setContent(name)
	}

	return (
		<div className="dialog-wrapper">
			hi
			{Presentation_list.map(data => {
				return (
					<button key={data.id} name={data.name} onClick={handleClickButton}>
						{data.text}
					</button>
				)
			})}
			{content && <div>{selectComponent[content]}</div>}
		</div>
	)
}

export default Presentation
