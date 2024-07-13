import Service from '@/app/service/Service'
import { Photo } from '@/app/model/Photo'

class PhotoService extends Service {
	getPhotos() {
		return this.http.get<Photo[]>(`/posts`)
	}

	getPhoto({ id }: { id: number }) {
		return this.http.get<Photo>(`/posts/${id}`)
	}
}

export default new PhotoService()
