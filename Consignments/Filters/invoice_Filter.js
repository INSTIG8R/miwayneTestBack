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
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFoSG1vNVUtTlA5WFdYaHZnSEx4YiJ9.eyJ1c2VybmFtZSI6ImZhdGluLmsiLCJpc3MiOiJodHRwczovL2Rldi1ydGdxZXQ0ci5hdS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjNmNWVkODI1OTVlMGY3NDE4MzBiYjYxIiwiYXVkIjpbImh0dHBzOi8vZGV2LnRlc3Qtd2F5bmUuY29tL2FwaS8iLCJodHRwczovL2Rldi1ydGdxZXQ0ci5hdS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjkwMjczNDcwLCJleHAiOjE2OTAyODA2NzAsImF6cCI6ImIxcWlLWFRQZHdVelBvODcxSlR1YzM0ZFA4RzFnUExjIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.aL1knqQs7tXGQm3K-5GwyVc4-S5CK50sZG-ZjXi121js3ckexQK2ZyrNynzHCEiRPvVvf2-ixUsQnleZsSHSixZdmPQTWM0Gp7QXWWf8kK7lpVq3KQ8qg_zbr7VOljcOyq9r9HF3sC6yh7MthePc6C_4QAa1sfN9kGrida96EYpTrp4gFHXe19HDuayoMhnaccOObzTIMX_rm2gMgkLIqIFP9ZLNMmlxhWBsJfmD6ulKtRBfVNW28uupNUV-tgM8awJ91wMDncPoyrKyZG1besXLAa-satLWKl9ZVXpJ6d7y62jOYNXQ1NuU2RMz8jQPna2VyJHgy3i-UJNxf-hYUw";

  // Set the headers with the bearer token
  const headers = {
    Authorization: `bearer ${token}`,
    "Content-Type": "application/json",
  };
  const payload = {
    pageNumber: 1,
    pageSize: 100,
    consignmentNote: "ECC",
    deleted: false,
  };
  //Account Commodity Schedules Filter ---  url correction
  const responseInvoiceFilter = http.post(
    "https://localhost:44367/api/Consignments/Invoice/Filter",
    JSON.stringify(payload),
    { headers }
  );

  // Check the response status code and response time
  const InvoiceFilterstatusIs200 = check(responseInvoiceFilter, {
    "Status is 200": (res) => res.status === 200,
  });

  // Add the check results to the responses array
  response = InvoiceFilterstatusIs200;

  // Traverse over the responses array and log the keys for false values
  if (response === false) {
    console.log("Key:", responseInvoiceFilter);
  }

  // Add a sleep period between requests (if needed)
  sleep(1);
}
