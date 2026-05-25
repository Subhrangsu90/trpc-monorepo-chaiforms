import { createHmac, randomBytes } from "node:crypto";
import * as JWT from "jsonwebtoken";
import { db, eq } from "@repo/database";
import { usersTable } from "@repo/database/schema";
import {
  CreateUserWithEmailAndPasswordInput,
  createUserWithEmailAndPasswordInput,
  generateUserTokenPayload,
  GenerateUserTokenPayloadType,
  signInUserWithEmailAndPasswordInput,
  signInUserWithEmailAndPasswordInputType,
} from "./model";
import { env } from "../env";

export class UserService {
  private async getUserByEmail(email: string) {
    const result = await db.select().from(usersTable).where(eq(usersTable.email, email));
    if (!result || result.length === 0) return null;

    return result[0];
  }

  private async verifyUserToken(token: string): Promise<GenerateUserTokenPayloadType> {
    try {
      const verifiedResult = JWT.verify(token, env.JWT_SECRET) as GenerateUserTokenPayloadType;
      return verifiedResult;
    } catch (error) {
      throw new Error("Invalid or expired token.");
    }
  }

  private async getUserById(id: string) {
    const user = await db
      .select({
        id: usersTable.id,
        fullName: usersTable.fullName,
        email: usersTable.email,
        profileImageUrl: usersTable.profileImageUrl,
      })
      .from(usersTable)
      .where(eq(usersTable.id, id));

    const userData = user[0];
    if (!userData) throw new Error(`User with id ${id} does not exist.`);

    return userData;
  }

  private async generateUserToken(payload: GenerateUserTokenPayloadType) {
    const { id } = await generateUserTokenPayload.parseAsync(payload);

    const token = JWT.sign({ id }, env.JWT_SECRET, { expiresIn: "1h" });
    return { token };
  }

  private async generateHash(salt: string, password: string) {
    return createHmac("sha256", salt).update(password).digest("hex");
  }

  public async createUserWithEmailAndPassword(payload: CreateUserWithEmailAndPasswordInput) {
    const { fullName, email, password } =
      await createUserWithEmailAndPasswordInput.parseAsync(payload);

    // Check if user already exists or not
    const existingUserWithEmail = await this.getUserByEmail(email);
    if (existingUserWithEmail) throw new Error(`User with email ${email} already exists.`);

    // Calculate salt and hash the password
    const salt = randomBytes(16).toString("hex");
    const hash = await this.generateHash(salt, password);

    // create user in DB
    const userInsertResult = await db
      .insert(usersTable)
      .values({ fullName, email, password: hash, salt })
      .returning({
        id: usersTable.id,
      });

    if (!userInsertResult || userInsertResult.length === 0 || !userInsertResult[0]?.id)
      throw new Error(`Somthing went wrong while creating a user`);

    const userId = userInsertResult[0].id;
    const { token } = await this.generateUserToken({ id: userId });

    return {
      id: userId,
      token,
    };
  }

  public async signInWithEmailAndPassword(payload: signInUserWithEmailAndPasswordInputType) {
    const { email, password } = await signInUserWithEmailAndPasswordInput.parseAsync(payload);
    const existingUser = await this.getUserByEmail(email);

    if (!existingUser) throw new Error(`User with email ${email} does not exist.`);

    if (!existingUser.salt || !existingUser.password)
      throw new Error(`User with email ${email} has invalid credentials.`);

    const hash = await this.generateHash(existingUser.salt, password);

    if (hash !== existingUser.password) throw new Error(`Invalid password for email ${email}.`);

    const { token } = await this.generateUserToken({ id: existingUser.id });

    return {
      id: existingUser.id,
      token,
    };
  }

  public async verifyAndDecodeUserToken(token: string) {
    const { id } = await this.verifyUserToken(token);
    const user = await this.getUserById(id);

    return { ...user };
  }
}

export default UserService;
