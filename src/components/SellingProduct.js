import React from "react";
import Divider from "@mui/material/Divider";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
// import marketListData from "constants/data.js";
import Button from "@mui/material/Button";

function WishProduct() {
    const btnStyle2 = {
        // fontSize: "25px",
        // padding: "2rem 2rem",
        margin: "1.2rem",
        textAlign: "left",
    };

    const currentData = [
        {
            img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
            title: "야마하 fs830",
            price: "350,000원",
            location: "수원시 영통구",
        },
        {
            img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
            title: "야마하 fs830",
            price: "350,000원",
            location: "수원시 영통구",
        },
        {
            img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
            title: "야마하 fs830",
            price: "350,000원",
            location: "수원시 영통구",
        },
        {
            img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
            title: "야마하 fs830",
            price: "350,000원",
            location: "수원시 영통구",
        },
        {
            img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
            title: "야마하 fs830",
            price: "350,000원",
            location: "수원시 영통구",
        },
        {
            img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
            title: "야마하 fs830",
            price: "350,000원",
            location: "수원시 영통구",
        },
        {
            img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
            title: "야마하 fs830",
            price: "350,000원",
            location: "수원시 영통구",
        },
        {
            img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
            title: "야마하 fs830",
            price: "350,000원",
            location: "수원시 영통구",
        },
        {
            img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
            title: "Honey",
            price: "@arwinneil",
        },
        {
            img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
            title: "Basketball",
            price: "@tjdragotta",
        },
        {
            img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
            title: "Fern",
            price: "@katie_wasserman",
        },
        {
            img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
            title: "Mushrooms",
            price: "@silverdalex",
        },
        {
            img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
            title: "Mushrooms",
            price: "@silverdalex",
        },
    ];

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
                    {currentData.map((item) => (
                        <ImageListItem
                            key={item.img}
                            sx={{ width: "100%", height: "auto" }}
                        >
                            <img
                                src={`${item.img}?w=248&fit=crop&auto=format`}
                                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
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
                                        <span>{item.price}</span>
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
                                        <span> {item.location}</span>
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

export default WishProduct;
