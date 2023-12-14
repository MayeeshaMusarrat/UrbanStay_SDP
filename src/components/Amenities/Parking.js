const Parking = () => {
    return (
      <div
        style={{
          width: "594.7px",
         
          height: "40px",
          textAlign: "left",
          fontSize: "16px",
          color: "#222",
          fontFamily: "Roboto",
         
        }}
      >
        <div
          style={{
            position: "relative",
            top: "10px",
            left: "0px",
            width: "278.9px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "0px 42px 16px 20px",
            boxSizing: "border-box",
            maxWidth: "280px",
           
          }}
        >
          <div
            style={{
              flexShrink: "0",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              padding: "0px 16px 0px 0px",
              boxSizing: "border-box",
              minWidth: "40px",
              zIndex: "1",
            }}
          >
            <img
              style={{
                position: "relative",
                width: "24px",
                height: "24px",
                overflow: "hidden",
                flexShrink: "0",
              }}
              alt=""
              src="/frame3.svg"
            />
          </div>
          <div
            style={{
              flexShrink: "0",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              padding: "0px 3.9900054931640625px 0px 0px",
              zIndex: "0",
            }}
          >
            <div style={{ position: "relative", lineHeight: "20px" }}>
              Free parking on premises
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Parking;
  