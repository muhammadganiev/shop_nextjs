import {
    boolean,
    timestamp,
    pgTable,
    text,
    primaryKey,
    integer,
    pgEnum,
  } from "drizzle-orm/pg-core"
  import { drizzle } from "drizzle-orm/postgres-js"
  import type { AdapterAccountType } from "next-auth/adapters"
  import { off } from "process"
  import {createId} from "@paralleldrive/cuid2"


export const RoleEnum = pgEnum("roles",["user", "admin"])
export const users = pgTable("user", {
    id: text("id").notNull().primaryKey().$defaultFn(() => createId()),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    password: text("password"),
    image: text("image"),
    twoFactorEnabled: boolean("twoFactorEnabled").default(false),
    role: RoleEnum("roles").default("user"),
  })
   
  export const accounts = pgTable(
    "account",
    {
      userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
      type: text("type").$type<AdapterAccountType>().notNull(),
      provider: text("provider").notNull(),
      providerAccountId: text("providerAccountId").notNull(),
      refresh_token: text("refresh_token"),
      access_token: text("access_token"),
      expires_at: integer("expires_at"),
      token_type: text("token_type"),
      scope: text("scope"),
      id_token: text("id_token"),
      session_state: text("session_state"),
    },
    (account) => ({
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    })
  )

  export const emailTokens = pgTable(
    "email_tokens",
    {
      id: text("id").notNull().$defaultFn(() => createId()),
      token: text("token").notNull(),
      expires: timestamp("expires", { mode: "date" }).notNull(),
      email: text('email').notNull()
    },
    (vt) => ({
      compositePk: primaryKey({
        columns: [vt.id, vt.token],
      }),
    })
  )