import {Connection, ConnectionOptions, createConnection, getConnection} from 'typeorm';

class DbConnection {
  public config: ConnectionOptions;
  public connection: Connection;
  public connectionName: string = 'default';

  constructor(connectionName?: string) {
    this.connectionName = connectionName
  }

  async create(connectionName?: string) {
    if (connectionName) this.connectionName = connectionName 
    this.connection = await createConnection(this.connectionName);
  }

  async createFromConfig(config: ConnectionOptions) {
    this.config = config
    this.connectionName = this.config.name
    this.connection = await createConnection(this.config);
  }

  async close() {
    await getConnection(this.connectionName).close(); 
  }

  async clear() {
    const connection = getConnection(this.connectionName);
    const entities = connection.entityMetadatas;
    
    const entityDeletionPromises = entities.map((entity) => async() => {
        const repository = connection.getRepository(entity.name);
        await repository.clear()
    });

    await Promise.all(entityDeletionPromises);
  }

};

export default DbConnection;