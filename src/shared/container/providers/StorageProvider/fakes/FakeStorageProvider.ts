import IStorageProvider from "../models/IStorageProvider";

class FakeStorageProvider implements IStorageProvider {
    private storage: string[] = [];

    public async saveFile(file: string): Promise<string>{
        this.storage.push(file);

        return file
    };
    public async deleteFile(file: string): Promise<void>{
        const findInfex = this.storage.findIndex(storageFile => storageFile === file);
        
        this.storage.splice(findInfex, 1);
    };
}

export default FakeStorageProvider;