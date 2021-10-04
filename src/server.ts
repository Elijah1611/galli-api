import express, { Express } from 'express'
import { Server } from 'http'
import { globalErrorHandler } from './exception/GlobalErrorHandler';
import { validationErrorHandler } from './exception/ValidationErrorHandler';
import router from './routes'

class ApiServer {
    public app: Express;
    public server: Server;

  constructor() {
    this.app = express();
    this.setup()
}

setup() {
    this.app.use(express.json());
    
    this.app.use('/api', router);

    this.app.use(validationErrorHandler)

    this.app.use(globalErrorHandler);
}

run(port) {
   this.server = this.app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  }

  stop() {
    this.server.close();
  }
}

export default ApiServer