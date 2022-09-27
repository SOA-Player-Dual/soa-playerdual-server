import * as moduleAlias from "module-alias";
import RedisClient from "@config/redis";
import { createServer } from "@config/express";
import { AddressInfo } from "net";
import http from "http";
import "dotenv/config";

const sourcePath = 'src';
moduleAlias.addAliases({
    '@server': sourcePath,
    '@config': `${sourcePath}/config`,
    '@domain': `${sourcePath}/domain`,
    '@controller': `${sourcePath}/controller`,
    '@middleware': `${sourcePath}/middleware`,
});

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || '3000';

const startServer = async () => {
    const app = await createServer();
    const server = http.createServer(app).listen({host, port}, () => {
        const addressInfo = server.address() as AddressInfo;
        console.log(`Server is hosted at http://${addressInfo.address}:${addressInfo.port}`);
    })
    await RedisClient.connect();
    console.log('Connected to redis');

    const signalTrap: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
    signalTrap.forEach((type)=>{
        process.once(type, async()=>{
            console.log(`process.once ${type}`);
            server.close(()=>{
                console.log('Server closed!');
            })
        })
    })
};


startServer();