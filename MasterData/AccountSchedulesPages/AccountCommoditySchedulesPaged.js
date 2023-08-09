import { sleep, group, check, fail } from "k6";
import http from "k6/http";

export let options = {
  stages: [
    { duration: "1m", target: 10 }, // Simulate 10 concurrent users for 1 minute
    { duration: "3m", target: 10 }, // Maintain 10 concurrent users for 3 minutes
    { duration: "1m", target: 0 }, // Scale down to 0 concurrent users over 1 minute
  ],
};

export default function () {
  var response;
  const token =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFoSG1vNVUtTlA5WFdYaHZnSEx4YiJ9.eyJ1c2VybmFtZSI6ImZhdGluLmsiLCJpc3MiOiJodHRwczovL2Rldi1ydGdxZXQ0ci5hdS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjNmNWVkODI1OTVlMGY3NDE4MzBiYjYxIiwiYXVkIjpbImh0dHBzOi8vZGV2LnRlc3Qtd2F5bmUuY29tL2FwaS8iLCJodHRwczovL2Rldi1ydGdxZXQ0ci5hdS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjg5NjY5NzY3LCJleHAiOjE2ODk2NzY5NjcsImF6cCI6ImIxcWlLWFRQZHdVelBvODcxSlR1YzM0ZFA4RzFnUExjIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.UudaZ6xr1ek55vC-VE7nlpRVW99uBZJdgGgG2t4f7KS-_12uuMc_NJ_Ax87uslvpAyfS-r0IR85LkKEvrmZp8eu7Vo_sXwo7TON56H6eymLA5XsM4zwEfDKUNniVmvxQi4UmH5wObLjG9OZGLMOUYATr3pE7ACE9fU7J5cTC_uCClRrQWqfbtP6K0x39NkK_CqIiJkTibrji-08n0ENfWxpltHJJjkxKQzcBZSGqr1J-2flqdf6tFKtdrhmYbTyyC5M_McrFZ-832tlOu4E9I-PZqexzXuEKiq9W1CRNpFN0cucg7MhHmV_9h2mTyRVJw8PJ5g7OGrKWp4eCVDKoAw";

  // Set the headers with the bearer token
  const headers = {
    Authorization: `bearer ${token}`,
  };

  //Account Commodity Schedules Paged ---  url correction
  const responseAccountCommoditySchedulesPaged = http.get(
    "https://localhost:44367/api/AccountMetroSchedules/Paged?PageNumber=1&PageSize=100",
    { headers }
  );

  // Check the response status code and response time
  const AccountCommoditySchedulesPagedstatusIs200 = check(
    responseAccountCommoditySchedulesPaged,
    {
      "Status is 200": (res) => res.status === 200,
    }
  );

  // Add the check results to the responses array
  response = AccountCommoditySchedulesPagedstatusIs200;

  // Traverse over the responses array and log the keys for false values
  if (response === false) {
    console.log("Key:", responseAccountCommoditySchedulesPaged);
  }

  // Add a sleep period between requests (if needed)
  sleep(1);
}
