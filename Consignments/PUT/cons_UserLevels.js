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
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFoSG1vNVUtTlA5WFdYaHZnSEx4YiJ9.eyJ1c2VybmFtZSI6ImZhdGluLmsiLCJpc3MiOiJodHRwczovL2Rldi1ydGdxZXQ0ci5hdS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjNmNWVkODI1OTVlMGY3NDE4MzBiYjYxIiwiYXVkIjpbImh0dHBzOi8vZGV2LnRlc3Qtd2F5bmUuY29tL2FwaS8iLCJodHRwczovL2Rldi1ydGdxZXQ0ci5hdS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjkwMzYzNjAyLCJleHAiOjE2OTAzNzA4MDIsImF6cCI6ImIxcWlLWFRQZHdVelBvODcxSlR1YzM0ZFA4RzFnUExjIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.DDXCHbdkOpkus9LeD4LjsK-ca5Oqd38hdBok2GDIPcuzyJdAmhDGLMZQSaM87jCb4cH7Y4NHTUhrnmk1Z2Pnyi2CGoYgVk-Z285AaOoiKu5dGC71ccl0whdZgfn3dUCSl9FAd-Zrsf8beZFYA1yxXmXQTIDwEz3wwylgW79e3GRmf8KGQ9e04TWVQQSEcMuSwg2GprSuChlRLVK6pnEOJtshxZHO2Nc-rMwWlPcMKAEPTQaajoK2xAsgCrzzC1wSft7sDbRvg__XY42l51jZo-ZjMCIe1MuPx7AhtRKoQd5_JgYvAllIZonPJpp2ypJNtYCemcTOLovU_m84OnGBYA";

  // Set the headers with the bearer token
  const headers = {
    Authorization: `bearer ${token}`,
    "Content-Type": "application/json",
  };

  const payload = {
    levelId: "27fdb3b9-5f50-485b-2b5e-08da8a129dc7",
    consignmentIds: [
      "afcf60cf-bef9-4d1c-a2d3-962d68def58b",
      "c8a8f3e3-1703-46b7-9f1f-dc431de123bd",
    ],
  };

  //Account Commodity Schedules Paged ---  url correction
  const responseConsUserLevels = http.put(
    "https://localhost:44367/api/Consignments/UserLevels",
    JSON.stringify(payload),
    { headers }
  );
  // Check the response UserLevels code and response time
  const ConsUserLevelsStatusIs200 = check(responseConsUserLevels, {
    "Status is 200": (res) => res.status === 200,
  });

  // Add the check results to the responses array
  response = ConsUserLevelsStatusIs200;

  // Traverse over the responses array and log the keys for false values
  if (response === false) {
    console.log("Key:", responseConsUserLevels);
  }

  // Add a sleep period between requests (if needed)
  sleep(1);
}
