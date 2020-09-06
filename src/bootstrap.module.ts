import {DynamicModule, Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import {ConnectionOptions} from "typeorm";
import {UsersModule} from "./users/users.module";
import { ConfigModule } from '@nestjs/config';
import {BlogModule} from "./blog/blog.module";

@Module({})
export class BootstrapModule {

    static forRoot(connOptions: ConnectionOptions): DynamicModule {
        return {
            module: BootstrapModule,
            imports: [
                AuthModule, UsersModule,BlogModule,
                TypeOrmModule.forRoot(connOptions),
                ConfigModule.forRoot()
            ],

        };
    }
}
