import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import {
    CardContent,
    CardMedia,
    Card,
    CardButton,
    CardActionArea,
    CardActions,
    Button,
    Typography,
} from "@mui/material";

const ProductCard = ({ id, img, title, location, price, imgs }) => {
    const env = process.env;
    env.PUBLIC_URL = env.PUBLIC_URL || "";

    let temp = img;
    if (temp[0] === ".")
        temp = process.env.PUBLIC_URL + `assets/market_img.png`;

    // 가격 포맷 변경
    const formattedPrice = new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
    }).format(Number(price));

    // 통화 표시 옵션에서 달러 표시 제거
    const priceWithoutCurrencySymbol = formattedPrice.replace("₩", "");

    return (
        <Card
            className="Card"
            sx={{
                maxWidth: 400,
                minWidth: 288,
            }}
        >
            <CardActionArea
                style={{ cursor: "pointer" }}
                component={Link}
                // to={`/market/${id}`}
                to={`/InstrumentDetail`}
            >
                <CardMedia
                    component="img"
                    sx={{
                        height: "50%",
                    }}
                    image={temp}
                    alt="market image"
                    style={{ height: "260px" }}
                />

                <CardContent className="info_box" sx={{ flexGrow: 1 }}>
                    <Typography
                        gutterBottom
                        component="h2"
                        variant="h5"
                        sx={{ textAlign: "left" }}
                    >
                        {title.length > 14 ? title.slice(0, 13) + "..." : title}
                    </Typography>
                    <Typography
                        className="location"
                        component="p"
                        variant="body1"
                        sx={{ textAlign: "left" }}
                    >
                        {priceWithoutCurrencySymbol} 원
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions
                className="interest_figure"
                sx={{ justifyContent: "space-between" }}
            >
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
                    <circle cx="5" cy="4" r="2" fill="#757575" />
                </svg>
                <Typography sx={{ flex: 1, textAlign: "left" }}>
                    {location}
                </Typography>
            </CardActions>
        </Card>
    );
};

ProductCard.propTypes = {
    id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
};

export default ProductCard;
