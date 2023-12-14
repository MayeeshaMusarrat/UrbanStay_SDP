const Cctv = () => {
    return (
      <div
        style={{
          width: "278.9px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0px 7.399993896484375px 16px 0px",
          boxSizing: "border-box",
          textAlign: "left",
          fontSize: "16px",
          color: "#222",
          fontFamily: "Roboto",
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
            src="/frame.svg"
          />
        </div>
        <div
          style={{
            flexShrink: "0",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            padding: "0px 9.149993896484375px 0px 0px",
            zIndex: "0",
          }}
        >
          <div style={{ position: "relative", lineHeight: "20px" }}>
            Security cameras on property
          </div>
        </div>
      </div>
    );
  };
  
  export default Cctv;
  