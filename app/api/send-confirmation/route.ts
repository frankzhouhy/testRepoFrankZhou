import { render } from "@react-email/render";
import {
  OfferConfirmationEmail,
  mapOfferToEmailProps,
} from "@/src/emails/OfferConfirmationEmail";

const RMS_BASE =
  "https://guse4-rmspcimidtiergw-prod.prod.pcln.com/rms/offer-details/token";

export async function POST(request: Request) {
  const body = await request.json();
  const { offerToken } = body;

  if (!offerToken || typeof offerToken !== "string") {
    return Response.json(
      { error: "Missing or invalid offerToken" },
      { status: 400 }
    );
  }

  const rmsUrl = `${RMS_BASE}/${encodeURIComponent(offerToken)}?client-application=rms-tools`;

  const rmsRes = await fetch(rmsUrl);
  if (!rmsRes.ok) {
    return Response.json(
      { error: "Failed to fetch offer details", status: rmsRes.status },
      { status: 502 }
    );
  }

  const offer = await rmsRes.json();
  const emailProps = mapOfferToEmailProps(offer);
  const html = await render(OfferConfirmationEmail(emailProps));

  return Response.json({ html });
}
