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
  destination: string;
  travelerName: string;
  bookingRef: string;
  tripStartDate: string;
  tripEndDate: string;
  hotel: HotelProps;
  outboundFlight: FlightProps;
  returnFlight: FlightProps;
  pnrLocator: string;
  passengerName: string;
  priceSummary: PriceSummaryProps;
  cancellationPolicy: string;
  resortFeeNotice: string;
  checkInLinks: { airlineName: string; url: string }[];
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

function staticMapUrl(lat: number, lon: number): string {
  return (
    `https://maps.googleapis.com/maps/api/staticmap` +
    `?center=${lat},${lon}&zoom=15&size=600x250&scale=2` +
    `&markers=color:red%7C${lat},${lon}` +
    `&key=GOOGLE_MAPS_KEY`
  );
}

function stars(count: number): string {
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
              src="https://press.priceline.com/wp-content/uploads/2022/07/Priceline_Logo_White_RGB-e1658252498498.png"
              alt="Priceline"
              width="160"
              height="auto"
              style={{ margin: "0 auto" }}
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
                <Text
                  style={{
                    ...font,
                    fontSize: "13px",
                    color: color.textLight,
                    margin: "0",
                  }}
                >
                  Traveler
                </Text>
              </Column>
              <Column>
                <Text
                  style={{
                    ...font,
                    fontSize: "13px",
                    fontWeight: 600,
                    color: color.textBase,
                    margin: "0",
                  }}
                >
                  {travelerName}
                </Text>
              </Column>
            </Row>

            <Row style={{ marginBottom: "8px" }}>
              <Column style={{ width: "140px" }}>
                <Text
                  style={{
                    ...font,
                    fontSize: "13px",
                    color: color.textLight,
                    margin: "0",
                  }}
                >
                  Booking Reference
                </Text>
              </Column>
              <Column>
                <Text
                  style={{
                    ...font,
                    fontSize: "13px",
                    fontWeight: 600,
                    color: color.textBase,
                    margin: "0",
                  }}
                >
                  {bookingRef}
                </Text>
              </Column>
            </Row>

            <Row style={{ marginBottom: "8px" }}>
              <Column style={{ width: "140px" }}>
                <Text
                  style={{
                    ...font,
                    fontSize: "13px",
                    color: color.textLight,
                    margin: "0",
                  }}
                >
                  Dates
                </Text>
              </Column>
              <Column>
                <Text
                  style={{
                    ...font,
                    fontSize: "13px",
                    fontWeight: 600,
                    color: color.textBase,
                    margin: "0",
                  }}
                >
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
            </div>
          </Section>

          <Hr style={{ borderColor: color.border, margin: "0 32px" }} />

          {/* -------- 5. Hotel Card -------- */}
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
                <Text
                  style={{
                    ...font,
                    fontSize: "18px",
                    fontWeight: 600,
                    color: color.textBase,
                    margin: "0",
                  }}
                >
                  {hotel.name}
                </Text>
                <Text
                  style={{
                    ...font,
                    fontSize: "14px",
                    color: "#D4A017",
                    margin: "4px 0",
                  }}
                >
                  {stars(hotel.starRating)}
                </Text>
                <Text
                  style={{
                    ...font,
                    fontSize: "13px",
                    color: color.textLight,
                    margin: "0 0 12px",
                  }}
                >
                  {hotel.address}
                </Text>

                <Hr style={{ borderColor: color.border, margin: "12px 0" }} />

                <Row style={{ marginBottom: "6px" }}>
                  <Column style={{ width: "130px" }}>
                    <Text
                      style={{
                        ...font,
                        fontSize: "13px",
                        color: color.textLight,
                        margin: "0",
                      }}
                    >
                      Room Type
                    </Text>
                  </Column>
                  <Column>
                    <Text
                      style={{
                        ...font,
                        fontSize: "13px",
                        fontWeight: 500,
                        color: color.textBase,
                        margin: "0",
                      }}
                    >
                      {hotel.roomType}
                    </Text>
                  </Column>
                </Row>

                <Row style={{ marginBottom: "6px" }}>
                  <Column style={{ width: "130px" }}>
                    <Text
                      style={{
                        ...font,
                        fontSize: "13px",
                        color: color.textLight,
                        margin: "0",
                      }}
                    >
                      Check-in
                    </Text>
                  </Column>
                  <Column>
                    <Text
                      style={{
                        ...font,
                        fontSize: "13px",
                        fontWeight: 500,
                        color: color.textBase,
                        margin: "0",
                      }}
                    >
                      {hotel.checkIn}
                    </Text>
                  </Column>
                </Row>

                <Row style={{ marginBottom: "6px" }}>
                  <Column style={{ width: "130px" }}>
                    <Text
                      style={{
                        ...font,
                        fontSize: "13px",
                        color: color.textLight,
                        margin: "0",
                      }}
                    >
                      Check-out
                    </Text>
                  </Column>
                  <Column>
                    <Text
                      style={{
                        ...font,
                        fontSize: "13px",
                        fontWeight: 500,
                        color: color.textBase,
                        margin: "0",
                      }}
                    >
                      {hotel.checkOut}
                    </Text>
                  </Column>
                </Row>

                <Row style={{ marginBottom: "12px" }}>
                  <Column style={{ width: "130px" }}>
                    <Text
                      style={{
                        ...font,
                        fontSize: "13px",
                        color: color.textLight,
                        margin: "0",
                      }}
                    >
                      Confirmation #
                    </Text>
                  </Column>
                  <Column>
                    <Text
                      style={{
                        ...font,
                        fontSize: "13px",
                        fontWeight: 600,
                        color: color.successGreen,
                        margin: "0",
                      }}
                    >
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
                  <Text
                    style={{
                      ...font,
                      fontSize: "13px",
                      fontStyle: "italic",
                      color: color.textBase,
                      margin: "0 0 4px",
                    }}
                  >
                    &ldquo;{hotel.guestReviewQuote}&rdquo;
                  </Text>
                  <Text
                    style={{
                      ...font,
                      fontSize: "12px",
                      color: color.textLight,
                      margin: "0",
                    }}
                  >
                    &mdash; {hotel.guestReviewAuthor}
                  </Text>
                </div>
              </div>
            </Section>

            {/* -------- 6. Static Map -------- */}
            <Img
              src={staticMapUrl(hotel.latitude, hotel.longitude)}
              alt={`Map of ${hotel.name}`}
              width="600"
              height="250"
              style={{
                display: "block",
                width: "100%",
                borderRadius: "8px",
                border: `1px solid ${color.border}`,
              }}
            />
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
              <Text
                style={{
                  ...font,
                  fontSize: "13px",
                  fontWeight: 600,
                  color: color.textBase,
                  margin: "0 0 4px",
                }}
              >
                Cancellation Policy
              </Text>
              <Text
                style={{
                  ...font,
                  fontSize: "13px",
                  color: color.textBase,
                  margin: "0",
                  lineHeight: "1.5",
                }}
              >
                {cancellationPolicy}
              </Text>
            </div>
          </Section>

          {/* -------- 8. Resort Fee Notice (yellow) -------- */}
          <Section style={{ padding: "0 32px 16px" }}>
            <div
              style={{
                backgroundColor: color.cautionYellowBg,
                borderRadius: "8px",
                padding: "16px 20px",
              }}
            >
              <Text
                style={{
                  ...font,
                  fontSize: "13px",
                  fontWeight: 600,
                  color: color.textBase,
                  margin: "0 0 4px",
                }}
              >
                Resort Fee
              </Text>
              <Text
                style={{
                  ...font,
                  fontSize: "13px",
                  color: color.textBase,
                  margin: "0",
                  lineHeight: "1.5",
                }}
              >
                {resortFeeNotice}
              </Text>
            </div>
          </Section>

          <Hr style={{ borderColor: color.border, margin: "0 32px" }} />

          {/* -------- 9. Outbound Flight -------- */}
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
              Flights
            </Heading>
            <FlightCard flight={outboundFlight} label="Outbound" />

            {/* -------- 10. Return Flight -------- */}
            <FlightCard flight={returnFlight} label="Return" />
          </Section>

          {/* -------- 11. Airline Check-in Links -------- */}
          <Section style={{ padding: "0 32px 8px" }}>
            <Text
              style={{
                ...font,
                fontSize: "14px",
                fontWeight: 600,
                color: color.headingBlue,
                margin: "0 0 8px",
              }}
            >
              Online Check-in
            </Text>
            {checkInLinks.map((link) => (
              <div key={link.airlineName} style={{ marginBottom: "8px" }}>
                <Link
                  href={link.url}
                  style={{
                    ...font,
                    fontSize: "13px",
                    color: color.primaryBlue,
                    fontWeight: 500,
                  }}
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
                <Text
                  style={{
                    ...font,
                    fontSize: "13px",
                    color: color.textLight,
                    margin: "0",
                  }}
                >
                  PNR Locator
                </Text>
              </Column>
              <Column>
                <Text
                  style={{
                    ...font,
                    fontSize: "14px",
                    fontWeight: 600,
                    color: color.textBase,
                    margin: "0",
                    letterSpacing: "1px",
                  }}
                >
                  {pnrLocator}
                </Text>
              </Column>
            </Row>
            <Row>
              <Column style={{ width: "140px" }}>
                <Text
                  style={{
                    ...font,
                    fontSize: "13px",
                    color: color.textLight,
                    margin: "0",
                  }}
                >
                  Passenger Name
                </Text>
              </Column>
              <Column>
                <Text
                  style={{
                    ...font,
                    fontSize: "14px",
                    fontWeight: 600,
                    color: color.textBase,
                    margin: "0",
                  }}
                >
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
              style={{
                ...font,
                fontSize: "18px",
                fontWeight: 600,
                color: color.headingBlue,
                margin: "0 0 16px",
              }}
            >
              Price Summary
            </Heading>

            {[
              { label: "Package Price", value: priceSummary.packagePrice },
              { label: "Taxes & Fees", value: priceSummary.taxes },
              { label: "Resort Fee", value: priceSummary.resortFee },
            ].map((item) => (
              <Row key={item.label} style={{ marginBottom: "8px" }}>
                <Column>
                  <Text
                    style={{
                      ...font,
                      fontSize: "14px",
                      color: color.textBase,
                      margin: "0",
                    }}
                  >
                    {item.label}
                  </Text>
                </Column>
                <Column style={{ textAlign: "right" as const }}>
                  <Text
                    style={{
                      ...font,
                      fontSize: "14px",
                      color: color.textBase,
                      margin: "0",
                    }}
                  >
                    {item.value}
                  </Text>
                </Column>
              </Row>
            ))}

            <Hr style={{ borderColor: color.border, margin: "12px 0" }} />

            <Row>
              <Column>
                <Text
                  style={{
                    ...font,
                    fontSize: "16px",
                    fontWeight: 600,
                    color: color.textBase,
                    margin: "0",
                  }}
                >
                  Total Charged
                </Text>
              </Column>
              <Column style={{ textAlign: "right" as const }}>
                <Text
                  style={{
                    ...font,
                    fontSize: "16px",
                    fontWeight: 600,
                    color: color.successGreen,
                    margin: "0",
                  }}
                >
                  {priceSummary.totalCharged}
                </Text>
              </Column>
            </Row>
          </Section>

          <Hr style={{ borderColor: color.border, margin: "0 32px" }} />

          {/* -------- 14. Customer Service -------- */}
          <Section
            style={{
              ...sectionPadding,
              textAlign: "center" as const,
            }}
          >
            <Text
              style={{
                ...font,
                fontSize: "14px",
                fontWeight: 600,
                color: color.headingBlue,
                margin: "0 0 4px",
              }}
            >
              Need help with your booking?
            </Text>
            <Text
              style={{
                ...font,
                fontSize: "13px",
                color: color.textLight,
                margin: "0 0 8px",
              }}
            >
              Our travel experts are available 24/7
            </Text>
            <Link
              href="tel:1-877-477-4235"
              style={{
                ...font,
                fontSize: "18px",
                fontWeight: 600,
                color: color.primaryBlue,
                textDecoration: "none",
              }}
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
            <Text
              style={{
                ...font,
                fontSize: "12px",
                color: color.textLight,
                margin: "0 0 8px",
              }}
            >
              Priceline.com LLC &bull; 800 Connecticut Ave, Norwalk, CT 06854
            </Text>
            <div>
              {[
                { text: "Help Center", href: "https://www.priceline.com/help" },
                {
                  text: "Privacy Policy",
                  href: "https://www.priceline.com/privacy",
                },
                {
                  text: "Terms of Use",
                  href: "https://www.priceline.com/terms",
                },
              ].map((link, i) => (
                <React.Fragment key={link.text}>
                  {i > 0 && (
                    <span
                      style={{
                        ...font,
                        color: color.textLight,
                        fontSize: "12px",
                        padding: "0 8px",
                      }}
                    >
                      |
                    </span>
                  )}
                  <Link
                    href={link.href}
                    style={{
                      ...font,
                      fontSize: "12px",
                      color: color.primaryBlue,
                    }}
                  >
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
/*  mapOfferToEmailProps                                                */
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

function formatCurrency(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

function mapFlight(seg: any): FlightProps {
  return {
    airlineName: seg.airlineName ?? seg.airline?.name ?? "",
    airlineLogo:
      seg.airlineLogo ??
      seg.airline?.logoUrl ??
      `https://images.priceline.com/airlines/${(seg.airlineCode ?? seg.airline?.code ?? "").toLowerCase()}.png`,
    flightNumber: seg.flightNumber ?? `${seg.airlineCode ?? ""}${seg.number ?? ""}`,
    departureAirport: seg.departureAirport ?? seg.departure?.airportCode ?? "",
    departureCity: seg.departureCity ?? seg.departure?.cityName ?? "",
    departureTime:
      seg.departureTimeFormatted ?? formatTime(seg.departureDateTime ?? seg.departure?.dateTime ?? ""),
    departureDate:
      seg.departureDateFormatted ?? formatDate(seg.departureDateTime ?? seg.departure?.dateTime ?? ""),
    arrivalAirport: seg.arrivalAirport ?? seg.arrival?.airportCode ?? "",
    arrivalCity: seg.arrivalCity ?? seg.arrival?.cityName ?? "",
    arrivalTime:
      seg.arrivalTimeFormatted ?? formatTime(seg.arrivalDateTime ?? seg.arrival?.dateTime ?? ""),
    arrivalDate:
      seg.arrivalDateFormatted ?? formatDate(seg.arrivalDateTime ?? seg.arrival?.dateTime ?? ""),
    duration: seg.duration ?? seg.elapsedTime ?? "",
    fareType: seg.fareType ?? seg.cabinClass ?? "Economy",
    stops: seg.stops != null ? (seg.stops === 0 ? "Nonstop" : `${seg.stops} stop(s)`) : "Nonstop",
  };
}

export function mapOfferToEmailProps(offer: any): OfferConfirmationEmailProps {
  const hotel = offer.hotel ?? offer.hotelDetails ?? {};
  const outbound =
    offer.outboundFlight ?? offer.flights?.outbound ?? offer.flights?.[0] ?? {};
  const ret =
    offer.returnFlight ?? offer.flights?.return ?? offer.flights?.[1] ?? {};
  const pricing = offer.pricing ?? offer.priceSummary ?? {};
  const traveler = offer.traveler ?? offer.passengers?.[0] ?? {};

  const hotelAmenities: string[] =
    hotel.amenities?.map((a: any) => (typeof a === "string" ? a : a.name ?? a.label ?? "")) ?? [];

  const review = hotel.guestReview ?? hotel.review ?? {};

  const airlines = new Set<string>();
  [outbound, ret].forEach((f: any) => {
    const name = f.airlineName ?? f.airline?.name;
    if (name) airlines.add(name);
  });

  const checkInLinks: { airlineName: string; url: string }[] =
    offer.checkInLinks ??
    Array.from(airlines).map((name) => ({
      airlineName: name,
      url: `https://www.google.com/search?q=${encodeURIComponent(name + " online check in")}`,
    }));

  return {
    destination: offer.destination ?? hotel.cityName ?? hotel.city ?? "",
    travelerName:
      offer.travelerName ??
      [traveler.firstName, traveler.lastName].filter(Boolean).join(" "),
    bookingRef: offer.bookingRef ?? offer.bookingReference ?? offer.confirmationId ?? "",
    tripStartDate:
      offer.tripStartDate ??
      outbound.departureDateTime ??
      outbound.departure?.dateTime ??
      hotel.checkIn ??
      "",
    tripEndDate:
      offer.tripEndDate ??
      ret.arrivalDateTime ??
      ret.arrival?.dateTime ??
      hotel.checkOut ??
      "",
    hotel: {
      name: hotel.name ?? "",
      starRating: hotel.starRating ?? hotel.stars ?? 0,
      address: hotel.address ?? hotel.fullAddress ?? "",
      imageUrl: hotel.imageUrl ?? hotel.image ?? hotel.thumbnailUrl ?? "",
      roomType: hotel.roomType ?? hotel.roomDescription ?? "",
      checkIn: hotel.checkInFormatted ?? formatDate(hotel.checkIn ?? hotel.checkInDate ?? ""),
      checkOut: hotel.checkOutFormatted ?? formatDate(hotel.checkOut ?? hotel.checkOutDate ?? ""),
      confirmationNumber:
        hotel.confirmationNumber ?? hotel.hotelConfirmationId ?? "",
      amenities: hotelAmenities,
      guestReviewQuote: review.quote ?? review.text ?? review.comment ?? "",
      guestReviewAuthor: review.author ?? review.reviewerName ?? "Verified Guest",
      latitude: hotel.latitude ?? hotel.lat ?? 0,
      longitude: hotel.longitude ?? hotel.lon ?? hotel.lng ?? 0,
    },
    outboundFlight: mapFlight(outbound),
    returnFlight: mapFlight(ret),
    pnrLocator: offer.pnrLocator ?? offer.pnr ?? offer.recordLocator ?? "",
    passengerName:
      offer.passengerName ??
      [traveler.firstName, traveler.lastName].filter(Boolean).join(" "),
    priceSummary: {
      packagePrice: pricing.packagePriceFormatted ?? formatCurrency(pricing.packagePrice ?? 0),
      taxes: pricing.taxesFormatted ?? formatCurrency(pricing.taxes ?? pricing.taxesAndFees ?? 0),
      resortFee: pricing.resortFeeFormatted ?? formatCurrency(pricing.resortFee ?? 0),
      totalCharged: pricing.totalFormatted ?? formatCurrency(pricing.total ?? pricing.totalCharged ?? 0),
    },
    cancellationPolicy:
      offer.cancellationPolicy ??
      hotel.cancellationPolicy ??
      "Please review the cancellation policy on your booking confirmation page.",
    resortFeeNotice:
      offer.resortFeeNotice ??
      hotel.resortFeeNotice ??
      "A resort fee will be collected directly by the hotel at check-in. This fee is not included in your prepaid total.",
    checkInLinks,
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */
