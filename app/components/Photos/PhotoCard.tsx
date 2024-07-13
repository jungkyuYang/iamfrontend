import Image from 'next/image'

import { Photo } from '@/app/model/Photo'

export default function PhotoCard({ photo }: { photo: Photo }) {
	return (
		<div>
			<Image src={photo.url} alt={photo.title} />
			<div>{photo.title}</div>
		</div>
	)
}
