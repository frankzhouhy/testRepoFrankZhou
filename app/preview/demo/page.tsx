import { render } from "@react-email/render";
import {
  OfferConfirmationEmail,
  mapOfferToEmailProps,
} from "@/src/emails/OfferConfirmationEmail";

// Hardcoded offer data for demo/testing purposes
const DEMO_OFFER = {"responseCode":200,"offerDetails":{"appCode":"DESKTOP","customer":{"firstName":"Frank","middleName":"","lastName":"Zhou","emailAddress":"frank.zhou@priceline.com","custID":18398778203},"customerServicePhoneNumbers":[{"phoneNumber":"1-203-220-6946","phoneNumberType":"Customer","defaultPhoneNumber":true}],"emailAddress":"frank.zhou@priceline.com","offerNum":"12966391397","offerToken":"2744fbcd-ed0b-44ca-9676-36d5ee529077","primaryOffer":{"pointOfSale":{"country":"US","currency":"USD"},"bundleComponents":[{"componentType":"FLY","item":{"imagePath":"https://www.priceline.com/sam/air/carrier_logos/","airport":[{"code":"JFK","name":"John F Kennedy Intl Airport","city":"New York City","state":"NY","country":"United States","latitude":40.639380747,"longitude":-73.772040349},{"code":"ATL","name":"Hartsfield-Jackson Atlanta Intl Airport","city":"Atlanta","state":"GA","country":"United States","latitude":33.640643983,"longitude":-84.422466323}],"airline":[{"code":"DL","name":"Delta Air Lines","checkInUrl":"www.delta.com/PCCOciWeb/findBy.action","largeImage":"airLogo_DLlg.gif","phoneNumber":"1-800-221-1212"}],"pnrLocator":"4J3UDI","slice":[{"duration":156,"id":1,"segment":[{"arrivalDateTime":"2024-03-01T08:36:00","cabinClass":"ECO","cabinName":"Economy Class","departDateTime":"2024-03-01T06:00:00","destAirport":"ATL","duration":156,"flightNumber":"2286","marketingAirline":"DL","operatingAirline":"DL","origAirport":"JFK","stopQuantity":0}]}],"passenger":[{"id":1,"personName":{"givenName":"FRANK","surname":"ZHOU"},"gender":"M","ticketNumber":["0067022935635"]}],"fareBrandInfo":{"name":"BASIC ECONOMY","ancillaries":[{"name":"CARRYON_BAGGAGE","offerType":"INCLUDED","shortDescription":"CARRY ON UP TO 45 LI 115 LCM"},{"name":"MEAL_BEVERAGE","offerType":"INCLUDED","shortDescription":"SNACK"},{"name":"WIFI","offerType":"CHARGEABLE","shortDescription":"INTERNET ACCESS"},{"name":"SEAT_SELECTION","offerType":"NOT_INCLUDED","shortDescription":"PRE RESERVED SEAT ASSIGNMENT"},{"name":"CHANGES","offerType":"NOT_INCLUDED","shortDescription":"CHANGEABLE TICKET"},{"name":"REFUNDS","offerType":"NOT_INCLUDED","shortDescription":"REFUNDABLE TICKET"}]},"itineraryTypeCode":"OW","customerServiceContact":[{"country":"CA","phone":"1-800-340-0575"},{"country":"US","phone":"1-800-340-0575"}]}},{"componentType":"STAY","item":{"offerToken":"Mjc0NGZiY2QtZWQwYi00NGNhLTk2NzYtMzZkNWVlNTI5MDc3fjEyOTY2Mzg5Mzk3","travelStartDateTime":"2024-03-01T00:00:00","travelEndDateTime":"2024-03-02T00:00:00","hotelMinStar":"4.0","rooms":[{"confirmationNum":"698573790","planDescription":"Special Rate","cancelPolicyText":"Any cancellation received within 3 days prior to arrival date will incur the first night charge. Failure to arrive at your hotel or property will be treated as a No-Show and no refund will be given (Property policy)."}],"hotel":{"pclnHotelID":54538,"hotelName":"Hyatt Regency Atlanta","starRating":4,"address":{"addressLine1":"265 Peachtree Street Ne","cityName":"Atlanta","stateCode":"GA","zip":"30303","isoCountryCode":"US"},"lat":33.76152039,"lon":-84.38671875,"neighborhood":"Downtown Atlanta","thumbnailURL":"https://mobileimg.priceline.com/htlimg/54/54538/thumbnail-150-square.jpg","description":["This Atlanta Hyatt Regency is 7 minutes' walk from World of Coca-Cola and the Georgia Aquarium."],"amenityDetails":["Accessible parking","Facilities for disabled guests available","Family rooms","Fitness center","Free Wi-Fi","Kid-friendly dining","Non-smoking property","On-site accessible restaurants/lounges","Outdoor pool","Professional cleaning services","Restaurant(s)","Wheelchair accessible"],"checkInTime":"16:00","checkOutTime":"11:00","quotes":["A real nice place to stay while taking in a braves game, or anything else downtown Atlanta has to offer.","The hotel was spotless, nicely decorated and the room was comfortable.","The food was very fresh and provided healthy choices."],"phone":"404-577-1234"},"importantInformation":{"cancelPolicy":{"Refund and Cancellation Policy":"Any cancellation received within 3 days prior to arrival date will incur the first night charge. Failure to arrive at your hotel or property will be treated as a No-Show and no refund will be given (Property policy)."}}},"mandatoryFee":0}],"pkgData":{"offerNum":12966391397,"statusCode":"ACCEPTED","reasonCode":"BOOKING_CONFIRMED","totalNumTravelers":1,"pkgTypeCode":"AH","currencyCode":"USD","destLocationName":"ATLANTA","travelStartDate":"2024-03-01T06:00:00","travelEndDate":"2024-03-02T11:00:00","billableTaxAmt":64.91,"finalOfferPrice":311.09},"pkgPriceSummary":{"basePkgPrice":{"currency":"USD","amount":311.09},"totalTax":{"currency":"USD","amount":64.91},"totalTaxesAndFees":{"currency":"USD","amount":64.91},"totalPkgPrice":{"currency":"USD","amount":376},"totalChargedToday":{"currency":"USD","amount":376},"mandatoryFee":{"currency":"USD","amount":0}}}}};

export default async function DemoPreviewPage() {
  const emailProps = mapOfferToEmailProps(DEMO_OFFER);
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
          Demo Preview: <strong>{emailProps.destination}</strong> — {emailProps.travelerName} — Ref: {emailProps.bookingRef}
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
