import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const PropertyDetailsPopup = ({ rowData, onClose }) => {
  
  console.log("rowData: ", rowData);
 
  return (
    <div
      style={{
        borderRadius: "10px",
        width: "1167px",
        height: "800px",
        overflowY: "auto",
        maxWidth: "100%",
        maxHeight: "100%",
        overflow: "auto",
        textAlign: "left",
        fontSize: "14px",
        color: "#000",
        fontFamily: "Poppins",
      }}
    >
      <img
        style={{
          position: "absolute",
          top: "52px",
          left: "28px",
          borderRadius: "30px",
          width: "1089px",
          height: "646px",
        }}
        alt=""
        src="/rectangle-108.svg"
      />
      <img
        style={{
          position: "absolute",
          bottom: "339px",
          left: "73px",
          borderRadius: "12px",
          width: "251px",
          height: "242px",
          objectFit: "cover",
        }}
        alt=""
        src={rowData.pic}
      />
      <div
        style={{
          position: "absolute",
          top: "58px",
          left: "38px",
          borderRadius: "34px",
          backgroundColor: "#fff",
          width: "1069px",
          height: "84px",
        }}
      />
      <img
        style={{
          position: "absolute",
          top: "93px",
          left: "70px",
          borderRadius: "34px",
          width: "22px",
          height: "21px",
          cursor: "pointer",
          zIndex: "1000",
        }}
        alt=""
        src="/cross.svg"
        onClick={onClose}
      />
      <div
        style={{
          position: "absolute",
          top: "141.5px",
          left: "37.5px",
          borderTop: "1px solid #b8b7b7",
          boxSizing: "border-box",
          width: "1070px",
          height: "1px",
        }}
      />
      <button
        style={{
          cursor: "pointer",
          border: "none",
          padding: "0",
          backgroundColor: "transparent",
          position: "absolute",
          top: "93px",
          left: "43px",
          fontSize: "15px",
          textTransform: "capitalize",
          fontWeight: "700",
          fontFamily: "Inter",
          color: "#000",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "1069px",
        }}
      >
        Property Details
      </button>
      <div
        style={{
          position: "absolute",
          top: "171px",
          left: "349px",
          width: "728px",
          height: "24px",
          fontSize: "16px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            textTransform: "capitalize",
            fontWeight: "600",
            fontSize: "14px"
          }}
        >
          {rowData.Property}
        </div>
        <div
          style={{
            position: "absolute",
            top: "0px",
            left: "244px",
            textTransform: "capitalize",
            fontWeight: "600",
            fontSize: "14px"
          }}
        >
          Open: 31 Oct, 2023 - 7 Nov, 2023
        </div>
        <div
          style={{
            position: "absolute",
            top: "0px",
            left: "556px",
            textTransform: "capitalize",
            fontWeight: "600",
            textAlign: "right",
            fontSize: "14px"
          }}
        >
          created on 31 Oct, 2023
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: "449px",
          left: "71px",
          fontSize: "16px",
          textTransform: "capitalize",
          fontWeight: "600",
        }}
      >
        Property Description
      </div>
      <div
        style={{
          position: "absolute",
          top: "231px",
          left: "349px",
          textTransform: "capitalize",
        }}
      >
        {rowData.bedrooms + " Bedrooms"}
      </div>
      <div
        style={{
          position: "absolute",
          top: "231px",
          left: "537px",
          textTransform: "capitalize",
        }}
      >
         {rowData.baths + " Bathrooms"}
      </div>
      <div
        style={{
          position: "absolute",
          top: "231px",
          left: "655px",
          textTransform: "capitalize",
        }}
      >
         {rowData.area + " sq. feet"}
      </div>
      <div
        style={{
          position: "absolute",
          top: "231px",
          left: "772px",
          textTransform: "capitalize",
        }}
      >
         {rowData.guests + " Guests"}
      </div>
      <div
        style={{
          position: "absolute",
          top: "231px",
          left: "862px",
          textTransform: "capitalize",
        }}
      >
         {rowData.rooms + " Rooms"}
      </div>
      <div
        style={{
          position: "absolute",
          top: "231px",
          left: "953px",
          textTransform: "capitalize",
          textAlign: "right",
          display: "flex",
          alignItems: "center",
          width: "120px",
        }}
      >
        <span style={{ lineBreak: "anywhere", width: "100%" }}>
         
          <span style={{ fontWeight: "500" }}>  {rowData.price}</span>
          <span>/night</span>
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: "231px",
          left: "462px",
          textTransform: "capitalize",
        }}
      >
         {rowData.beds + " Beds"}
      </div>
      <div
        style={{
          position: "absolute",
          top: "288px",
          left: "368px",
          textTransform: "capitalize",
        }}
      >
         {rowData.location}
      </div>
      <div
        style={{
          position: "absolute",
          top: "328px",
          left: "346px",
          textTransform: "capitalize",
          display: "flex",
          alignItems: "center",
          width: "725px",
          height: "84px",
        }}
      >
        <span style={{ lineBreak: "anywhere", width: "100%" }}>
          <span style={{ fontWeight: "500" }}>Amenities Provided:</span>
          <span>{` Amenities `}</span>
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: "211.5px",
          left: "349.5px",
          borderTop: "1px solid rgba(187, 187, 187, 0.8)",
          boxSizing: "border-box",
          width: "727px",
          height: "1px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "269.5px",
          left: "346.5px",
          borderTop: "1px solid rgba(187, 187, 187, 0.8)",
          boxSizing: "border-box",
          width: "730px",
          height: "1px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "327.5px",
          left: "346.5px",
          borderTop: "1px solid rgba(187, 187, 187, 0.8)",
          boxSizing: "border-box",
          width: "730px",
          height: "1px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "411.5px",
          left: "346.5px",
          borderTop: "1px solid rgba(187, 187, 187, 0.8)",
          boxSizing: "border-box",
          width: "730px",
          height: "1px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "483px",
          left: "70px",
          textAlign: "justify",
          display: "inline-block",
          width: "1006px",
          height: "160px",
        }}
      >
         {rowData.description}
      </div>
      <img
        style={{
          position: "absolute",
          height: "2.53%",
          width: "1.29%",
          top: "289px",
          right: "68.98%",
          bottom: "59.07%",
          left: "343px",
          maxWidth: "100%",
          overflow: "hidden",
          maxHeight: "100%",
        }}
        alt=""
        src="/locationicon.svg"
      />
    </div>
  );
};

export default PropertyDetailsPopup;
