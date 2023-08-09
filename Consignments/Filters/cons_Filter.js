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
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFoSG1vNVUtTlA5WFdYaHZnSEx4YiJ9.eyJ1c2VybmFtZSI6ImZhdGluLmsiLCJpc3MiOiJodHRwczovL2Rldi1ydGdxZXQ0ci5hdS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjNmNWVkODI1OTVlMGY3NDE4MzBiYjYxIiwiYXVkIjpbImh0dHBzOi8vZGV2LnRlc3Qtd2F5bmUuY29tL2FwaS8iLCJodHRwczovL2Rldi1ydGdxZXQ0ci5hdS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjkwOTY4NzUwLCJleHAiOjE2OTA5NzU5NTAsImF6cCI6ImIxcWlLWFRQZHdVelBvODcxSlR1YzM0ZFA4RzFnUExjIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.CSBGDi0LAu5vE5cdATALrWCXoLSsUpXtLMc4qRmjn45dJqhj42KMGwBKzNFvVdxZuk4kDChnIGbAtU11U-5jxYfdm4AsSDmabYF5975F7oV8c5u4A5JMl1wxksB6-p84zrzG-WaTAGHOo_OMerAKwi1xeitqlEVK2dPApZFzQcNb9eADtmQJ4YSvpXExV4f2fiCGAbLbc3UohzDHAkkFplH8aNj14D_k-WRQkYaL-HaYC28j9VeEpcr_fDKfXn9eC1bnhx8TNlGl_2UvhMyimcl7x_tvsxI9Bg5jcTSKDgeSTCt4S3fX8Jh2FOqFesjbBR5ZuZFHpPpVAvKYRaiX8A";

  // Set the headers with the bearer token
  const headers = {
    Authorization: `bearer ${token}`,
    "Content-Type": "application/json",
  };
  const payload = {
    pageNumber: 1,
    pageSize: 100,
    consignmentNote: "ECC",
    from: "2023-04-02T09:38:45.734Z",
    deleted: false,
  };

  //Account Commodity Schedules Paged ---  url correction
  const responseConsignmentFilter = http.post(
    "https://localhost:44367/api/Consignments/Filter",
    JSON.stringify(payload),
    { headers }
  );

  // Check the response status code and response time
  const ConsignmentFilterCountsstatusIs200 = check(responseConsignmentFilter, {
    "Status is 200": (res) => res.status === 200,
  });

  // Add the check results to the responses array
  response = ConsignmentFilterCountsstatusIs200;

  // Traverse over the responses array and log the keys for false values
  if (response === false) {
    console.log("Key:", responseConsignmentFilter);
  }

  // Add a sleep period between requests (if needed)
  sleep(1);
}
