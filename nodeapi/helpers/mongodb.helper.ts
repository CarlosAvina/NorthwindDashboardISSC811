import { MongoClient } from 'mongodb';

export default class MongoDBHelper {
    public db: any;

    private cnn: any;
    private port: number;
    private dbUri: string;
    private static _instance: MongoDBHelper;

    constructor(SETTINGS: any) {
        this.port = SETTINGS.PORT;
        this.dbUri = `mongodb://${SETTINGS.USER_NAME}:${SETTINGS.USER_PASSWORD}@${SETTINGS.HOST}:${SETTINGS.PORT}/${SETTINGS.DEFAULT_DATABASE}?authSource=admin`;
    }

    public static getInstance(settings: any) {
        return this._instance || (this._instance = new this(settings));
    }

    async connect() {
        console.log(this.dbUri);
        await MongoClient.connect(this.dbUri, { useNewUrlParser: true, useUnifiedTopology: true }).then(
            (connection: any) => {
                this.cnn = connection;
                this.db = this.cnn.db();
                console.log('Conexion a mongo db realizada de forma correcta');
            }
        ).catch((err: any) => {
            console.log(`Ocurrio un error al intentar conectarse a la base de datos de MongoDB. La descripcion del error es la siguiente ${err}`);
        })
    }

    setDatabase(dbName: string) {
        this.db = this.cnn.db(dbName);
    }

    async close() {
        await this.cnn.close();
    }
}