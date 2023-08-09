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
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFoSG1vNVUtTlA5WFdYaHZnSEx4YiJ9.eyJ1c2VybmFtZSI6ImZhdGluLmsiLCJpc3MiOiJodHRwczovL2Rldi1ydGdxZXQ0ci5hdS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjNmNWVkODI1OTVlMGY3NDE4MzBiYjYxIiwiYXVkIjpbImh0dHBzOi8vZGV2LnRlc3Qtd2F5bmUuY29tL2FwaS8iLCJodHRwczovL2Rldi1ydGdxZXQ0ci5hdS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjkwMjY5OTkyLCJleHAiOjE2OTAyNzcxOTIsImF6cCI6ImIxcWlLWFRQZHdVelBvODcxSlR1YzM0ZFA4RzFnUExjIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.N0Y_zaXXg_dERhnWxLUxe60HYXusMtz3yAxYdz2B0pSmGh7DUmQG5Or_9fKtHynpA2g5SOTBDQQuYulTxj9wktfIhVCsapB_tvefINh_n--l2WzTAwcA7RvftLzxarGNlV_kAJG2r9ygX6Ke2S9MfVUuN_8bLaCzVdivDT2nIQMl4NR1yTIs9kxKKZo53_2upI_teZ2PJn-0I3BvRNfVKuom_dA5lNAbHew8fljf0gqP_qHkV9ckuNGX85-xmwX5_XgJFAstGX7-3Xrb5BEPtFGHXyDS185VgQeL3UTFiP5fC5IGvuLzq6aEaAmBLcYHmAjh1H1_u-OJsZHLCWGLeg";

  // Set the headers with the bearer token
  const headers = {
    Authorization: `bearer ${token}`,
    "Content-Type": "application/json",
  };

  const payload = {
    pageNumber: 1,
    pageSize: 100,
    pickupCity: "AUCKLAND",
    deleted: false,
  };

  //Account Commodity Schedules Paged ---  url correction
  const responseAwaitingPodsFilter = http.post(
    "https://localhost:44367/api/Consignments/AwaitingPod/Filter",
    JSON.stringify(payload),
    { headers }
  );

  // Check the response status code and response time
  const AwaitingPodsFilterstatusIs200 = check(responseAwaitingPodsFilter, {
    "Status is 200": (res) => res.status === 200,
  });

  // Add the check results to the responses array
  response = AwaitingPodsFilterstatusIs200;

  // Traverse over the responses array and log the keys for false values
  if (response === false) {
    console.log("Key:", responseAwaitingPodsFilter);
  }

  // Add a sleep period between requests (if needed)
  sleep(1);
}
