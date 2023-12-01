import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";

const MyFormWithTemplate = () => {
  const [name, setName] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const generatePdf = () => {
    // Create a div with your HTML template
    const templateDiv = document.createElement("div");
    templateDiv.innerHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
    
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@500;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap"
        />
    
        <style>
          body {
            margin: 0;
            line-height: normal;
          }
        </style>
      </head>
      <body>
        <div
          style="
            position: relative;
            background-color: #fff;
            width: 100%;
            height: 457px;
            overflow: hidden;
            text-align: left;
            font-size: 10px;
            color: #000;
            font-family: Inter;
          "
        >
          <div
            style="
              position: absolute;
              top: 0px;
              left: 0px;
              background-color: #371dae;
              width: 656px;
              height: 57px;
            "
          ></div>
          <div
            style="
              position: absolute;
              top: -3px;
              left: -10px;
              width: 147px;
              height: 90px;
            "
          >
            <b
              style="
                position: absolute;
                top: 8px;
                left: 22px;
                letter-spacing: -1px;
                line-height: 70px;
                text-transform: capitalize;
                display: inline-block;
                color: #fff;
                width: 125px;
                height: 57px;
              "
            >
              URBANSTAY</b
            >
            <img
              style="
                position: absolute;
                top: 8px;
                left: 17px;
                width: 73px;
                height: 25px;
                object-fit: cover;
              "
              alt=""
              src="./public/urbanstaylogopic@2x.png"
            />
    
            <div
              style="
                position: absolute;
                top: 85px;
                left: 29px;
                background-color: #d9d9d9;
                width: 618px;
                height: 21px;
              "
            ></div>
            <div
              style="
                position: absolute;
                top: 85px;
                left: -124px;
                letter-spacing: -1px;
                line-height: 20px;
                text-transform: capitalize;
                font-weight: 500;
                text-align: center;
                display: inline-block;
                width: 396px;
                height: 20px;
              "
            >
              Reservation Details
            </div>
            <div
              style="
                position: absolute;
                top: 85px;
                left: 29px;
                background-color: #d9d9d9;
                width: 618px;
                height: 21px;
              "
            ></div>
            <div
              style="
                position: absolute;
                top: 85px;
                left: -115px;
                line-height: 20px;
                text-transform: capitalize;
                font-family: Poppins;
                text-align: center;
                display: inline-block;
                width: 396px;
                height: 20px;
              "
            >
              Reservation Details
            </div>
            <div
              style="
                position: absolute;
                top: 123px;
                left: 32px;
                line-height: 20px;
                text-transform: capitalize;
                font-weight: 500;
                display: inline-block;
                width: 396px;
                height: 20px;
              "
            >
              Property Name: prop
            </div>
          </div>
          <div
            style="
              position: absolute;
              top: -7px;
              left: 0px;
              font-size: 13px;
              line-height: 70px;
              text-transform: capitalize;
              font-weight: 500;
              color: #fff;
              text-align: center;
              display: inline-block;
              width: 656px;
              height: 61px;
            "
          >
            RESERVATION RECEIPT
          </div>
        </div>
      </body>
    </html>
    
    `;

    // Convert the HTML template to canvas
    html2canvas(templateDiv).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // Create a new jsPDF instance
      const pdf = new jsPDF();

      // Add the canvas image to the PDF
      pdf.addImage(imgData, "PNG", 10, 10);

      // Save the PDF
      pdf.save("greeting_template.pdf");
    });
  };