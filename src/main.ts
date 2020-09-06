import {NestFactory} from '@nestjs/core';
import {BootstrapModule} from './bootstrap.module';
import {getDbConnectionOptions} from "./shared/utils";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {


    const app = await NestFactory.create(
        BootstrapModule.forRoot(await getDbConnectionOptions(process.env.NODE_ENV)),
        {
            logger: console,

        },
    );
    const options = new DocumentBuilder()
        .setTitle('My API')
        .setDescription('API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
    await app.listen(3000);

}

bootstrap();
