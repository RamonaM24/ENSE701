import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
    @Schema()
    export class User {
    @Prop({ required: true })
    email: string;
    @Prop({ required: true })
    password: string;
    fname: string;
    lname: string;
}

export const UserSchema = SchemaFactory.createForClass(User);