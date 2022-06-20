import { Connection, createConnection, getConnection } from "typeorm";
import { Distric } from "../api/entity/distric";
import { DsDivision } from "../api/entity/ds-division";
import { JobInquiries } from "../api/entity/job-inquiries";
import { GnDivision } from "../api/entity/ng-division";
import { PersonalInquiries } from "../api/entity/personal-inquiries";
import { Province } from "../api/entity/province";
import { PublicInquiries } from "../api/entity/public-inquiries";
import { Role } from "../api/entity/role";
import { User } from "../api/entity/user";

export async function connect() {
  try {
    const connection: Connection = await createConnection({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "admin",
      password: "Testing!@3",
      database: "test",
      synchronize: true,
      logging: true,
      entities: [
        User,
        Role,
        Province,
        Distric,
        DsDivision,
        GnDivision,
        PublicInquiries,
        PersonalInquiries,
        JobInquiries,
      ],
      migrations: [],
      subscribers: [],
    });
    return connection;
  } catch (e) {
    // tslint:disable-next-line: no-console
    console.log(e);
  }
}
