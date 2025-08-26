import conf from '../conf/conf.js'
import { Client , ID, Databases,Storage,Query, Permission,Role } from 'appwrite'

export class Service{
  client = new Client();
  databases;
  storage; //storage
  constructor(){
    this.client
     .setEndpoint(conf.appwriteUrl)
     .setProject(conf.appwriteProjectId);
     this.databases = new Databases(this.client)
     this.storage = new Storage(this.client)
  }

  async createPost({title,slug,content,featuredimage,status,userid}){ //slug for identofy post
    try {
      
      return await this.databases.createDocument(

         conf.appwriteDatabaseId,
         conf.appwritecollectionId,
         slug,
         {
          title,
          content,
          featuredimage,
          status,
          userid,
         },
         
        )
      
    } catch (error) {
      console.log("appwrite sercie:: createPost::" ,error)
      
    }

  };
  async updatePost(slug,{title,content,featuredimage,status}){
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwritecollectionId,
        slug,
        {
          title,
          content,
          featuredimage,
          status,

        }

      )
      
    } catch (error) {
      console.log("aprrwrite error :: updatePost::",error);
      
      
    }
  };
  async deletePost(slug){ //async deletePost({ slug })=> deletePost({ slug: "abc123" })
                             //async deletePost(slug)=>deletePost("abc123")
    try {
       await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwritecollectionId,
        slug,
       )
       return true
      
    } catch (error) {
      console.log("apwrite error:: deletePost",error);
      return false;
    
    }

  };

  async getPost(slug){ //get single post
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwritecollectionId,
        slug,
      )
      
    } catch (error) {
      console.log("appwrite err:: getPost",error);
      return false
      
    }
  }; 
  async getPosts(queries = [Query.equal("status","active")]){ // /all active post return krna queries used for filters (used with indexes only thats why we ccreate index in appwrite article section,index name is status in inside appwrite)
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwritecollectionId,
        [
          ...queries,
          Query.limit(100),
          Query.orderDesc('$createdAt'),
        ]
      )

      
    } catch (error) {
      console.log("appwrite error:: getPosts",error);
      
      
    }


  };


  //file upload service // do separte file for this
  async uploadFile(file){
    try {
       return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file,
        [
            Permission.read(Role.users()),
        ]
       )
      
    } catch (error) {
      console.log("appwirte error:: uploadfile", error);
      return false
      
      
    }
  };

  async deleteFile(fileId){
    try {
      await this.storage.deleteFile(
        conf.appwriteBucketId,
        fileId,
      )
      return true

      
    } catch (error) {
       console.log("appwirte error:: delete file", error);
       return false
      
    }

  };

  async getFileView(fileId){  // You use getFilePreview() when you want a lightweight, visual version of a file — for speed, safety, or customization.
    return this.storage.getFileView(
      conf.appwriteBucketId,
      fileId
    ).toString()  
  }

  async getPostByTitle (title){
    try {
      return await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwritecollectionId,[
        Query.equal("title",title)
      ])
      
    } catch (error) {
      console.log(error);
      
    }
  }

  
}



const service = new Service()
export default service //ek obj me store krwa do thk rehta he bana bana obj  mil jaega





// A slug is a URL-friendly string used to uniquely identify a resource — in this case, a post.

// For example, if your blog post title is:

// "10 Tips for Writing Clean Code"

// The slug might be:

// 10-tips-for-writing-clean-code

// You might use it in a URL like:

// https://yourapp.com/posts/10-tips-for-writing-clean-code


//We pass fileId in getfilepreview so the function can dynamically generate a preview for any file we request — not just one hardcoded file.
//getFilePreview() is for previewing (displaying) stored files visually — perfect for showing images, avatars, thumbnails, or embedded documents.