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
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFoSG1vNVUtTlA5WFdYaHZnSEx4YiJ9.eyJ1c2VybmFtZSI6ImZhdGluLmsiLCJpc3MiOiJodHRwczovL2Rldi1ydGdxZXQ0ci5hdS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjNmNWVkODI1OTVlMGY3NDE4MzBiYjYxIiwiYXVkIjpbImh0dHBzOi8vZGV2LnRlc3Qtd2F5bmUuY29tL2FwaS8iLCJodHRwczovL2Rldi1ydGdxZXQ0ci5hdS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjkwMjYyNzQ3LCJleHAiOjE2OTAyNjk5NDcsImF6cCI6ImIxcWlLWFRQZHdVelBvODcxSlR1YzM0ZFA4RzFnUExjIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.OAKZVh_jVrywXg2yXSTYFGXGoTTLpptSvvJtvpOrhfIfl50DhDp1ZQrEcw68IS9pN3tQS42Cg8swm37bHdsUkks9wYHbe-HuCUwPGkB7rLfxtycBt_MPI_eBAUDLjercqmxXsdqGCclj1j84oP0NdzFT46RAvznFzDe-TCCXB4AEbP1BA-jfRtUOGQFaeI8hzDdwIwpnS1Qn1THj7IwauP9FVej3UBS-IuSxZWo1WoMjEo-o8_rzvDI7iSh6pG11r-YYeZJoAobnube2uwOa-uufHtB5S6JBLJMcyLlVcjkSHNtA_ZCsPDfp0y-uHB0epL2ZNs5yT_YAEXkRppeufA";

  // Set the headers with the bearer token
  const headers = {
    Authorization: `bearer ${token}`,
  };

  //Account Commodity Schedules Paged ---  url correction
  const responseInvoicePaged = http.get(
    "https://localhost:44367/api/Consignments/Invoice/Paged?PageNumber=1&PageSize=100",
    { headers }
  );

  // Check the response status code and response time
  const InvoicePagedstatusIs200 = check(responseInvoicePaged, {
    "Status is 200": (res) => res.status === 200,
  });

  // Add the check results to the responses array
  response = InvoicePagedstatusIs200;

  // Traverse over the responses array and log the keys for false values
  if (response === false) {
    console.log("Key:", responseInvoicePaged);
  }

  // Add a sleep period between requests (if needed)
}
