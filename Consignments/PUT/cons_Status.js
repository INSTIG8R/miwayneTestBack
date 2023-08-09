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
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFoSG1vNVUtTlA5WFdYaHZnSEx4YiJ9.eyJ1c2VybmFtZSI6ImZhdGluLmsiLCJpc3MiOiJodHRwczovL2Rldi1ydGdxZXQ0ci5hdS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjNmNWVkODI1OTVlMGY3NDE4MzBiYjYxIiwiYXVkIjpbImh0dHBzOi8vZGV2LnRlc3Qtd2F5bmUuY29tL2FwaS8iLCJodHRwczovL2Rldi1ydGdxZXQ0ci5hdS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjkwMzUyNDY2LCJleHAiOjE2OTAzNTk2NjYsImF6cCI6ImIxcWlLWFRQZHdVelBvODcxSlR1YzM0ZFA4RzFnUExjIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.rybCTwmQbDaxSb7NATbm4thxyIbNIlc8KH-OM9ONwO4Bpck-9Tw05XOcnhQaF-lverUHTBxQmlCDIbT4KShS1oRXxwATHQ2jK4BDFqfoGqTv24PcXl8pZZZYd7A_nDosef9uH-4VSysY-WmTcMgo98eRyhzfg-fN64veUDEG4iNQ8kgiOKoFUrbLLB1kluikhSXPL9ombfu7vKMR-DmuCvG8Gp8PZ8pc-YPbKq9d5O-fkGNWR-2z8USl0J12GT4yFspOqPRaqP9v2Eg8zXCxG7fRy84rSY_pmsQOKddMNR9fIaO7s338BQaAyqNLKfIjHVlzvcRVqtb2C6RfuYB2FA";

  // Set the headers with the bearer token
  const headers = {
    Authorization: `bearer ${token}`,
    "Content-Type": "application/json",
  };

  const payload = {
    statusId: "9e29241a-3448-4e68-c989-08d915dc361b",
    status: "Allocated",
    consignmentIds: [
      {
        consignmentId: "afcf60cf-bef9-4d1c-a2d3-962d68def58b",
        consignmentNote: "TESTSIGMA02",
      },
      {
        consignmentId: "c8a8f3e3-1703-46b7-9f1f-dc431de123bd",
        consignmentNote: "TESTSIGMA01",
      },
      {
        consignmentId: "dd20acb2-a827-4f12-bc27-4cf1b3f77442",
        consignmentNote: "TESTSEARCH2",
      },
      {
        consignmentId: "d4110896-96cb-4b7b-9b61-db8061fa0fc9",
        consignmentNote: "TESTSEARCH1",
      },
      {
        consignmentId: "a3c5030a-e155-4100-a0f8-d08d29e2507e",
        consignmentNote: "TESTPICKUP1",
      },
    ],
  };

  //Account Commodity Schedules Paged ---  url correction
  const responseConsStatus = http.put(
    "https://localhost:44367/api/Consignments/Status",
    JSON.stringify(payload),
    { headers }
  );
  // Check the response status code and response time
  const ConsStatusstatusIs200 = check(responseConsStatus, {
    "Status is 200": (res) => res.status === 200,
  });

  // Add the check results to the responses array
  response = ConsStatusstatusIs200;

  // Traverse over the responses array and log the keys for false values
  if (response === false) {
    console.log("Key:", responseConsStatus);
  }

  // Add a sleep period between requests (if needed)
  sleep(1);
}
