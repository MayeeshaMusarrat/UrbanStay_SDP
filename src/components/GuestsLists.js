import { useState, useCallback } from "react";
import { TextField, InputAdornment, Icon, IconButton } from "@mui/material";
import UserInfoPopup from "../components/UserInfoPopup";
import PortalPopup from "./PortalPopup";

const GuestsLists = ({ onClose }) => {
  const [isUserInfoPopupOpen, setUserInfoPopupOpen] = useState(false);

  const openUserInfoPopup = useCallback(() => {
    setUserInfoPopupOpen(true);
  }, []);

  const closeUserInfoPopup = useCallback(() => {
    setUserInfoPopupOpen(false);
  }, []);

  return (
    <>
      <div
        style={{
          
          borderRadius: "10px",
          width: "982px",
          height: "838px",
          overflowY: "auto",
          maxWidth: "100%",
          maxHeight: "100%",
          overflow: "auto",
          textAlign: "center",
          fontSize: "17px",
          color: "#000",
          fontFamily: "Poppins",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "100px",
            left: "60px",
            width: "807px",
            height: "703px",
          }}
        >
          <div
            style={{ //whiterect
              position: "absolute",
              top: "0px",
              right: "0px",
              borderRadius: "30px",
              backgroundColor: "#fff",
              boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.25)",
              width: "807px",
              height: "550px",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "105.5px",
              right: "-0.5px",
              borderTop: "1px solid #b8b7b7",
              boxSizing: "border-box",
              width: "808px",
              height: "1px",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "33px",
              right: "0px",
              textTransform: "capitalize",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "807px",
            }}
          >
            View Past Guests
          </div>
          <div
            style={{
              position: "absolute",
              top: "63px",
              right: "0px",
              fontSize: "13px",
              textTransform: "capitalize",
              fontWeight: "300",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "807px",
            }}
          >
            Click on the profile Picture to see guest details
          </div>
          <TextField
            style={{
              border: "none",
              backgroundColor: "transparent",
              position: "absolute",
              top: "129px",
              right: "114px",
            }}
            color="primary"
            sx={{ width: 579, height: 100 }}
            variant="outlined"
            type="search"
          />
          <img
            style={{
              position: "absolute",
              top: "0px",
              right: "757px",
              width: "22px",
              height: "56px",
              overflow: "hidden",
              cursor: "pointer",
            }}
            alt=""
            src="/cross.svg"
            onClick={onClose}
          />
          <div
            style={{
              position: "absolute",
              top: "180px",
              right: "0px",
              width: "807px",
              height: "488px",
              overflow: "hidden",
              textAlign: "left",
              fontSize: "16px",
            }}
          >
            <div //scroll
              style={{
                position: "absolute",
                top: "26px",
                left: "32px",
                width: "728px",
                height: "95px",
              }}
            >
              <img
                style={{
                  position: "absolute",
                  height: "84.53%",
                  width: "10.99%",
                  top: "9.47%",
                  right: "85.58%",
                  bottom: "6%",
                  left: "3.43%",
                  maxWidth: "100%",
                  overflow: "hidden",
                  maxHeight: "100%",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                alt=""
                src="/usericon@2x.png"
                onClick={openUserInfoPopup}
              />
              <div
                style={{
                  position: "absolute",
                  height: "70.95%",
                  width: "83.91%",
                  top: "11.79%",
                  left: "16.09%",
                  lineHeight: "30px",
                  textTransform: "capitalize",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ lineBreak: "anywhere", width: "100%" }}>
                  <p
                    style={{
                      marginBlockStart: "",
                      marginBlockEnd: "10px",
                      fontWeight: "500",
                    }}
                  >
                    mayeesha Musarrat
                  </p>
                </span>
              </div>
              <div
                style={{
                  position: "absolute",
                  height: "16.84%",
                  width: "83.91%",
                  top: "57.37%",
                  left: "16.09%",
                  fontSize: "15px",
                  lineHeight: "30px",
                  textTransform: "capitalize",
                  fontWeight: "300",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                11 Nov, 2023 - 13 Oct, 2023 | 2 Rooms | 3 Guests
              </div>
            </div>
          </div>
        </div>
      </div>
      {isUserInfoPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeUserInfoPopup}
        >
          <UserInfoPopup onClose={closeUserInfoPopup} />
        </PortalPopup>
      )}
    </>
  );
};

export default GuestsLists;
