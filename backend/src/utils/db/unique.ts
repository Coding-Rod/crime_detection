import { client } from "../../db/config";
import boom from "@hapi/boom";

const unique = async (table: string, column: string, value: string) => {
    const result = await client.query(
        `SELECT * FROM ${table} WHERE ${column} = $1`,
        [value]
    );
    if (result.rows[0]) throw boom.conflict(`${column} already exists`);
};

export default unique;