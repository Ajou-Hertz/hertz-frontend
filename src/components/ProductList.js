import React from "react";

import MarketCard from "./ProductCard.js";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid, Container } from "@mui/material";

const theme = createTheme();

function ProductList({ list }) {
    if (!list || !list.content) {
        // list가 유효하지 않거나 content가 없을 때
        return null;
    }

    const marketList = list.content; // content 배열에서 데이터 추출

    // console.log(marketList);
    return (
        <ThemeProvider theme={theme}>
            <Container
                sx={{ py: 8 }}
                maxWidth="lg"
                style={{ paddingTop: "0px" }}
            >
                <Grid container spacing={8}>
                    {marketList.map((market) => (
                        <Grid key={market.id} item xs={12} sm={6} md={3}>
                            <MarketCard
                                id={market.id}
                                img={
                                    market.thumbnailImage
                                        ? market.thumbnailImage.url
                                        : market.images[0].url
                                } // 썸네일 이미지 URL
                                price={market.price}
                                title={market.title}
                                location={`${market.tradeAddress.sido} ${market.tradeAddress.sgg} ${market.tradeAddress.emd}`}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default ProductList;
