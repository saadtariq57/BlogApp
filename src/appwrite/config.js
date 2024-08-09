import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite"

class Services {
    client = new Client()
    databases
    storge

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectid)
        this.databases = new Databases(this.client)
        this.storge = new Storage(this.client)
    }

    async createPost({ title, userid, slug, content, featuredImage, status }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    userid,
                    title,
                    content,
                    featuredImage,
                    status
                })
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            return false
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                })
        } catch (error) {
            console.log("Appwrite Service :: updatePost :: error", error);
            return false
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
            return true
        } catch (error) {
            console.log("Appwrite Service :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
        } catch (error) {
            console.log("Appwrite Service :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite Service :: getPosts :: error", error);
            return false
        }
    }

    //File handling services

    async uploadFile(file) {
        try {
            return await this.storge.createFile(conf.appwriteBucketId, ID.unique(), file)

        } catch (error) {
            console.log("Appwrite Service :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storge.deleteFile(conf.appwriteBucketId, fileId)
            return true
        } catch (error) {
            console.log("Appwrite Service :: deleteFile :: error", error);
            return false
        }
    }

    previewFile(fileId) {
        try {
            const file = this.storge.getFilePreview(conf.appwriteBucketId, fileId)
            return file;

        } catch (error) {
            console.log("Appwrite Service :: previewFile :: error", error);
            return false

        }
    }
}

const service = new Services()
export default service