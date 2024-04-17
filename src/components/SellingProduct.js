import React from "react";
import Divider from "@mui/material/Divider";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

function SellingProduct({ userData }) {
    const btnStyle2 = {
        // fontSize: "25px",
        // padding: "2rem 2rem",
        margin: "1.2rem",
        textAlign: "left",
    };
    console.log(userData);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
            }}
        >
            <div>
                <h3 style={btnStyle2}>판매 내역</h3>
                <Divider />
                <ImageList sx={{ width: "100%", height: 460 }} cols={6}>
                    {userData?.createdInstruments?.map((item) => (
                        <ImageListItem
                            key={item.img}
                            sx={{ width: "100%", height: "auto" }}
                        >
                            <span>
                                {item.progressStatus === "SELLING"
                                    ? "판매중"
                                    : "판매완료"}
                            </span>
                            <img
                                src={item.images[0]?.url}
                                alt={item.title}
                                loading="lazy"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                            <ImageListItemBar
                                title={item.title}
                                subtitle={
                                    <React.Fragment>
                                        <span>
                                            {item.price.toLocaleString()} 원
                                        </span>
                                        <br />
                                        <svg
                                            width="10"
                                            height="13"
                                            viewBox="0 0 10 13"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M9.29002 6.65852C4.82564 13.3171 7.79223 8.56098 5.04492 13C2.07917 8.55415 5.16825 13.3175 0.705391 6.65853C-0.999195 4.11512 0.362127 -0.000187729 5.04492 6.423e-09C9.64725 0.000184516 10.9953 4.11512 9.29002 6.65852Z"
                                                fill="#D9D9D9"
                                            />
                                            <circle
                                                cx="5"
                                                cy="4"
                                                r="2"
                                                fill="#757575"
                                            />
                                        </svg>
                                        <span>
                                            {" "}
                                            {item.tradeAddress?.sido}{" "}
                                            {item.tradeAddress?.sgg}{" "}
                                            {item.tradeAddress?.emd}
                                        </span>
                                    </React.Fragment>
                                }
                                position="below"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
        </div>
    );
}

export default SellingProduct;
