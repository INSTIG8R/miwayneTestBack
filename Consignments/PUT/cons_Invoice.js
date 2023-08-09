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
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFoSG1vNVUtTlA5WFdYaHZnSEx4YiJ9.eyJ1c2VybmFtZSI6ImZhdGluLmsiLCJpc3MiOiJodHRwczovL2Rldi1ydGdxZXQ0ci5hdS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjNmNWVkODI1OTVlMGY3NDE4MzBiYjYxIiwiYXVkIjpbImh0dHBzOi8vZGV2LnRlc3Qtd2F5bmUuY29tL2FwaS8iLCJodHRwczovL2Rldi1ydGdxZXQ0ci5hdS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjkwMzY4MTE4LCJleHAiOjE2OTAzNzUzMTgsImF6cCI6ImIxcWlLWFRQZHdVelBvODcxSlR1YzM0ZFA4RzFnUExjIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.SSIv8iDSZgyonl-vk6cU54iwHDXbEZqjFnl-xNY0HoQuLFd6hLKmqUCaq0Myax9zEdizbm9DMbvECYL7x-nWlElJeUsNVLwp43KQ-EOfw1AjBjbnMw7icNvr9TYOS9o_sTkogxi6MzVVQRzOsA9czJHkcx7RDwyL0CPwMHcn0E9EhN2o9HKy96Pqwf4tD0EHwz2jygQz4mFft3CyyF2G_KOwhNB9pA6K0zLl5OKqBL2QpmjgV5TTZZbn1JJiJ9x4WIT-flDNGc_7ZvyogLiHtzCmquiEcUkQW7ktlajTG6A9sK7tgyniwjIgiJSrtI5Yw5QZnKrF_STIe-LBODlP5g";

  // Set the headers with the bearer token
  const headers = {
    Authorization: `bearer ${token}`,
    "Content-Type": "application/json",
  };

  const payload = {
    consignments: [
      {
        consignmentId: "5fa28a73-403a-42fe-bb6b-b2cd655c14b7",
        consignmentNote: "00S0ET1T000",
      },
      {
        consignmentId: "18e5fbb5-f6bc-4e41-8a77-9da1ef077ecb",
        consignmentNote: "011O00D0E0M",
      },
      {
        consignmentId: "c58d5400-009f-4ab6-b42a-2ce6337bc3e5",
        consignmentNote: "0T000S010TE",
      },
      {
        consignmentId: "92bcc7e1-4ae2-4b70-99c9-ad20ae50b275",
        consignmentNote: "10MO0E1D000",
      },
      {
        consignmentId: "9bfaa08a-65df-4ef6-bfdd-069ea97de81b",
        consignmentNote: "ABE DENTON",
      },
      {
        consignmentId: "f15f2f1f-e417-4d37-909f-bdde6d111396",
        consignmentNote: "ACC34567890",
      },
      {
        consignmentId: "25e4db10-2369-4cc9-98fb-aaa4283dbc3c",
        consignmentNote: "CLONE12345",
      },
      {
        consignmentId: "10d6e353-27a5-4cf3-b00c-1bf414730dfc",
        consignmentNote: "CRLTEST001",
      },
      {
        consignmentId: "48e5b6bc-506c-4dac-9a33-f908f12f61f7",
        consignmentNote: "CRLTEST002",
      },
      {
        consignmentId: "5ec5a321-bb91-4ebb-9e08-cd555d58cc5d",
        consignmentNote: "CRLTEST003",
      },
    ],
  };

  //Account Commodity Schedules Paged ---  url correction
  const responseConsInvoice = http.put(
    "https://localhost:44367/api/Consignments/Invoice",
    JSON.stringify(payload),
    { headers }
  );
  // Check the response Invoice code and response time
  const ConsInvoiceStatusIs200 = check(responseConsInvoice, {
    "Status is 200": (res) => res.status === 200,
  });

  // Add the check results to the responses array
  response = ConsInvoiceStatusIs200;

  // Traverse over the responses array and log the keys for false values
  if (response === false) {
    console.log("Key:", responseConsInvoice);
  }

  // Add a sleep period between requests (if needed)
  sleep(1);
}
