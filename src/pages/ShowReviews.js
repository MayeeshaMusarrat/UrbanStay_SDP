import { useState, useCallback } from "react";
import ReviewDetails from "../components/ReviewDetails";
import PortalPopup from "../components/PortalPopup";
import { useParams } from 'react-router-dom';

const ShowReviews = () => {
  const { pid } = useParams();

  console.log("param: ", pid);
  const [isReviewDetailsPopupOpen, setReviewDetailsPopupOpen] = useState(false);

  const onGroupContainerClick = useCallback(() => {
    // Please sync "LandingPage" to the project
  }, []);

  const openReviewDetailsPopup = useCallback(() => {
    setReviewDetailsPopupOpen(true);
  }, []);

  const closeReviewDetailsPopup = useCallback(() => {
    setReviewDetailsPopupOpen(false);
  }, []);

  return (
    <>
      <div
        style={{
          position: "relative",
          backgroundColor: "#fff",
          width: "100%",
          height: "1913px",
          overflow: "hidden",
          textAlign: "left",
          fontSize: "24px",
          color: "#371dae",
          fontFamily: "Poppins",
        }}
      >
         
        <div
          style={{
            position: "absolute",
            width: "calc(100% + 384px)",
            right: "-384px",
            bottom: "0.4px",
            left: "0px",
            backgroundColor: "#10162e",
            height: "462.6px",
            color: "#fff",
            fontFamily: "'Plus Jakarta Sans'",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              width: "1788px",
              height: "411.6px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "60px",
                left: "168px",
                width: "1124px",
                height: "291.6px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "0px",
                  left: "12px",
                  width: "1100px",
                  height: "291.6px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    width: "440px",
                    height: "291.6px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      width: "calc(100% - 24px)",
                      top: "0px",
                      right: "12px",
                      left: "12px",
                      height: "291.6px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        width: "calc(100% + 57px)",
                        top: "0px",
                        right: "-28.5px",
                        left: "-28.5px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        padding: "0px 95px 0px 0px",
                        boxSizing: "border-box",
                        gap: "29.8px",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          lineHeight: "28.8px",
                          fontWeight: "600",
                        }}
                      >
                        Get Our App
                      </div>
                      <div
                        style={{
                          position: "relative",
                          fontSize: "16px",
                          lineHeight: "24px",
                          color: "#f2f2f2",
                          display: "flex",
                          alignItems: "center",
                          width: "378px",
                        }}
                      >
                        Download the app and book your property
                      </div>
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "97.8px",
                        left: "0px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        padding: "0px 76px 0px 0px",
                      }}
                    >
                      <div
                        style={{
                          alignSelf: "stretch",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          justifyContent: "center",
                          padding: "0px 5px 0px 0px",
                        }}
                      >
                        <img
                          style={{
                            position: "relative",
                            width: "168px",
                            height: "60px",
                            objectFit: "cover",
                            maxWidth: "173px",
                          }}
                          alt=""
                          src="/googlepaypng@2x.png"
                        />
                      </div>
                      <div
                        style={{
                          alignSelf: "stretch",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          justifyContent: "center",
                          padding: "0px 5px 0px 0px",
                        }}
                      >
                        <img
                          style={{
                            position: "relative",
                            width: "162px",
                            height: "60px",
                            objectFit: "cover",
                            maxWidth: "167px",
                          }}
                          alt=""
                          src="/appstorepng@2x.png"
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        width: "100%",
                        top: "207.8px",
                        right: "0px",
                        left: "0px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        gap: "14.79px",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          lineHeight: "28.8px",
                          textTransform: "capitalize",
                          fontWeight: "600",
                        }}
                      >
                        Connect with us
                      </div>
                      <div
                        style={{
                          alignSelf: "stretch",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                          padding: "0px 126px 0px 0px",
                          fontSize: "18px",
                          color: "#0e0e46",
                          fontFamily: "'Font Awesome 5 Brands'",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            padding: "0px 10px 0px 0px",
                          }}
                        >
                          <div
                            style={{
                              borderRadius: "20px",
                              backgroundColor: "#fff",
                              width: "40px",
                              height: "40px",
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                              padding:
                                "11px 13.619999885559082px 11px 14.380000114440918px",
                              boxSizing: "border-box",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                              }}
                            >
                              <div
                                style={{
                                  position: "relative",
                                  lineHeight: "18px",
                                }}
                              >
                                
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            padding: "0px 10px 0px 0px",
                          }}
                        >
                          <div
                            style={{
                              borderRadius: "20px",
                              backgroundColor: "#fff",
                              width: "40px",
                              height: "40px",
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                              padding:
                                "11px 11.869999885559082px 11px 12.130000114440918px",
                              boxSizing: "border-box",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                              }}
                            >
                              <div
                                style={{
                                  position: "relative",
                                  lineHeight: "18px",
                                }}
                              >
                                
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            padding: "0px 10px 0px 0px",
                          }}
                        >
                          <div
                            style={{
                              borderRadius: "20px",
                              backgroundColor: "#fff",
                              width: "40px",
                              height: "40px",
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                              padding:
                                "11px 9.119999885559082px 11px 9.880000114440918px",
                              boxSizing: "border-box",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                              }}
                            >
                              <div
                                style={{
                                  position: "relative",
                                  lineHeight: "18px",
                                }}
                              >
                                
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            padding: "0px 10px 0px 0px",
                          }}
                        >
                          <div
                            style={{
                              borderRadius: "20px",
                              backgroundColor: "#fff",
                              width: "40px",
                              height: "40px",
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "11px",
                              boxSizing: "border-box",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                              }}
                            >
                              <div
                                style={{
                                  position: "relative",
                                  lineHeight: "18px",
                                }}
                              >
                                
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            padding: "0px 10px 0px 0px",
                          }}
                        >
                          <div
                            style={{
                              borderRadius: "20px",
                              backgroundColor: "#fff",
                              width: "40px",
                              height: "40px",
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "11px 12.75px 11px 13.25px",
                              boxSizing: "border-box",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                              }}
                            >
                              <div
                                style={{
                                  position: "relative",
                                  lineHeight: "18px",
                                }}
                              >
                                
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            alignSelf: "stretch",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                          }}
                        >
                          <div
                            style={{
                              borderRadius: "20px",
                              backgroundColor: "#fff",
                              width: "40px",
                              height: "40px",
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                              padding:
                                "11px 11.869999885559082px 11px 12.130000114440918px",
                              boxSizing: "border-box",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                              }}
                            >
                              <div
                                style={{
                                  position: "relative",
                                  lineHeight: "18px",
                                }}
                              >
                                
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "calc(100% - 880px)",
                    top: "0px",
                    right: "440px",
                    bottom: "0px",
                    left: "440px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      width: "calc(100% - 24px)",
                      top: "0px",
                      right: "12px",
                      left: "12px",
                      height: "258.8px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "calc(50% - 98px)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        padding: "0px 107px 0px 0px",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          lineHeight: "28.8px",
                          fontWeight: "600",
                          display: "inline-block",
                          maxHeight: "28.799999237060547px",
                        }}
                      >
                        Explore
                      </div>
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "58.8px",
                        left: "calc(50% - 98px)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        gap: "20px",
                        fontSize: "16px",
                        color: "#f2f2f2",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          padding: "0px 119px 0px 18px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            zIndex: "0",
                          }}
                        >
                          <div
                            style={{ position: "relative", lineHeight: "24px" }}
                          >
                            Listings
                          </div>
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            margin: "0",
                            top: "1.5px",
                            left: "0px",
                            fontSize: "14px",
                            lineHeight: "21px",
                            fontFamily: "'Font Awesome 5 Free'",
                            color: "#fcaf3d",
                            display: "flex",
                            alignItems: "center",
                            width: "10.5px",
                            height: "21px",
                            flexShrink: "0",
                            zIndex: "1",
                          }}
                        >
                          
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          padding: "0px 114px 0px 18px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            zIndex: "0",
                          }}
                        >
                          <div
                            style={{ position: "relative", lineHeight: "24px" }}
                          >
                            Register
                          </div>
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            margin: "0",
                            top: "1.5px",
                            left: "0px",
                            fontSize: "14px",
                            lineHeight: "21px",
                            fontFamily: "'Font Awesome 5 Free'",
                            color: "#fcaf3d",
                            display: "flex",
                            alignItems: "center",
                            width: "10.5px",
                            height: "21px",
                            flexShrink: "0",
                            zIndex: "1",
                          }}
                        >
                          
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          padding: "0px 135px 0px 18px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            zIndex: "0",
                          }}
                        >
                          <div
                            style={{ position: "relative", lineHeight: "24px" }}
                          >
                            Login
                          </div>
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            margin: "0",
                            top: "1.5px",
                            left: "0px",
                            fontSize: "14px",
                            lineHeight: "21px",
                            fontFamily: "'Font Awesome 5 Free'",
                            color: "#fcaf3d",
                            display: "flex",
                            alignItems: "center",
                            width: "10.5px",
                            height: "21px",
                            flexShrink: "0",
                            zIndex: "1",
                          }}
                        >
                          
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          padding: "0px 134px 0px 18px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            zIndex: "0",
                          }}
                        >
                          <div
                            style={{ position: "relative", lineHeight: "24px" }}
                          >
                            Blogs
                          </div>
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            margin: "0",
                            top: "1.5px",
                            left: "0px",
                            fontSize: "14px",
                            lineHeight: "21px",
                            fontFamily: "'Font Awesome 5 Free'",
                            color: "#fcaf3d",
                            display: "flex",
                            alignItems: "center",
                            width: "10.5px",
                            height: "21px",
                            flexShrink: "0",
                            zIndex: "1",
                          }}
                        >
                          
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          padding: "0px 120px 0px 18px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            zIndex: "0",
                          }}
                        >
                          <div
                            style={{ position: "relative", lineHeight: "24px" }}
                          >
                            Hosts
                          </div>
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            margin: "0",
                            top: "1.5px",
                            left: "0px",
                            fontSize: "14px",
                            lineHeight: "21px",
                            fontFamily: "'Font Awesome 5 Free'",
                            color: "#fcaf3d",
                            display: "flex",
                            alignItems: "center",
                            width: "10.5px",
                            height: "21px",
                            flexShrink: "0",
                            zIndex: "1",
                          }}
                        >
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "calc(100% - 880px)",
                    top: "0px",
                    right: "220px",
                    bottom: "0px",
                    left: "660px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      width: "calc(100% - 24px)",
                      top: "0px",
                      right: "12px",
                      left: "12px",
                      height: "258.8px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "calc(50% - 98px)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        padding: "0px 66px 0px 0px",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          lineHeight: "28.8px",
                          fontWeight: "600",
                          display: "inline-block",
                          maxHeight: "28.799999237060547px",
                        }}
                      >
                        Categories
                      </div>
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "58.8px",
                        left: "calc(50% - 98px)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        gap: "20px",
                        fontSize: "16px",
                        color: "#f2f2f2",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          padding: "0px 88px 0px 18px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            zIndex: "0",
                          }}
                        >
                          <div
                            style={{ position: "relative", lineHeight: "24px" }}
                          >
                            Apartments
                          </div>
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            margin: "0",
                            top: "1.5px",
                            left: "0px",
                            fontSize: "14px",
                            lineHeight: "21px",
                            fontFamily: "'Font Awesome 5 Free'",
                            color: "#fcaf3d",
                            display: "flex",
                            alignItems: "center",
                            width: "10.5px",
                            height: "21px",
                            flexShrink: "0",
                            zIndex: "1",
                          }}
                        >
                          
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          padding: "0px 131px 0px 18px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            zIndex: "0",
                          }}
                        >
                          <div
                            style={{ position: "relative", lineHeight: "24px" }}
                          >
                            Home
                          </div>
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            margin: "0",
                            top: "1.5px",
                            left: "0px",
                            fontSize: "14px",
                            lineHeight: "21px",
                            fontFamily: "'Font Awesome 5 Free'",
                            color: "#fcaf3d",
                            display: "flex",
                            alignItems: "center",
                            width: "10.5px",
                            height: "21px",
                            flexShrink: "0",
                            zIndex: "1",
                          }}
                        >
                          
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          padding: "0px 129px 0px 18px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            zIndex: "0",
                          }}
                        >
                          <div
                            style={{ position: "relative", lineHeight: "24px" }}
                          >
                            Office
                          </div>
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            margin: "0",
                            top: "1.5px",
                            left: "0px",
                            fontSize: "14px",
                            lineHeight: "21px",
                            fontFamily: "'Font Awesome 5 Free'",
                            color: "#fcaf3d",
                            display: "flex",
                            alignItems: "center",
                            width: "10.5px",
                            height: "21px",
                            flexShrink: "0",
                            zIndex: "1",
                          }}
                        >
                          
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          padding: "0px 139px 0px 18px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            zIndex: "0",
                          }}
                        >
                          <div
                            style={{ position: "relative", lineHeight: "24px" }}
                          >
                            Villas
                          </div>
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            margin: "0",
                            top: "1.5px",
                            left: "0px",
                            fontSize: "14px",
                            lineHeight: "21px",
                            fontFamily: "'Font Awesome 5 Free'",
                            color: "#fcaf3d",
                            display: "flex",
                            alignItems: "center",
                            width: "10.5px",
                            height: "21px",
                            flexShrink: "0",
                            zIndex: "1",
                          }}
                        >
                          
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          padding: "0px 149px 0px 18px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            zIndex: "0",
                          }}
                        >
                          <div
                            style={{ position: "relative", lineHeight: "24px" }}
                          >
                            Flat
                          </div>
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            margin: "0",
                            top: "1.5px",
                            left: "0px",
                            fontSize: "14px",
                            lineHeight: "21px",
                            fontFamily: "'Font Awesome 5 Free'",
                            color: "#fcaf3d",
                            display: "flex",
                            alignItems: "center",
                            width: "10.5px",
                            height: "21px",
                            flexShrink: "0",
                            zIndex: "1",
                          }}
                        >
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "calc(100% - 880px)",
                    top: "0px",
                    right: "0px",
                    bottom: "0px",
                    left: "880px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      width: "calc(100% - 24px)",
                      top: "0px",
                      right: "12px",
                      left: "12px",
                      height: "258.8px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "calc(50% - 98px)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        padding: "0px 81px 0px 0px",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          lineHeight: "28.8px",
                          fontWeight: "600",
                          display: "inline-block",
                          maxHeight: "28.799999237060547px",
                        }}
                      >
                        Locations
                      </div>
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "58.8px",
                        left: "calc(50% - 98px)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        gap: "20px",
                        fontSize: "16px",
                        color: "#f2f2f2",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          padding: "0px 75px 0px 18px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            zIndex: "0",
                          }}
                        >
                          <div
                            style={{ position: "relative", lineHeight: "24px" }}
                          >
                            United States
                          </div>
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            margin: "0",
                            top: "1.5px",
                            left: "0px",
                            fontSize: "14px",
                            lineHeight: "21px",
                            fontFamily: "'Font Awesome 5 Free'",
                            color: "#fcaf3d",
                            display: "flex",
                            alignItems: "center",
                            width: "10.5px",
                            height: "21px",
                            flexShrink: "0",
                            zIndex: "1",
                          }}
                        >
                          
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          padding: "0px 118px 0px 18px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            zIndex: "0",
                          }}
                        >
                          <div
                            style={{ position: "relative", lineHeight: "24px" }}
                          >
                            Canada
                          </div>
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            margin: "0",
                            top: "1.5px",
                            left: "0px",
                            fontSize: "14px",
                            lineHeight: "21px",
                            fontFamily: "'Font Awesome 5 Free'",
                            color: "#fcaf3d",
                            display: "flex",
                            alignItems: "center",
                            width: "10.5px",
                            height: "21px",
                            flexShrink: "0",
                            zIndex: "1",
                          }}
                        >
                          
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          padding: "0px 141px 0px 18px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            zIndex: "0",
                          }}
                        >
                          <div
                            style={{ position: "relative", lineHeight: "24px" }}
                          >
                            India
                          </div>
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            margin: "0",
                            top: "1.5px",
                            left: "0px",
                            fontSize: "14px",
                            lineHeight: "21px",
                            fontFamily: "'Font Awesome 5 Free'",
                            color: "#fcaf3d",
                            display: "flex",
                            alignItems: "center",
                            width: "10.5px",
                            height: "21px",
                            flexShrink: "0",
                            zIndex: "1",
                          }}
                        >
                          
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          padding: "0px 156px 0px 18px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            zIndex: "0",
                          }}
                        >
                          <div
                            style={{ position: "relative", lineHeight: "24px" }}
                          >
                            UK
                          </div>
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            margin: "0",
                            top: "1.5px",
                            left: "0px",
                            fontSize: "14px",
                            lineHeight: "21px",
                            fontFamily: "'Font Awesome 5 Free'",
                            color: "#fcaf3d",
                            display: "flex",
                            alignItems: "center",
                            width: "10.5px",
                            height: "21px",
                            flexShrink: "0",
                            zIndex: "1",
                          }}
                        >
                          
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          padding: "0px 113px 0px 18px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            zIndex: "0",
                          }}
                        >
                          <div
                            style={{ position: "relative", lineHeight: "24px" }}
                          >
                            Australia
                          </div>
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            margin: "0",
                            top: "1.5px",
                            left: "0px",
                            fontSize: "14px",
                            lineHeight: "21px",
                            fontFamily: "'Font Awesome 5 Free'",
                            color: "#fcaf3d",
                            display: "flex",
                            alignItems: "center",
                            width: "10.5px",
                            height: "21px",
                            flexShrink: "0",
                            zIndex: "1",
                          }}
                        >
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              width: "calc(100% - 380px)",
              top: "412px",
              right: "380px",
              left: "0px",
              backgroundColor: "#0d1329",
              height: "51px",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "calc(100% - 1221px)",
                top: "15px",
                right: "1209px",
                left: "12px",
                height: "21px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "0px",
                  left: "-12px",
                  lineHeight: "21px",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "1518px",
                }}
              >
                Copyright 2023 - All right reserved UrbanStay
              </div>
            </div>
          </div>
        </div>
        <b
          style={{
            position: "absolute",
            top: "146px",
            left: "56px",
            fontSize: "30px",
            letterSpacing: "0.1px",
            lineHeight: "32px",
            display: "inline-block",
            width: "818px",
            height: "52px",
          }}
        >
          Reviews for Cozy Coop
        </b>
        <div
          style={{
            position: "absolute",
            top: "-6px",
            left: "0px",
            width: "1542px",
            height: "119px",
            overflow: "hidden",
            fontSize: "16px",
            fontFamily: "Lato",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              backgroundColor: "#fff",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              width: "1518px",
              height: "105px",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "22px",
              left: "5px",
              width: "133px",
              height: "69px",
              cursor: "pointer",
            }}
            onClick={onGroupContainerClick}
          >
            <div
              style={{
                position: "absolute",
                top: "49px",
                left: "25px",
                letterSpacing: "-1px",
                lineHeight: "70px",
                textTransform: "capitalize",
                display: "flex",
                alignItems: "center",
                width: "85px",
                height: "20px",
              }}
            >
              <span style={{ lineBreak: "anywhere", width: "100%" }}>
                <b>URBAN</b>
                <span style={{ fontWeight: "500", color: "#6c60fe" }}>
                  STAY
                </span>
              </span>
            </div>
            <img
              style={{
                position: "absolute",
                top: "0px",
                left: "0px",
                width: "133px",
                height: "46px",
                objectFit: "cover",
              }}
              alt=""
              src="/image-3-1@2x.png"
            />
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: "217px",
            left: "56px",
            width: "387px",
            height: "450px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              backgroundColor: "#d9d9d9",
              width: "387px",
              height: "186px",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "219px",
              left: "0px",
              backgroundColor: "#d9d9d9",
              width: "387px",
              height: "231px",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: "205px",
            left: "466px",
            border: "1px solid #000",
            boxSizing: "border-box",
            width: "1018px",
            height: "1210px",
            overflow: "hidden",
            fontSize: "13px",
            color: "#000",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "9px",
              width: "1004px",
              height: "154px",
            }}
          >
            <img
              style={{
                position: "absolute",
                height: "41.04%",
                width: "6.93%",
                top: "3.25%",
                right: "93.07%",
                bottom: "55.71%",
                left: "0%",
                maxWidth: "100%",
                overflow: "hidden",
                maxHeight: "100%",
                objectFit: "cover",
              }}
              alt=""
              src="/usericon1@2x.png"
            />
            <div
              style={{
                position: "absolute",
                width: "53.14%",
                top: "0%",
                left: "8.25%",
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
                width: "53.14%",
                top: "35.06%",
                left: "8.13%",
                fontSize: "12px",
                textTransform: "capitalize",
                fontWeight: "300",
                display: "flex",
                alignItems: "center",
              }}
            >
              11 Nov, 2023
            </div>
            <div
              style={{
                position: "absolute",
                height: "51.3%",
                width: "100%",
                top: "48.7%",
                left: "0%",
                textTransform: "capitalize",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={openReviewDetailsPopup}
            >
              <span style={{ lineBreak: "anywhere", width: "100%" }}>
                <span>{`As soon as we arrived we were greeted by the villa staff so beautifully, as they put some flowers on our necks and welcoming drinks. Our stay was amazing we felt at peace. Also Agus and his wife made us wonderful welcoming dinner every bite was delicious. Thank you for the wonderful stay. `}</span>
                <span
                  style={{ textDecoration: "underline", fontWeight: "600" }}
                >
                  See More
                </span>
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                height: "17.53%",
                width: "24.23%",
                top: "15.58%",
                right: "67.52%",
                bottom: "66.88%",
                left: "8.25%",
                backgroundColor: "#d9d9d9",
              }}
            />
          </div>
        </div>
      </div>
      {isReviewDetailsPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeReviewDetailsPopup}
        >
          <ReviewDetails onClose={closeReviewDetailsPopup} />
        </PortalPopup>
      )}
    </>
  );
};

export default ShowReviews;
