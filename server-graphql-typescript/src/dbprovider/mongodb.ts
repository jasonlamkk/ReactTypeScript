import { Collection, Db, MongoClient } from 'mongodb';

export class MongoDbProvider{
  private database?: Db;
  private mongoClient: MongoClient;
  private url: string;
  private databaseName: string;

  constructor(url: string, databaseName: string) {
    this.url = url;
    this.databaseName = databaseName;
    this.mongoClient = new MongoClient(url, { useUnifiedTopology: true });

  }

  async reconnect(): Promise<void> {
    this.mongoClient = new MongoClient(this.url, { useUnifiedTopology: true })
    await this.connectAsync()
  }

  get votesCollection(): Collection {
    const votesCollection = this.getCollection('votes');
    if (!votesCollection) {
      throw new Error('votes collection is undefined');
    }

    return votesCollection;
  }

  get voteOptionsCollection(): Collection{
    const voteOptionsCollection = this.getCollection('voteOptions');
    if (!voteOptionsCollection) {
      throw new Error('voteOptions collection is undefined');
    }
    return voteOptionsCollection;
  }

  /**
   * Connect to MongoDB.
   * @async
   */
  async connectAsync(): Promise<void> {
    await this.mongoClient.connect();
    this.database = this.mongoClient.db(this.databaseName);
  }

  /**
   * Close the database and its underlying connections.
   */
  async closeAsync(): Promise<void> {
    await this.mongoClient.close();
  }

  /**
   * Fetch a specific collection.
   * @private
   * @param collectionName - Collection name.
   * @returns The collection instance.
   */
  private getCollection(collectionName: string): Collection {
    if (!this.database) {
      throw new Error('Database is undefined.');
    }

    return this.database.collection(collectionName);
  }
}
