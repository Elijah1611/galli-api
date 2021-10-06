import express, { Express } from 'express'
import { Server } from 'http'
import passport from 'passport';
import { globalErrorHandler } from './exception/GlobalErrorHandler';
import { validationErrorHandler } from './exception/ValidationErrorHandler';
import router from './routes'
import JwtStrategyConfig from './JwtStrategyConfig';
import helmet from 'helmet';
import cors from 'cors'
import morgan from 'morgan'

class ApiServer {
  public app: Express;
  public server: Server;

  constructor() {
    this.app = express();
    this.setup()
  }

  setup() {
    this.app.use(express.json());

    this.app.use(helmet());

    this.app.use(cors());

    this.app.use(morgan('dev'))

    passport.use(JwtStrategyConfig)

    this.app.use(passport.initialize());

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