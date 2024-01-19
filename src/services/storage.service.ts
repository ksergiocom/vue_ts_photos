import { getStorage, ref, listAll } from "firebase/storage";
import {app} from '@/firebase'

const storage = getStorage(app);


class StorageService {
    
    public static async getFolders(path:string){
        const listRef = ref(storage,path)

        const res = await listAll(listRef)
        const folders = res.prefixes.map(folder=>folder.name)
        
        return folders
    }

    public static async getFiles(path:string){
        const listRef = ref(storage,path)

        const res = await listAll(listRef)
        const files = res.items.map(file=>file.name)
        
        return files
    }


    // public static async uploadPublicPhoto(files:FileList){
    //     const storage = getStorage()

    //     const promises = []

    //     Array.from(files).forEach(file=> {
    //         const originalFileName = file.name
    //         const photoFileRef = ref(storage, 'public_photos/'+originalFileName)
    //         const promise = uploadBytes(photoFileRef, file)
    //         console.log(originalFileName)

    //         promises.push(promise)
    //     })

    //     await Promise.all(files)
    //     console.log('Uploaded successfully!')
    // }

}

export {StorageService}