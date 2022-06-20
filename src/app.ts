import express, { Application } from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import * as SwaggerDocument from './swagger.json';
import cors from "cors";

import { connect } from "./utils/database";
/**
 * Routers
 */
import PublicFormRouter from "./api/routes/public-form.routes";
import PersonalFormRouter from "./api/routes/personal-form.routes";
import JobFormRouter from "./api/routes/job-form.routes";
import GnDivisionRouter from "./api/routes/gn-division.routes";
import DsDivisionRouter from "./api/routes/ds-division.routes";
import UserRouter from "./api/routes/user.routes";
import RoleRouter from "./api/routes/role.routes";
import AuthRouter from "./api/routes/auth.routes";

/**
 * controllers
 */
import { verifyToken } from './api/controllers/auth.controller';

export class App {
    basePath: string = "/v1"
    private app: Application;
    constructor() {
        this.app = express();
        this.middlewares();
        this.route();
        this.initializeSwagger();
        connect();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }

    route() {
        this.app.use(this.basePath + '/public_form', verifyToken, PublicFormRouter);
        this.app.use(this.basePath + '/personal_form', verifyToken, PersonalFormRouter);
        this.app.use(this.basePath + '/job_form', verifyToken, JobFormRouter);
        this.app.use(this.basePath + '/gn_division', verifyToken, GnDivisionRouter);
        this.app.use(this.basePath + '/ds_division', verifyToken, DsDivisionRouter);
        this.app.use(this.basePath + '/oauth', AuthRouter);
        this.app.use(this.basePath + '/role', verifyToken, RoleRouter);
        this.app.use(this.basePath + '/user', verifyToken, UserRouter);
    }

    async listen() {
        // tslint:disable-next-line: no-console
        this.app.listen(3000, () => console.log('Server running'));
    }


    initializeSwagger() {
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(SwaggerDocument));
    }
}

