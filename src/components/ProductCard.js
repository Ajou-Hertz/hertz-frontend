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

const ProductCard = ({
    id,
    img,
    url,
    name,
    location,
    detail,
    time,
    period,
    like,
    view,
}) => {
    const env = process.env;
    env.PUBLIC_URL = env.PUBLIC_URL || "";

    let temp = img;
    if (temp[0] === ".")
        temp = process.env.PUBLIC_URL + `assets/market_img.png`;

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
                to={`/market/${id}`}
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
                        {name.length > 14 ? name.slice(0, 13) + "..." : name}
                    </Typography>
                    <Typography
                        className="location"
                        component="p"
                        variant="body1"
                        sx={{ textAlign: "left" }}
                    >
                        {time}
                    </Typography>
                    {/* <Typography
                        className="location"
                        component="p"
                        variant="body1"
                    >
                        상세 : {detail}
                    </Typography>
                    <Typography className="time" component="p" variant="body1">
                        운영시간 : {time}
                    </Typography>
                    <Typography
                        className="period"
                        component="p"
                        variant="body1"
                    >
                        기간 : {period}
                    </Typography> */}
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
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired,
    like: PropTypes.number.isRequired,
    view: PropTypes.number.isRequired,
};

export default ProductCard;
