import { Connection, createConnection } from 'typeorm'

export const defaultConnection = createConnection();

export const devConnection = async (): Promise<Connection> => {
    return await createConnection("development");
}

export const QAConnection = async (): Promise<Connection> => {
return await createConnection("QA");
}

export const prodConnection = async (): Promise<Connection> => {
return await createConnection("production");
}

export default defaultConnection