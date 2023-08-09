import { sleep, group, check, fail } from "k6";
import http from "k6/http";

export let options = {
  stages: [
    { duration: "1m", target: 10 }, // Simulate 10 concurrent users for 1 minute
    { duration: "3m", target: 10 }, // Maintain 10 concurrent users for 3 minutes
    { duration: "1m", target: 0 }, // Scale down to 0 concurrent users over 1 minute
  ],
};

export default function() {
  var response;
  const token =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFoSG1vNVUtTlA5WFdYaHZnSEx4YiJ9.eyJ1c2VybmFtZSI6ImZhdGluLmsiLCJpc3MiOiJodHRwczovL2Rldi1ydGdxZXQ0ci5hdS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjNmNWVkODI1OTVlMGY3NDE4MzBiYjYxIiwiYXVkIjpbImh0dHBzOi8vZGV2LnRlc3Qtd2F5bmUuY29tL2FwaS8iLCJodHRwczovL2Rldi1ydGdxZXQ0ci5hdS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjg5NzQzNDE1LCJleHAiOjE2ODk3NTA2MTUsImF6cCI6ImIxcWlLWFRQZHdVelBvODcxSlR1YzM0ZFA4RzFnUExjIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.msuWXzbcTmtVf7eufXUCZY7cwAEsQIfqvvAmk_I_PhRPJC9xt1fuXXkWqZf7QnL8mZzqv5mdXO4jLrgQyFTOO3C7swozeCg1b5scbC5-V9Mb8HEHxFO4ku8I_vpQZzos_I04PblsoohR_h7T17fSCthsbN7C4jarD_ivEfPXDk_m6uSmSb7AFnLPTqFyqVYyRNyoQOsoFILMYuXQZxyrwTRkEY1a-mBa4wdKkekfEpfT28CyRu49QVD6uWU4-H9WfFfZ3DUfxau6fTNO24e3oqklu4NQ5R0tIA6G7bhwno3lAJdPiD8O-ybnryaL-cYgh2mxnowHQGFYq7O6tgRLsg";

  // Set the headers with the bearer token
  const headers = {
    Authorization: `bearer ${token}`,
  };

  //Account Commodity Schedules Paged ---  url correction
  const responseTransactionsTotalCounts = http.get(
    "https://localhost:44367/api/Consignments/Transactions/TotalCounts",
    { headers }
  );

  // Check the response status code and response time
  const TransactionsTotalCountsstatusIs200 = check(
    responseTransactionsTotalCounts,
    {
      "Status is 200": (res) => res.status === 200,
    }
  );

  // Add the check results to the responses array
  response = TransactionsTotalCountsstatusIs200;

  // Traverse over the responses array and log the keys for false values
  if (response === false) {
    console.log("Key:", responseTransactionsTotalCounts);
  }

  // Add a sleep period between requests (if needed)
  sleep(1);
}
