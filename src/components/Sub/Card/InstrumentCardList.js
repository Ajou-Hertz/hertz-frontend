import React from "react";

import MarketCard from "./InstrumentCard.js";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid, Container } from "@mui/material";

const theme = createTheme();

function InstrumentCardList({ list }) {
    const marketList = list;
    console.log(marketList);
    return (
        <ThemeProvider theme={theme}>
            <Container
                sx={{ py: 8 }}
                maxWidth="lg"
                style={{ paddingTop: "10px" }}
            >
                <Grid container spacing={10}>
                    {marketList.map((market) => (
                        <Grid key={market.id} item xs={12} sm={6} lg={2}>
                            <MarketCard
                                id={market.id}
                                img={market.img}
                                url={market.url}
                                name={market.name}
                                location={market.location}
                                detail={market.detail}
                                time={market.time}
                                period={market.period}
                                like={market.like}
                                view={market.view}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default InstrumentCardList;
