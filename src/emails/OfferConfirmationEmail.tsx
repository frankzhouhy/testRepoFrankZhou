import {
  Body,
  Column,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

/* ------------------------------------------------------------------ */
/*  Design Tokens                                                      */
/* ------------------------------------------------------------------ */

const color = {
  primaryBlue: "#0068EF",
  primaryDark: "#004499",
  textBase: "#001833",
  textLight: "#4F6F8F",
  headingBlue: "#003C8A",
  successGreen: "#00AA00",
  alertOrangeBg: "#FEF2E7",
  cautionYellowBg: "#FFF3C0",
  border: "#E0E0E0",
  bgLight: "#F6F6F6",
  white: "#FFFFFF",
};

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

export interface FlightProps {
  airlineName: string;
  airlineLogo: string;
  flightNumber: string;
  departureAirport: string;
  departureCity: string;
  departureTime: string;
  departureDate: string;
  arrivalAirport: string;
  arrivalCity: string;
  arrivalTime: string;
  arrivalDate: string;
  duration: string;
  fareType: string;
  stops: string;
}

export interface HotelProps {
  name: string;
  starRating: number;
  address: string;
  imageUrl: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  confirmationNumber: string;
  amenities: string[];
  guestReviewQuote: string;
  guestReviewAuthor: string;
  latitude: number;
  longitude: number;
}

export interface PriceSummaryProps {
  packagePrice: string;
  taxes: string;
  resortFee: string;
  totalCharged: string;
}

export interface OfferConfirmationEmailProps {
  baseUrl?: string;
  destination: string;
  travelerName: string;
  bookingRef: string;
  tripStartDate: string;
  tripEndDate: string;
  hotel: HotelProps;
  outboundFlight: FlightProps;
  returnFlight?: FlightProps;
  pnrLocator: string;
  passengerName: string;
  priceSummary: PriceSummaryProps;
  cancellationPolicy: string;
  resortFeeNotice: string;
  checkInLinks: { airlineName: string; url: string }[];
  itineraryUrl: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function googleCalendarUrl(
  title: string,
  startDate: string,
  endDate: string,
  location: string
): string {
  const fmt = (d: string) => d.replace(/[-:]/g, "").replace(/\.\d+/, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${fmt(startDate)}/${fmt(endDate)}`,
    location,
    details: `Priceline trip to ${location}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function staticMapImageUrl(lat: number, lon: number): string {
  // OpenStreetMap tile as a simple map preview (zoom 15, single tile)
  const zoom = 15;
  const n = Math.pow(2, zoom);
  const xtile = Math.floor(((lon + 180) / 360) * n);
  const ytile = Math.floor(
    ((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2) * n
  );
  return `https://tile.openstreetmap.org/${zoom}/${xtile}/${ytile}.png`;
}

function googleMapsLink(lat: number, lon: number): string {
  return `https://www.google.com/maps?q=${lat},${lon}`;
}

function renderStars(count: number): string {
  return "\u2605".repeat(count) + "\u2606".repeat(5 - count);
}

/* ------------------------------------------------------------------ */
/*  Reusable Styles                                                    */
/* ------------------------------------------------------------------ */

const font = {
  fontFamily: "'Montserrat', Arial, Helvetica, sans-serif",
};

const sectionPadding: React.CSSProperties = {
  padding: "24px 32px",
};

const cardStyle: React.CSSProperties = {
  border: `1px solid ${color.border}`,
  borderRadius: "8px",
  overflow: "hidden",
  marginBottom: "16px",
};

const badgeStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "4px 10px",
  marginRight: "6px",
  marginBottom: "6px",
  fontSize: "12px",
  fontWeight: 500,
  borderRadius: "4px",
  backgroundColor: color.bgLight,
  color: color.textBase,
  ...font,
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function FlightCard({
  flight,
  label,
}: {
  flight: FlightProps;
  label: string;
}) {
  return (
    <Section style={cardStyle}>
      <div style={{ padding: "16px 20px" }}>
        <Text
          style={{
            ...font,
            fontSize: "11px",
            fontWeight: 600,
            textTransform: "uppercase" as const,
            letterSpacing: "0.5px",
            color: color.textLight,
            margin: "0 0 12px",
          }}
        >
          {label}
        </Text>

        <Row>
          <Column style={{ width: "36px", verticalAlign: "top" }}>
            <Img
              src={flight.airlineLogo}
              alt={flight.airlineName}
              width="28"
              height="28"
              style={{ borderRadius: "4px" }}
            />
          </Column>
          <Column style={{ verticalAlign: "top" }}>
            <Text
              style={{
                ...font,
                fontSize: "14px",
                fontWeight: 600,
                color: color.textBase,
                margin: "0",
              }}
            >
              {flight.airlineName} {flight.flightNumber}
            </Text>
            <Text
              style={{
                ...font,
                fontSize: "12px",
                color: color.textLight,
                margin: "2px 0 0",
              }}
            >
              {flight.fareType} &bull; {flight.stops}
            </Text>
          </Column>
        </Row>

        <Hr style={{ borderColor: color.border, margin: "14px 0" }} />

        <Row>
          <Column style={{ textAlign: "left" as const }}>
            <Text
              style={{
                ...font,
                fontSize: "22px",
                fontWeight: 600,
                color: color.textBase,
                margin: "0",
              }}
            >
              {flight.departureTime}
            </Text>
            <Text
              style={{
                ...font,
                fontSize: "13px",
                color: color.textLight,
                margin: "2px 0 0",
              }}
            >
              {flight.departureAirport} &bull; {flight.departureCity}
            </Text>
            <Text
              style={{
                ...font,
                fontSize: "12px",
                color: color.textLight,
                margin: "2px 0 0",
              }}
            >
              {flight.departureDate}
            </Text>
          </Column>

          <Column style={{ textAlign: "center" as const, width: "100px" }}>
            <Text
              style={{
                ...font,
                fontSize: "12px",
                color: color.textLight,
                margin: "4px 0 0",
              }}
            >
              {flight.duration}
            </Text>
            <Hr
              style={{
                borderColor: color.primaryBlue,
                borderWidth: "1px",
                margin: "4px 0",
              }}
            />
          </Column>

          <Column style={{ textAlign: "right" as const }}>
            <Text
              style={{
                ...font,
                fontSize: "22px",
                fontWeight: 600,
                color: color.textBase,
                margin: "0",
              }}
            >
              {flight.arrivalTime}
            </Text>
            <Text
              style={{
                ...font,
                fontSize: "13px",
                color: color.textLight,
                margin: "2px 0 0",
              }}
            >
              {flight.arrivalAirport} &bull; {flight.arrivalCity}
            </Text>
            <Text
              style={{
                ...font,
                fontSize: "12px",
                color: color.textLight,
                margin: "2px 0 0",
              }}
            >
              {flight.arrivalDate}
            </Text>
          </Column>
        </Row>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Email Component                                               */
/* ------------------------------------------------------------------ */

export function OfferConfirmationEmail(props: OfferConfirmationEmailProps) {
  const {
    baseUrl = "https://test-repo-frank-zhou.vercel.app",
    destination,
    travelerName,
    bookingRef,
    tripStartDate,
    tripEndDate,
    hotel,
    outboundFlight,
    returnFlight,
    pnrLocator,
    passengerName,
    priceSummary,
    cancellationPolicy,
    resortFeeNotice,
    checkInLinks,
    itineraryUrl,
  } = props;

  const calUrl = googleCalendarUrl(
    `Trip to ${destination}`,
    tripStartDate,
    tripEndDate,
    `${hotel.name}, ${hotel.address}`
  );

  return (
    <Html>
      <Head>
        <Font
          fontFamily="Montserrat"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw5aXo.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="Montserrat"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtZ6Hw5aXo.woff2",
            format: "woff2",
          }}
          fontWeight={500}
          fontStyle="normal"
        />
        <Font
          fontFamily="Montserrat"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCu170E5aXo.woff2",
            format: "woff2",
          }}
          fontWeight={600}
          fontStyle="normal"
        />
      </Head>

      <Preview>Your trip to {destination} is confirmed! Ref: {bookingRef}</Preview>

      <Body
        style={{
          backgroundColor: color.bgLight,
          margin: "0",
          padding: "0",
          ...font,
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: color.white,
          }}
        >
          {/* -------- 1. Header -------- */}
          <Section
            style={{
              backgroundColor: color.primaryBlue,
              padding: "20px 32px",
              textAlign: "center" as const,
            }}
          >
            <Img
              src={`${baseUrl}/priceline-logo-white.svg`}
              alt="Priceline"
              width="160"
              height="32"
              style={{ margin: "0 auto", display: "block" }}
            />
          </Section>

          {/* -------- 2. Hero Banner -------- */}
          <Section
            style={{
              backgroundColor: color.primaryDark,
              padding: "36px 32px",
              textAlign: "center" as const,
            }}
          >
            <Heading
              as="h1"
              style={{
                ...font,
                fontSize: "26px",
                fontWeight: 600,
                color: color.white,
                margin: "0 0 8px",
              }}
            >
              Your trip to {destination} is confirmed!
            </Heading>
            <Text
              style={{
                ...font,
                fontSize: "14px",
                color: "#AAC8F0",
                margin: "0",
              }}
            >
              We&apos;re excited for your upcoming adventure.
            </Text>
          </Section>

          {/* -------- 3. Trip Overview -------- */}
          <Section style={sectionPadding}>
            <Heading
              as="h2"
              style={{
                ...font,
                fontSize: "18px",
                fontWeight: 600,
                color: color.headingBlue,
                margin: "0 0 16px",
              }}
            >
              Trip Overview
            </Heading>

            <Row style={{ marginBottom: "8px" }}>
              <Column style={{ width: "140px" }}>
                <Text style={{ ...font, fontSize: "13px", color: color.textLight, margin: "0" }}>
                  Traveler
                </Text>
              </Column>
              <Column>
                <Text style={{ ...font, fontSize: "13px", fontWeight: 600, color: color.textBase, margin: "0" }}>
                  {travelerName}
                </Text>
              </Column>
            </Row>

            <Row style={{ marginBottom: "8px" }}>
              <Column style={{ width: "140px" }}>
                <Text style={{ ...font, fontSize: "13px", color: color.textLight, margin: "0" }}>
                  Booking Reference
                </Text>
              </Column>
              <Column>
                <Text style={{ ...font, fontSize: "13px", fontWeight: 600, color: color.textBase, margin: "0" }}>
                  {bookingRef}
                </Text>
              </Column>
            </Row>

            <Row style={{ marginBottom: "8px" }}>
              <Column style={{ width: "140px" }}>
                <Text style={{ ...font, fontSize: "13px", color: color.textLight, margin: "0" }}>
                  Dates
                </Text>
              </Column>
              <Column>
                <Text style={{ ...font, fontSize: "13px", fontWeight: 600, color: color.textBase, margin: "0" }}>
                  {tripStartDate} &ndash; {tripEndDate}
                </Text>
              </Column>
            </Row>

            {/* -------- 4. Add to Calendar -------- */}
            <div style={{ marginTop: "16px" }}>
              <Link
                href={calUrl}
                style={{
                  ...font,
                  display: "inline-block",
                  padding: "10px 24px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: color.white,
                  backgroundColor: color.primaryBlue,
                  borderRadius: "6px",
                  textDecoration: "none",
                }}
              >
                Add to Google Calendar
              </Link>
              {itineraryUrl && (
                <Link
                  href={itineraryUrl}
                  style={{
                    ...font,
                    display: "inline-block",
                    padding: "10px 24px",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: color.primaryBlue,
                    backgroundColor: color.white,
                    border: `2px solid ${color.primaryBlue}`,
                    borderRadius: "6px",
                    textDecoration: "none",
                    marginLeft: "12px",
                  }}
                >
                  Manage Your Booking
                </Link>
              )}
            </div>
          </Section>

          <Hr style={{ borderColor: color.border, margin: "0 32px" }} />

          {/* -------- 5. Hotel Card -------- */}
          <Section style={sectionPadding}>
            <Heading
              as="h2"
              style={{ ...font, fontSize: "18px", fontWeight: 600, color: color.headingBlue, margin: "0 0 16px" }}
            >
              Hotel
            </Heading>

            <Section style={cardStyle}>
              <Img
                src={hotel.imageUrl}
                alt={hotel.name}
                width="600"
                height="auto"
                style={{ display: "block", width: "100%" }}
              />

              <div style={{ padding: "20px" }}>
                <Text style={{ ...font, fontSize: "18px", fontWeight: 600, color: color.textBase, margin: "0" }}>
                  {hotel.name}
                </Text>
                <Text style={{ ...font, fontSize: "14px", color: "#D4A017", margin: "4px 0" }}>
                  {renderStars(hotel.starRating)}
                </Text>
                <Text style={{ ...font, fontSize: "13px", color: color.textLight, margin: "0 0 12px" }}>
                  {hotel.address}
                </Text>

                <Hr style={{ borderColor: color.border, margin: "12px 0" }} />

                <Row style={{ marginBottom: "6px" }}>
                  <Column style={{ width: "130px" }}>
                    <Text style={{ ...font, fontSize: "13px", color: color.textLight, margin: "0" }}>Room Type</Text>
                  </Column>
                  <Column>
                    <Text style={{ ...font, fontSize: "13px", fontWeight: 500, color: color.textBase, margin: "0" }}>
                      {hotel.roomType}
                    </Text>
                  </Column>
                </Row>

                <Row style={{ marginBottom: "6px" }}>
                  <Column style={{ width: "130px" }}>
                    <Text style={{ ...font, fontSize: "13px", color: color.textLight, margin: "0" }}>Check-in</Text>
                  </Column>
                  <Column>
                    <Text style={{ ...font, fontSize: "13px", fontWeight: 500, color: color.textBase, margin: "0" }}>
                      {hotel.checkIn}
                    </Text>
                  </Column>
                </Row>

                <Row style={{ marginBottom: "6px" }}>
                  <Column style={{ width: "130px" }}>
                    <Text style={{ ...font, fontSize: "13px", color: color.textLight, margin: "0" }}>Check-out</Text>
                  </Column>
                  <Column>
                    <Text style={{ ...font, fontSize: "13px", fontWeight: 500, color: color.textBase, margin: "0" }}>
                      {hotel.checkOut}
                    </Text>
                  </Column>
                </Row>

                <Row style={{ marginBottom: "12px" }}>
                  <Column style={{ width: "130px" }}>
                    <Text style={{ ...font, fontSize: "13px", color: color.textLight, margin: "0" }}>
                      Confirmation #
                    </Text>
                  </Column>
                  <Column>
                    <Text style={{ ...font, fontSize: "13px", fontWeight: 600, color: color.successGreen, margin: "0" }}>
                      {hotel.confirmationNumber}
                    </Text>
                  </Column>
                </Row>

                {/* Amenity badges */}
                <div style={{ marginBottom: "12px" }}>
                  {hotel.amenities.map((amenity) => (
                    <span key={amenity} style={badgeStyle}>
                      {amenity}
                    </span>
                  ))}
                </div>

                {/* Guest review quote */}
                <div
                  style={{
                    backgroundColor: color.bgLight,
                    borderRadius: "6px",
                    padding: "12px 16px",
                  }}
                >
                  <Text style={{ ...font, fontSize: "13px", fontStyle: "italic", color: color.textBase, margin: "0 0 4px" }}>
                    &ldquo;{hotel.guestReviewQuote}&rdquo;
                  </Text>
                  <Text style={{ ...font, fontSize: "12px", color: color.textLight, margin: "0" }}>
                    &mdash; {hotel.guestReviewAuthor}
                  </Text>
                </div>
              </div>
            </Section>

            {/* -------- 6. Map -------- */}
            <Link href={googleMapsLink(hotel.latitude, hotel.longitude)}>
              <Img
                src={staticMapImageUrl(hotel.latitude, hotel.longitude)}
                alt={`Map of ${hotel.name} — Click to open in Google Maps`}
                width="600"
                height="250"
                style={{
                  display: "block",
                  width: "100%",
                  borderRadius: "8px",
                  border: `1px solid ${color.border}`,
                  objectFit: "cover" as const,
                }}
              />
              <Text style={{ ...font, fontSize: "12px", color: color.primaryBlue, textAlign: "center" as const, margin: "8px 0 0" }}>
                View on Google Maps &rarr;
              </Text>
            </Link>
          </Section>

          {/* -------- 7. Cancellation Policy (orange) -------- */}
          <Section style={{ padding: "0 32px 16px" }}>
            <div
              style={{
                backgroundColor: color.alertOrangeBg,
                borderRadius: "8px",
                padding: "16px 20px",
              }}
            >
              <Text style={{ ...font, fontSize: "13px", fontWeight: 600, color: color.textBase, margin: "0 0 4px" }}>
                Cancellation Policy
              </Text>
              <Text style={{ ...font, fontSize: "13px", color: color.textBase, margin: "0", lineHeight: "1.5" }}>
                {cancellationPolicy}
              </Text>
            </div>
          </Section>

          {/* -------- 8. Resort Fee Notice (yellow) -------- */}
          {resortFeeNotice && (
            <Section style={{ padding: "0 32px 16px" }}>
              <div
                style={{
                  backgroundColor: color.cautionYellowBg,
                  borderRadius: "8px",
                  padding: "16px 20px",
                }}
              >
                <Text style={{ ...font, fontSize: "13px", fontWeight: 600, color: color.textBase, margin: "0 0 4px" }}>
                  Resort Fee
                </Text>
                <Text style={{ ...font, fontSize: "13px", color: color.textBase, margin: "0", lineHeight: "1.5" }}>
                  {resortFeeNotice}
                </Text>
              </div>
            </Section>
          )}

          <Hr style={{ borderColor: color.border, margin: "0 32px" }} />

          {/* -------- 9 & 10. Flight Cards -------- */}
          <Section style={sectionPadding}>
            <Heading
              as="h2"
              style={{ ...font, fontSize: "18px", fontWeight: 600, color: color.headingBlue, margin: "0 0 16px" }}
            >
              {returnFlight ? "Flights" : "Flight"}
            </Heading>
            <FlightCard flight={outboundFlight} label={returnFlight ? "Outbound" : "Departure"} />
            {returnFlight && <FlightCard flight={returnFlight} label="Return" />}
          </Section>

          {/* -------- 11. Airline Check-in Links -------- */}
          <Section style={{ padding: "0 32px 8px" }}>
            <Text style={{ ...font, fontSize: "14px", fontWeight: 600, color: color.headingBlue, margin: "0 0 8px" }}>
              Online Check-in
            </Text>
            {checkInLinks.map((link) => (
              <div key={link.airlineName} style={{ marginBottom: "8px" }}>
                <Link
                  href={link.url}
                  style={{ ...font, fontSize: "13px", color: color.primaryBlue, fontWeight: 500 }}
                >
                  Check in with {link.airlineName} &rarr;
                </Link>
              </div>
            ))}
          </Section>

          {/* -------- 12. PNR & Passenger Name -------- */}
          <Section style={{ padding: "8px 32px 16px" }}>
            <Row style={{ marginBottom: "6px" }}>
              <Column style={{ width: "140px" }}>
                <Text style={{ ...font, fontSize: "13px", color: color.textLight, margin: "0" }}>PNR Locator</Text>
              </Column>
              <Column>
                <Text style={{ ...font, fontSize: "14px", fontWeight: 600, color: color.textBase, margin: "0", letterSpacing: "1px" }}>
                  {pnrLocator}
                </Text>
              </Column>
            </Row>
            <Row>
              <Column style={{ width: "140px" }}>
                <Text style={{ ...font, fontSize: "13px", color: color.textLight, margin: "0" }}>Passenger Name</Text>
              </Column>
              <Column>
                <Text style={{ ...font, fontSize: "14px", fontWeight: 600, color: color.textBase, margin: "0" }}>
                  {passengerName}
                </Text>
              </Column>
            </Row>
          </Section>

          <Hr style={{ borderColor: color.border, margin: "0 32px" }} />

          {/* -------- 13. Price Summary -------- */}
          <Section style={sectionPadding}>
            <Heading
              as="h2"
              style={{ ...font, fontSize: "18px", fontWeight: 600, color: color.headingBlue, margin: "0 0 16px" }}
            >
              Price Summary
            </Heading>

            {[
              { label: "Package Price", value: priceSummary.packagePrice },
              { label: "Taxes & Fees", value: priceSummary.taxes },
              ...(priceSummary.resortFee !== "$0.00"
                ? [{ label: "Resort Fee", value: priceSummary.resortFee }]
                : []),
            ].map((item) => (
              <Row key={item.label} style={{ marginBottom: "8px" }}>
                <Column>
                  <Text style={{ ...font, fontSize: "14px", color: color.textBase, margin: "0" }}>
                    {item.label}
                  </Text>
                </Column>
                <Column style={{ textAlign: "right" as const }}>
                  <Text style={{ ...font, fontSize: "14px", color: color.textBase, margin: "0" }}>
                    {item.value}
                  </Text>
                </Column>
              </Row>
            ))}

            <Hr style={{ borderColor: color.border, margin: "12px 0" }} />

            <Row>
              <Column>
                <Text style={{ ...font, fontSize: "16px", fontWeight: 600, color: color.textBase, margin: "0" }}>
                  Total Charged
                </Text>
              </Column>
              <Column style={{ textAlign: "right" as const }}>
                <Text style={{ ...font, fontSize: "16px", fontWeight: 600, color: color.successGreen, margin: "0" }}>
                  {priceSummary.totalCharged}
                </Text>
              </Column>
            </Row>
          </Section>

          <Hr style={{ borderColor: color.border, margin: "0 32px" }} />

          {/* -------- 14. Customer Service -------- */}
          <Section style={{ ...sectionPadding, textAlign: "center" as const }}>
            <Text style={{ ...font, fontSize: "14px", fontWeight: 600, color: color.headingBlue, margin: "0 0 4px" }}>
              Need help with your booking?
            </Text>
            <Text style={{ ...font, fontSize: "13px", color: color.textLight, margin: "0 0 8px" }}>
              Our travel experts are available 24/7
            </Text>
            <Link
              href="tel:1-877-477-4235"
              style={{ ...font, fontSize: "18px", fontWeight: 600, color: color.primaryBlue, textDecoration: "none" }}
            >
              1-877-477-4235
            </Link>
          </Section>

          {/* -------- 15. Footer -------- */}
          <Section
            style={{
              backgroundColor: color.bgLight,
              padding: "24px 32px",
              textAlign: "center" as const,
            }}
          >
            <Text style={{ ...font, fontSize: "12px", color: color.textLight, margin: "0 0 8px" }}>
              Priceline.com LLC &bull; 800 Connecticut Ave, Norwalk, CT 06854
            </Text>
            <div>
              {[
                { text: "Help Center", href: "https://www.priceline.com/help" },
                { text: "Privacy Policy", href: "https://www.priceline.com/privacy" },
                { text: "Terms of Use", href: "https://www.priceline.com/terms" },
              ].map((link, i) => (
                <React.Fragment key={link.text}>
                  {i > 0 && (
                    <span style={{ ...font, color: color.textLight, fontSize: "12px", padding: "0 8px" }}>|</span>
                  )}
                  <Link href={link.href} style={{ ...font, fontSize: "12px", color: color.primaryBlue }}>
                    {link.text}
                  </Link>
                </React.Fragment>
              ))}
            </div>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default OfferConfirmationEmail;

/* ------------------------------------------------------------------ */
/*  mapOfferToEmailProps — maps real RMS offer-details API response     */
/* ------------------------------------------------------------------ */

/* eslint-disable @typescript-eslint/no-explicit-any */

function formatDate(raw: string): string {
  const d = new Date(raw);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(raw: string): string {
  const d = new Date(raw);
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function titleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function buildFlightFromSlice(
  flyItem: any,
  sliceIndex: number,
  baseUrl: string
): FlightProps | undefined {
  const slice = flyItem.slice?.[sliceIndex];
  if (!slice) return undefined;
  const seg = slice.segment?.[0];
  if (!seg) return undefined;

  const airportMap: Record<string, any> = {};
  for (const ap of flyItem.airport ?? []) {
    airportMap[ap.code] = ap;
  }

  const airlineMap: Record<string, any> = {};
  for (const al of flyItem.airline ?? []) {
    airlineMap[al.code] = al;
  }

  const airline = airlineMap[seg.marketingAirline] ?? {};
  const origAirport = airportMap[seg.origAirport] ?? {};
  const destAirport = airportMap[seg.destAirport] ?? {};
  const imagePath = flyItem.imagePath ?? "https://www.priceline.com/sam/air/carrier_logos/";

  const fareBrand = flyItem.fareBrandInfo?.name ?? flyItem.fareFamilies?.[0]?.name ?? seg.cabinName ?? "Economy";

  return {
    airlineName: airline.name ?? seg.marketingAirline ?? "",
    airlineLogo: `${baseUrl}/airline-${seg.marketingAirline?.toLowerCase() ?? "unknown"}.svg`,
    flightNumber: `${seg.marketingAirline} ${seg.flightNumber}`,
    departureAirport: seg.origAirport ?? "",
    departureCity: origAirport.city ?? "",
    departureTime: formatTime(seg.departDateTime),
    departureDate: formatDate(seg.departDateTime),
    arrivalAirport: seg.destAirport ?? "",
    arrivalCity: destAirport.city ?? "",
    arrivalTime: formatTime(seg.arrivalDateTime),
    arrivalDate: formatDate(seg.arrivalDateTime),
    duration: formatDuration(seg.duration ?? slice.duration ?? 0),
    fareType: titleCase(fareBrand),
    stops: seg.stopQuantity === 0 ? "Nonstop" : `${seg.stopQuantity} stop(s)`,
  };
}

export function mapOfferToEmailProps(apiResponse: any): OfferConfirmationEmailProps {
  const offer = apiResponse.offerDetails ?? apiResponse;
  const primary = offer.primaryOffer ?? {};
  const pkgData = primary.pkgData ?? {};
  const components = primary.bundleComponents ?? [];

  // Find FLY and STAY components
  const flyComponent = components.find((c: any) => c.componentType === "FLY");
  const stayComponent = components.find((c: any) => c.componentType === "STAY");
  const flyItem = flyComponent?.item ?? {};
  const stayItem = stayComponent?.item ?? {};
  const hotelData = stayItem.hotel ?? {};

  // Customer info
  const customer = offer.customer ?? {};
  const passenger = flyItem.passenger?.[0] ?? {};
  const personName = passenger.personName ?? {};

  // Build flights from slices
  const baseUrl = "https://test-repo-frank-zhou.vercel.app";
  const outboundFlight = buildFlightFromSlice(flyItem, 0, baseUrl)!;
  const returnFlight = buildFlightFromSlice(flyItem, 1, baseUrl);

  // Hotel address
  const hotelAddr = hotelData.address ?? {};
  const fullAddress = [
    hotelAddr.addressLine1,
    hotelAddr.cityName,
    hotelAddr.stateCode,
    hotelAddr.zip,
  ]
    .filter(Boolean)
    .join(", ");

  // Hotel room info
  const rooms = stayItem.rooms ?? [];
  const primaryRoom = rooms[0] ?? {};

  // Cancellation policy
  const cancelPolicy =
    primaryRoom.cancelPolicyText ??
    Object.values(stayItem.importantInformation?.cancelPolicy ?? {})[0] ??
    "Please review the cancellation policy on your booking confirmation page.";

  // Resort / mandatory fee
  const mandatoryFee = stayComponent?.mandatoryFee ?? 0;
  const resortFeeNotice =
    mandatoryFee > 0
      ? `A resort fee of ${formatCurrency(mandatoryFee)} per night will be collected directly by the hotel at check-in.`
      : "";

  // Pricing
  const priceSummary = primary.pkgPriceSummary ?? {};

  // Airline check-in links
  const airlines = flyItem.airline ?? [];
  const checkInLinks = airlines
    .filter((a: any) => a.checkInUrl)
    .map((a: any) => ({
      airlineName: a.name,
      url: a.checkInUrl.startsWith("http") ? a.checkInUrl : `https://${a.checkInUrl}`,
    }));

  // Customer service phone
  const csPhone =
    offer.customerServicePhoneNumbers?.[0]?.phoneNumber ??
    flyItem.customerServiceContact?.[0]?.phone ??
    "1-877-477-4235";

  // Guest review quotes
  const quotes = hotelData.quotes ?? [];

  return {
    destination: titleCase(pkgData.destLocationName ?? hotelAddr.cityName ?? ""),
    travelerName: titleCase(
      `${customer.firstName ?? personName.givenName ?? ""} ${customer.lastName ?? personName.surname ?? ""}`
    ),
    bookingRef: String(pkgData.offerNum ?? offer.offerNum ?? ""),
    tripStartDate: formatDate(pkgData.travelStartDate ?? stayItem.travelStartDateTime ?? ""),
    tripEndDate: formatDate(pkgData.travelEndDate ?? stayItem.travelEndDateTime ?? ""),
    hotel: {
      name: hotelData.hotelName ?? "",
      starRating: Number(hotelData.starRating ?? stayItem.hotelMinStar ?? 0),
      address: fullAddress,
      imageUrl: hotelData.thumbnailURL ?? "",
      roomType: primaryRoom.planDescription ?? "Standard Room",
      checkIn: `${formatDate(stayItem.travelStartDateTime ?? "")} at ${hotelData.checkInTime ?? "3:00 PM"}`,
      checkOut: `${formatDate(stayItem.travelEndDateTime ?? "")} at ${hotelData.checkOutTime ?? "11:00 AM"}`,
      confirmationNumber: primaryRoom.confirmationNum ?? "",
      amenities: (hotelData.amenityDetails ?? []).slice(0, 8),
      guestReviewQuote: (quotes[0] ?? "").trim(),
      guestReviewAuthor: "Verified Guest",
      latitude: hotelData.lat ?? 0,
      longitude: hotelData.lon ?? 0,
    },
    outboundFlight,
    returnFlight,
    pnrLocator: flyItem.pnrLocator ?? "",
    passengerName: `${personName.givenName ?? ""} ${personName.surname ?? ""}`.trim(),
    priceSummary: {
      packagePrice: formatCurrency(priceSummary.basePkgPrice?.amount ?? pkgData.finalOfferPrice ?? 0),
      taxes: formatCurrency(priceSummary.totalTaxesAndFees?.amount ?? pkgData.billableTaxAmt ?? 0),
      resortFee: formatCurrency(priceSummary.mandatoryFee?.amount ?? 0),
      totalCharged: formatCurrency(priceSummary.totalChargedToday?.amount ?? 0),
    },
    cancellationPolicy: cancelPolicy,
    resortFeeNotice,
    checkInLinks,
    itineraryUrl: offer.itineraryUrl ?? offer.checkStatusUrl ?? "",
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */
