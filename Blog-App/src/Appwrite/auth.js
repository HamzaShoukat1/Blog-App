import toast from 'react-hot-toast';
import conf from '../conf/conf'
import { Client , Account , ID } from 'appwrite'

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId)
      
    this.account = new Account(this.client)
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return await this.login({ email, password });
      }
      return userAccount;
    } catch (error) {
      console.error("Account creation failed:", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(email, password);
      console.log("Login successful, session created:", session);
      return session;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }

  async getCurrentUser() {
    
    try {
      // This will throw if no active session exists
      const user = await this.account.get(); 
      console.log("Current user session:", user);
      
      return user;
    } catch (error) {
      console.log("No active session:", error.message);
      return null;  // Gracefully handle no active session
    }
  }

  async logout() {
  
  try {
    await this.account.deleteSession('current');
    console.log("Successfully logged out");
  } catch (error) {
    
    console.error("Logout failed:", error);
    throw error;
    
  }
  }
}

const authService = new AuthService();
export default authService;


