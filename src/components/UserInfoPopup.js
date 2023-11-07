import { TextField, Box, Rating } from "@mui/material";
import * as React from 'react'; 


const UserInfoPopup = ({ onClose }) => {
  return (
    <div
      style={{
        borderRadius: "10px",
        width: "877px",
        height: "546px",
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
          width: "834px",
          height: "494px",
        }}
        alt=""
        src="/rectangle-108.svg"
      />

      <div
        style={{
          position: "absolute",
          top: "215px",
          left: "290px",
          textTransform: "capitalize",
          display: "flex",
          alignItems: "center",
          width: "522px",
        }}
      >
        Lives in Dhaka, Bangladesh
      </div>
      <div
        style={{
          position: "absolute",
          top: "278px",
          left: "290px",
          textTransform: "capitalize",
          display: "flex",
          alignItems: "center",
          width: "271px",
        }}
      >
        <span style={{ lineBreak: "anywhere", width: "100%" }}>
          <span style={{ fontWeight: "500" }}>{`Contact Number: `}</span>
          <span>01711897088</span>
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: "278px",
          left: "529px",
          textTransform: "capitalize",
          textAlign: "right",
          display: "flex",
          alignItems: "center",
          width: "282px",
        }}
      >
        <span style={{ lineBreak: "anywhere", width: "100%" }}>
          <span style={{ fontWeight: "500" }}>Email:</span>
          <span> musarrat@gmail.com</span>
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: "216px",
          left: "650px",
          textTransform: "capitalize",
          textAlign: "right",
          display: "flex",
          alignItems: "center",
          width: "269px",
        }}
      >
        Joined on 31 Oct, 2023
      </div>
      <img
        style={{
          position: "absolute",
          top: "166px",
          left: "73px",
          width: "191px",
          height: "154px",
          objectFit: "cover",
        }}
        alt=""
        src="/pic2-1@2x.png"
      />
      <div
        style={{
          position: "absolute",
          top: "161px",
          left: "290px",
          fontSize: "16px",
          textTransform: "capitalize",
          fontWeight: "600",
        }}
      >
        Mayeesha Musarrat
      </div>
      <div
        style={{
          position: "absolute",
          top: "193.5px",
          left: "290.5px",
          borderTop: "1px solid rgba(187, 187, 187, 0.8)",
          boxSizing: "border-box",
          width: "521px",
          height: "1px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "255.5px",
          left: "290.5px",
          borderTop: "1px solid rgba(187, 187, 187, 0.8)",
          boxSizing: "border-box",
          width: "521px",
          height: "1px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "317.5px",
          left: "291.5px",
          borderTop: "1px solid rgba(187, 187, 187, 0.8)",
          boxSizing: "border-box",
          width: "520px",
          height: "1px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "356px",
          left: "74px",
          fontSize: "16px",
          textTransform: "capitalize",
          fontWeight: "600",
        }}
      >
        About Mayeesha
      </div>
      <div
        style={{
          position: "absolute",
          top: "388px",
          left: "73px",
          textTransform: "lowercase",
          textAlign: "justify",
          display: "inline-block",
          width: "748px",
          height: "80px",
        }}
      >{`Our beautifully designed, brand new villa, offering a large space with fantastic amenities to ensure a comfortable and enjoyable stay. Our villa features a spacious working space area/conference room and a rooftop with a full mountain view, perfect for catching up on work or relaxing with friends and family. Our property is maintained and `}</div>
      <div
        style={{
          position: "absolute",
          top: "162px",
          left: "700px",
          width: "168px",
          height: "32px",
          overflow: "hidden",
        }}
      >

          <Box
            sx={{
              '& > legend': { mt: 2 },
            }}
          >
            <Rating
              name="simple-controlled"
              value={3}
              
            />
          </Box>

      </div>
      <div
        style={{
          position: "absolute",
          top: "58px",
          left: "38px",
          borderRadius: "34px",
          backgroundColor: "#fff",
          width: "813px",
          height: "84px",
        }}
      />
      <img
        style={{
          position: "absolute",
          top: "58px",
          left: "70px",
          width: "22px",
          height: "56px",
          overflow: "hidden",
          cursor: "pointer", 
        }}
        alt=""
        src="/cross.svg"
        onClick={onClose}
      />
      <img
        style={{
          position: "absolute",
          top: "141px",
          left: "38px",
          width: "814px",
          height: "1px",
        }}
        alt=""
        src="/group.svg"
      />
      <div
        style={{
          position: "absolute",
          top: "93px",
          left: "372px",
          fontSize: "16px",
          textTransform: "capitalize",
          fontWeight: "600",
        }}
      >
        View Guest Details
      </div>
    </div>
  );
};

export default UserInfoPopup;
