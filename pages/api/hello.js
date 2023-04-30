// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { pool } from "../../config/db";

export default async function handler(req, res) {
  
  const promisePool = pool.promise();
  const [rows] = await promisePool.query("SELECT NOW()");

  //console.log(rows)

  //res.status(200).json({ name: "John Doe" });
  return res.status(200).json(rows[0]['NOW()']);
}
