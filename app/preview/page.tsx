import { render } from "@react-email/render";
import {
  OfferConfirmationEmail,
  mapOfferToEmailProps,
} from "@/src/emails/OfferConfirmationEmail";

const RMS_BASE =
  "https://guse4-rmspcimidtiergw-prod.prod.pcln.com/rms/offer-details/token";

export default async function PreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <div style={{ fontFamily: "system-ui", padding: "40px", textAlign: "center" }}>
        <h1>Email Preview</h1>
        <p>
          Pass an offer token as a query parameter to preview the confirmation email:
        </p>
        <code style={{ background: "#f0f0f0", padding: "8px 16px", borderRadius: "4px" }}>
          /preview?token=YOUR_OFFER_TOKEN
        </code>
        <p style={{ marginTop: "16px" }}>
          Or visit <a href="/preview/demo">/preview/demo</a> for a hardcoded demo.
        </p>
      </div>
    );
  }

  const rmsUrl = `${RMS_BASE}/${encodeURIComponent(token)}?client-application=rms-tools`;

  let apiResponse;
  try {
    const rmsRes = await fetch(rmsUrl, { cache: "no-store" });

    if (!rmsRes.ok) {
      return (
        <div style={{ fontFamily: "system-ui", padding: "40px", color: "red" }}>
          <h1>Error</h1>
          <p>Failed to fetch offer details (HTTP {rmsRes.status})</p>
          <p style={{ color: "#666", fontSize: "14px" }}>
            The RMS API may not be accessible from this server. Try{" "}
            <a href="/preview/demo">/preview/demo</a> for a hardcoded demo instead.
          </p>
        </div>
      );
    }

    apiResponse = await rmsRes.json();
  } catch (err) {
    return (
      <div style={{ fontFamily: "system-ui", padding: "40px", color: "red" }}>
        <h1>Network Error</h1>
        <p>Could not reach the RMS API: {String(err)}</p>
        <p style={{ color: "#666", fontSize: "14px" }}>
          The RMS API may be behind a VPN/firewall. Try{" "}
          <a href="/preview/demo">/preview/demo</a> for a hardcoded demo instead.
        </p>
      </div>
    );
  }

  const emailProps = mapOfferToEmailProps(apiResponse);
  const html = await render(OfferConfirmationEmail(emailProps));

  return (
    <div>
      <div
        style={{
          background: "#333",
          color: "#fff",
          padding: "8px 16px",
          fontFamily: "system-ui",
          fontSize: "13px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>
          Preview: <strong>{emailProps.destination}</strong> — {emailProps.travelerName} — Ref: {emailProps.bookingRef}
        </span>
      </div>
      <iframe
        srcDoc={html}
        style={{ width: "100%", height: "calc(100vh - 40px)", border: "none" }}
        title="Email Preview"
      />
    </div>
  );
}
